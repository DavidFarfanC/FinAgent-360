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

// ── iOS / browser detection helpers ──────────────────────────────────────────
const getIsIOS = () =>
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const getIsMobile = () =>
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const getIsSafari = () =>
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/** Safe cross-browser constructor getter — works with (window as any) pattern */
const getSpeechRecognition = (): SpeechRecognitionCtor | null => {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line
  const w = window as any;
  return (w.SpeechRecognition || w.webkitSpeechRecognition) ?? null;
};
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
  voiceError: string | null;
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
  const [voiceError, setVoiceError] = useState<string | null>(null);

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

  // ── Problem 5 — Preload voices (iOS loads them async) ─────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loadVoices = () => { window.speechSynthesis.getVoices(); };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // ── Problem 6 — Unlock AudioContext on first user interaction (iOS Safari) ─
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlockSafariAudio = () => {
      const unlock = new SpeechSynthesisUtterance('');
      unlock.volume = 0;
      window.speechSynthesis.speak(unlock);
      window.speechSynthesis.cancel();
    };
    document.addEventListener('touchstart', unlockSafariAudio, { once: true });
    document.addEventListener('click', unlockSafariAudio, { once: true });
    return () => {
      document.removeEventListener('touchstart', unlockSafariAudio);
      document.removeEventListener('click', unlockSafariAudio);
    };
  }, []);

  // ── Try to (re)start recognition — safe wrapper ───────────────────────────
  const tryStartRecognition = useCallback(() => {
    if (!isConversationActiveRef.current) return;
    try { recognitionRef.current?.start(); } catch { /* already active */ }
  }, []);

  // ── Problem 4 — TTS speak with chunking for iOS Safari ────────────────────
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    const isIOS = getIsIOS();
    const isMobile = getIsMobile();
    const isSafari = getIsSafari();

    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[✓•·]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    window.speechSynthesis.cancel();

    const onAllDone = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      tryStartRecognition();
    };

    const getSpanishVoice = (): SpeechSynthesisVoice | null => {
      const voices = window.speechSynthesis.getVoices();
      const safariVoices = ['Paulina', 'Jorge', 'Diego', 'Reed (Spanish (Mexico))', 'Eddy (Spanish (Mexico))'];
      const chromeVoices = ['Google español de Estados Unidos', 'Google español'];
      const preferred = isSafari || isIOS ? safariVoices : chromeVoices;
      for (const name of preferred) {
        const v = voices.find((v) => v.name === name);
        if (v) return v;
      }
      return voices.find((v) => v.lang.includes('es') || v.lang.includes('MX')) ?? null;
    };

    const doSpeak = () => {
      // iOS Safari: split into sentences to prevent audio cutoff
      const sentences: string[] = isIOS
        ? (clean.match(/[^.!?]+[.!?]+/g) ?? [clean])
        : [clean];

      const voice = getSpanishVoice();

      const speakChunk = (index: number) => {
        if (index >= sentences.length) { onAllDone(); return; }

        const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
        utterance.lang = 'es-MX';
        utterance.volume = 1.0;
        utterance.rate = isMobile ? 0.9 : isSafari ? 1.0 : 1.35;
        utterance.pitch = isMobile ? 1.0 : isSafari ? 0.85 : 0.7;
        if (voice) utterance.voice = voice;

        if (index === 0) {
          utterance.onstart = () => { setIsSpeaking(true); isSpeakingRef.current = true; };
        }
        utterance.onend = () => speakChunk(index + 1);
        utterance.onerror = () => speakChunk(index + 1);

        window.speechSynthesis.speak(utterance);
      };

      speakChunk(0);
    };

    // Wait for voices if not yet loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak();
    } else {
      let fired = false;
      window.speechSynthesis.onvoiceschanged = () => { if (fired) return; fired = true; doSpeak(); };
      setTimeout(() => { if (fired) return; fired = true; doSpeak(); }, 100);
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

  // ── Problem 1 + 3 — Init SpeechRecognition with iOS-compatible config ─────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI = getSpeechRecognition();
    if (!SpeechRecognitionAPI) {
      // No support — isSupported stays false, UI will show the message
      return;
    }
    setIsSupported(true);

    const isMobile = getIsMobile();

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'es-MX';
    recognition.continuous = !isMobile;     // OBLIGATORIO false en iOS
    recognition.interimResults = !isMobile; // OBLIGATORIO false en iOS
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
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
        if (isSpeakingRef.current) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          isSpeakingRef.current = false;
        }

        lastUserMessageRef.current = finalText.trim();
        pendingTranscriptRef.current += ' ' + finalText.trim();
        setTranscript(pendingTranscriptRef.current.trim());

        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          const text = pendingTranscriptRef.current.trim();
          pendingTranscriptRef.current = '';
          try { recognition.stop(); } catch { /* ignore */ }
          if (text) callNexo(text);
        }, 1500);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
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

    // ── Problem 7 — iOS-specific error handling ───────────────────────────
    recognition.onerror = ((event: { error: string }) => {
      switch (event.error) {
        case 'not-allowed':
          setVoiceError(
            'Permiso denegado. En iPhone: Ajustes → Safari → Micrófono → Permitir'
          );
          isConversationActiveRef.current = false;
          setIsListening(false);
          break;
        case 'no-speech':
          // Silently reset — onend will restart if conversation is active
          setIsListening(false);
          break;
        case 'audio-capture':
          setVoiceError('No se detectó micrófono. Verifica que no esté en uso por otra app.');
          setIsListening(false);
          break;
        case 'network':
          setVoiceError('Error de red. El reconocimiento de voz requiere conexión a internet.');
          setIsListening(false);
          break;
        default:
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
      }
    }) as () => void;

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [callNexo]);

  // ── Problem 2 — startConversation: recognition.start() is first sync call ─
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
      setVoiceError(null);
      isSpeakingRef.current = false;
      isThinkingRef.current = false;
    } else {
      // ── Turn ON ──
      // recognition.start() MUST be the first sync instruction (Safari iOS policy)
      isConversationActiveRef.current = true;
      pendingTranscriptRef.current = '';
      setVoiceError(null);
      try {
        recognitionRef.current?.start();
      } catch {
        // Safari throws if already active — stop and retry
        recognitionRef.current?.stop();
        try { recognitionRef.current?.start(); } catch { /* ignore */ }
      }
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    isSpeakingRef.current = false;
  }, []);

  return {
    isListening,
    isSpeaking,
    isThinking,
    isSupported,
    transcript,
    voiceError,
    startConversation,
    stopSpeaking,
  };
}
