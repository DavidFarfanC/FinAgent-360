'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Web Speech API type declarations ────────────────────────────────────────
// TypeScript's bundled DOM lib does not always include these types.
// We declare only what this hook needs.

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

export interface UseVoiceChatOptions {
  onTranscript: (text: string) => void;
}

export interface UseVoiceChatReturn {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

export function useVoiceChat({ onTranscript }: UseVoiceChatOptions): UseVoiceChatReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  // Keep callback ref up to date every render — avoids stale closure without re-initializing
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  });

  // Initialize SpeechRecognition once on mount (client-only)
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
        onTranscriptRef.current(final.trim());
        setTranscript('');
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
  }, []);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      // Cancel any ongoing TTS before capturing voice
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      try {
        recognition.start();
      } catch {
        // Ignore: recognition already active
      }
    }
  }, [isListening]);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    // Strip markdown/symbols so speech sounds natural
    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[✓•·]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'es-MX';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isListening, isSpeaking, transcript, isSupported, startListening, speak, stopSpeaking };
}
