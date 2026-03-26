'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Web Speech API types ─────────────────────────────────────────────────────
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}
// ─────────────────────────────────────────────────────────────────────────────

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UseNexoVoiceOptions {
  onActionDetected?: (suggestedText: string) => void;
}

export interface UseNexoVoiceReturn {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  isSupported: boolean;
  transcript: string;
  startConversation: () => void;
  stopSpeaking: () => void;
}

const ACTION_KEYWORDS = ['escríbelo en el chat', 'en el chat', 'escribe'];
function hasActionKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return ACTION_KEYWORDS.some((kw) => lower.includes(kw));
}

export function useNexoVoice({ onActionDetected }: UseNexoVoiceOptions = {}): UseNexoVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const historyRef = useRef<HistoryMessage[]>([]);
  const lastUserMessageRef = useRef('');
  const onActionDetectedRef = useRef(onActionDetected);

  // Sync refs — readable inside callbacks without stale closures
  const isConversationActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isThinkingRef = useRef(false);
  const pendingTranscriptRef = useRef('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { onActionDetectedRef.current = onActionDetected; });

  // ── Try to (re)start recognition — safe wrapper ───────────────────────────
  const tryStartRecognition = useCallback(() => {
    if (!isConversationActiveRef.current) return;
    try { recognitionRef.current?.start(); } catch { /* already active */ }
  }, []);

  // ── TTS speak ─────────────────────────────────────────────────────────────
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[✓•·]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    window.speechSynthesis.cancel();

    const onTTSEnd = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      // Resume listening after Nexo finishes speaking
      tryStartRecognition();
    };

    const speakNow = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = [
        'Google español de Estados Unidos',
        'Google español',
        'Microsoft Pablo - Spanish (Mexico)',
        'Jorge',
        'Diego',
        'Reed',
        'Rocko',
      ];
      const voice =
        preferredVoices.reduce<SpeechSynthesisVoice | null>((found, name) => {
          if (found) return found;
          return voices.find((v) => v.name === name) ?? null;
        }, null) ||
        voices.find((v) => v.lang.includes('es')) ||
        null;

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'es-MX';
      if (voice) utterance.voice = voice;
      utterance.pitch = 0.7;
      utterance.rate = 1.35;
      utterance.volume = 1.0;

      utterance.onstart = () => { setIsSpeaking(true); isSpeakingRef.current = true; };
      utterance.onend = onTTSEnd;
      utterance.onerror = onTTSEnd;

      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speakNow();
    } else {
      let fired = false;
      window.speechSynthesis.onvoiceschanged = () => { if (fired) return; fired = true; speakNow(); };
      setTimeout(() => { if (fired) return; fired = true; speakNow(); }, 100);
    }
  }, [tryStartRecognition]);

  // ── Call Nexo API ─────────────────────────────────────────────────────────
  const callNexo = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || !isConversationActiveRef.current) return;

    setIsThinking(true);
    isThinkingRef.current = true;
    setTranscript('');

    try {
      const res = await fetch('/api/nexo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: historyRef.current }),
      });

      const data = await res.json();
      const reply: string = res.ok
        ? data.reply
        : 'Lo siento, tuve un problema. ¿Puedes repetirlo?';

      historyRef.current = [
        ...historyRef.current,
        { role: 'user' as const, content: userMessage },
        { role: 'assistant' as const, content: reply },
      ].slice(-6);

      setIsThinking(false);
      isThinkingRef.current = false;

      if (hasActionKeyword(reply)) {
        onActionDetectedRef.current?.(lastUserMessageRef.current);
      }

      if (isConversationActiveRef.current) {
        speak(reply);
      }
    } catch {
      setIsThinking(false);
      isThinkingRef.current = false;
      if (isConversationActiveRef.current) {
        speak('Lo siento, no pude conectarme. Intenta de nuevo.');
      }
    }
  }, [speak]);

  // ── Init SpeechRecognition (continuous) ───────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI: SpeechRecognitionCtor | undefined =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;
    setIsSupported(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'es-MX';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      // Interruption: user started speaking while Nexo was talking
      if (isSpeakingRef.current) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (interim) setTranscript(interim);

      if (finalText.trim()) {
        // Cancel TTS if Nexo is speaking (user interruption)
        if (isSpeakingRef.current) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          isSpeakingRef.current = false;
        }

        lastUserMessageRef.current = finalText.trim();
        pendingTranscriptRef.current += ' ' + finalText.trim();
        setTranscript(pendingTranscriptRef.current.trim());

        // Reset debounce: 1500ms after last final result → send to OpenAI
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          const text = pendingTranscriptRef.current.trim();
          pendingTranscriptRef.current = '';
          // Pause recognition while thinking/speaking
          try { recognition.stop(); } catch { /* ignore */ }
          if (text) callNexo(text);
        }, 1500);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart if conversation is active and Nexo is not responding
      if (
        isConversationActiveRef.current &&
        !isThinkingRef.current &&
        !isSpeakingRef.current
      ) {
        setTimeout(() => {
          try { recognition.start(); } catch { /* ignore */ }
        }, 200);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      if (
        isConversationActiveRef.current &&
        !isThinkingRef.current &&
        !isSpeakingRef.current
      ) {
        setTimeout(() => {
          try { recognition.start(); } catch { /* ignore */ }
        }, 500);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [callNexo]);

  // ── Public controls ───────────────────────────────────────────────────────
  const startConversation = useCallback(() => {
    if (isConversationActiveRef.current) {
      // ── Turn OFF ──
      isConversationActiveRef.current = false;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      pendingTranscriptRef.current = '';
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsListening(false);
      setIsThinking(false);
      setTranscript('');
      isSpeakingRef.current = false;
      isThinkingRef.current = false;
    } else {
      // ── Turn ON ──
      isConversationActiveRef.current = true;
      pendingTranscriptRef.current = '';
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      try { recognitionRef.current?.start(); } catch { /* already active */ }
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    isSpeakingRef.current = false;
  }, []);

  return { isListening, isSpeaking, isThinking, isSupported, transcript, startConversation, stopSpeaking };
}
