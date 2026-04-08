'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useNexoVoice } from '@/hooks/useNexoVoice';
import { formatTime } from '@/lib/mock-data';

interface VoiceEntry {
  id: number;
  role: 'user' | 'nexo';
  text: string;
  timestamp: string;
}

interface NexoVoicePanelProps {
  onActionDetected?: (suggestedText: string) => void;
}

const BARS = [
  { h: 14, delay: 0 },
  { h: 24, delay: 0.12 },
  { h: 18, delay: 0.28 },
  { h: 30, delay: 0.08 },
  { h: 16, delay: 0.22 },
  { h: 26, delay: 0.18 },
  { h: 12, delay: 0.35 },
];

export function NexoVoicePanel({ onActionDetected }: NexoVoicePanelProps) {
  const [voiceHistory, setVoiceHistory] = useState<VoiceEntry[]>([]);
  const lastCapturedTranscriptRef = useRef('');
  const prevIsThinkingRef = useRef(false);
  const prevIsSpeakingRef = useRef(false);

  const {
    isListening,
    isSpeaking,
    isThinking,
    isSupported,
    transcript,
    startConversation,
  } = useNexoVoice({
    onActionDetected: (text) => {
      onActionDetected?.(text);
    },
  });

  // Capture transcript before it clears
  useEffect(() => {
    if (transcript) lastCapturedTranscriptRef.current = transcript;
  }, [transcript]);

  // When thinking starts → user sent a message → add to history
  useEffect(() => {
    if (isThinking && !prevIsThinkingRef.current) {
      const text = lastCapturedTranscriptRef.current;
      lastCapturedTranscriptRef.current = '';
      if (text) {
        setVoiceHistory((prev) => [
          { id: Date.now(), role: 'user' as const, text, timestamp: new Date().toISOString() },
          ...prev,
        ].slice(0, 8));
      }
    }
    prevIsThinkingRef.current = isThinking;
  }, [isThinking]);

  // When speaking starts → Nexo responded → add card
  useEffect(() => {
    if (isSpeaking && !prevIsSpeakingRef.current) {
      setVoiceHistory((prev) => {
        if (prev.length > 0 && prev[0].role === 'user') {
          return [
            { id: Date.now(), role: 'nexo' as const, text: 'Respondió', timestamp: new Date().toISOString() },
            ...prev,
          ].slice(0, 8);
        }
        return prev;
      });
    }
    prevIsSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  const isActive = isListening || isThinking || isSpeaking;

  const statusText = isListening
    ? 'Escuchando...'
    : isThinking
    ? 'Procesando...'
    : isSpeaking
    ? 'Nexo está hablando...'
    : 'Toca para hablar';

  const statusColor = isListening
    ? 'text-red-400'
    : isThinking
    ? 'text-purple-400'
    : isSpeaking
    ? 'text-cyan-400'
    : 'text-white/40';

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950">
      {/* ── Top content ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center pt-10 pb-6 px-6 flex-shrink-0">
        {/* Avatar */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-4 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
        >
          <span className="text-white font-bold text-xl tracking-wide">NX</span>
        </div>

        {/* Name + subtitle */}
        <h2 className="text-white font-semibold text-lg">Nexo</h2>
        <p className="text-white/50 text-xs mt-0.5">Asistente de voz BreBank</p>

        {/* Status indicator */}
        <div className={clsx('flex items-center gap-2 mt-4 h-6', statusColor)}>
          {isListening && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
          )}
          {isThinking && (
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  style={{ animation: `nexoPanelDot 0.7s ease-in-out ${delay}s infinite alternate` }}
                />
              ))}
            </div>
          )}
          {isSpeaking && !isThinking && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
          )}
          <span className="text-xs font-medium">{statusText}</span>
        </div>

        {/* Equalizer bars (speaking/listening) */}
        {isActive && !isThinking && (
          <div className="flex items-end gap-[3px] mt-4" style={{ height: '32px' }}>
            {BARS.map(({ h, delay }, i) => (
              <span
                key={i}
                className={clsx(
                  'w-[3px] rounded-full',
                  isListening ? 'bg-red-400/80' : 'bg-cyan-400/80'
                )}
                style={{
                  height: `${h}px`,
                  animation: `nexoPanelWave 0.55s ease-in-out ${delay}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
        {(!isActive || isThinking) && <div className="mt-4" style={{ height: '32px' }} />}

        {/* Mic button (80px) */}
        <div className="relative mt-6">
          {/* Transcript overlay */}
          {isListening && transcript && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-slate-800/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-white/90 text-center line-clamp-2 animate-fade-in pointer-events-none shadow-lg">
              {transcript}
            </div>
          )}

          <button
            type="button"
            onClick={startConversation}
            disabled={!isSupported}
            className={clsx(
              'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl',
              isListening
                ? 'bg-red-500 shadow-red-500/50 scale-110 animate-pulse'
                : isThinking
                ? 'shadow-purple-500/50'
                : isSpeaking
                ? 'shadow-cyan-500/50 scale-105'
                : 'bg-white/10 border border-white/20 hover:bg-white/15 hover:scale-105 active:scale-95',
              !isSupported && 'opacity-50 cursor-not-allowed'
            )}
            style={
              isThinking
                ? { backgroundColor: '#7C3AED' }
                : isSpeaking
                ? { backgroundColor: '#06B6D4' }
                : undefined
            }
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : isThinking ? (
              <span className="text-white text-sm font-bold tracking-wider">AI</span>
            ) : isSpeaking ? (
              <Volume2 className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white/70" />
            )}
          </button>
        </div>

        {!isSupported && (
          <p className="text-white/30 text-xs mt-3 text-center">
            Tu navegador no soporta Web Speech API
          </p>
        )}
      </div>

      {/* ── Voice history ────────────────────────────────────────────────────── */}
      {voiceHistory.length > 0 && (
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-3">
            Conversación reciente
          </p>
          <div className="space-y-2">
            {voiceHistory.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className={clsx(
                  'rounded-xl px-3 py-2 text-xs animate-fade-in',
                  entry.role === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/20 text-blue-200 ml-4'
                    : 'bg-white/5 border border-white/10 text-white/70 mr-4'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="font-medium text-[10px] uppercase tracking-wide opacity-60">
                    {entry.role === 'user' ? 'Tú' : 'Nexo'}
                  </span>
                  <span className="text-[10px] opacity-40">{formatTime(entry.timestamp)}</span>
                </div>
                <p className="leading-snug">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {voiceHistory.length === 0 && (
        <div className="flex-1 flex items-start justify-center pt-2 px-6 pb-6">
          <p className="text-white/20 text-xs text-center leading-relaxed">
            Presiona el botón y habla con Nexo
            <br />
            sobre productos y servicios BreBank
          </p>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes nexoPanelWave {
          from { transform: scaleY(0.3); opacity: 0.5; }
          to   { transform: scaleY(1);   opacity: 1;   }
        }
        @keyframes nexoPanelDot {
          from { transform: scale(0.5); opacity: 0.3; }
          to   { transform: scale(1.3); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
