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
  useEffect(() => { onActionDetectedRef.current = onActionDetected; });

  // ── Speak via SpeechSynthesis ─────────────────────────────────────────────
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[✓•·]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    window.speechSynthesis.cancel();

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

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speakNow();
    } else {
      let fired = false;
      window.speechSynthesis.onvoiceschanged = () => {
        if (fired) return;
        fired = true;
        speakNow();
      };
      setTimeout(() => {
        if (fired) return;
        fired = true;
        speakNow();
      }, 100);
    }
  }, []);

  // ── Call Nexo API ─────────────────────────────────────────────────────────
  const callNexo = useCallback(async (userMessage: string) => {
    setIsThinking(true);
    try {
      const res = await fetch('/api/nexo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: historyRef.current,
        }),
      });

      const data = await res.json();
      const reply: string = res.ok
        ? data.reply
        : 'Lo siento, tuve un problema. ¿Puedes repetirlo?';

      // Update history (keep last 6 messages = 3 exchanges)
      historyRef.current = [
        ...historyRef.current,
        { role: 'user' as const, content: userMessage },
        { role: 'assistant' as const, content: reply },
      ].slice(-6);

      setIsThinking(false);
      speak(reply);

      // Detect actionable intent → fill chat input
      if (hasActionKeyword(reply)) {
        onActionDetectedRef.current?.(lastUserMessageRef.current);
      }
    } catch {
      setIsThinking(false);
      speak('Lo siento, no pude conectarme. Intenta de nuevo.');
    }
  }, [speak]);

  // ── Init SpeechRecognition ────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI: SpeechRecognitionCtor | undefined =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;
    setIsSupported(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'es-MX';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      setTranscript(interim || final);

      if (final.trim()) {
        lastUserMessageRef.current = final.trim();
        setTranscript('');
        callNexo(final.trim());
      }
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };
    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('');
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, [callNexo]);

  // ── Public controls ───────────────────────────────────────────────────────
  const startConversation = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      return;
    }

    // Stop any ongoing TTS before listening
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      recognition.start();
    } catch {
      // recognition already active — ignore
    }
  }, [isListening]);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isListening, isSpeaking, isThinking, isSupported, transcript, startConversation, stopSpeaking };
}
