'use client';

import { Mic, MicOff, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

interface VoiceButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking?: boolean;
  isSupported: boolean;
  onClick: () => void;
}

// Bar heights (px) and animation delays (s) for the 5 equalizer bars
const BARS: { height: number; delay: number }[] = [
  { height: 12, delay: 0 },
  { height: 20, delay: 0.15 },
  { height: 16, delay: 0.3 },
  { height: 24, delay: 0.1 },
  { height: 14, delay: 0.25 },
];

export function VoiceButton({
  isListening,
  isSpeaking,
  isThinking = false,
  isSupported,
  onClick,
}: VoiceButtonProps) {
  if (!isSupported) return null;

  const isActive = isListening || isSpeaking || isThinking;

  const barColor = isListening
    ? 'bg-red-400'
    : isThinking
    ? 'bg-purple-400'
    : 'bg-cyan-400';

  return (
    <div className="flex items-center gap-2">
      {/* Equalizer bars — visible when any state is active */}
      {isActive && (
        <div className="flex items-center gap-[3px]" style={{ height: '24px' }}>
          {isThinking ? (
            // Thinking: 3 pulsing dots instead of bars
            <>
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  className="w-[5px] h-[5px] rounded-full bg-purple-400"
                  style={{
                    animation: `nexoThink 0.7s ease-in-out ${delay}s infinite alternate`,
                  }}
                />
              ))}
            </>
          ) : (
            BARS.map(({ height, delay }, i) => (
              <span
                key={i}
                className={clsx('w-[3px] rounded-full', barColor)}
                style={{
                  height: `${height}px`,
                  animation: `voiceWave 0.55s ease-in-out ${delay}s infinite alternate`,
                }}
              />
            ))
          )}
        </div>
      )}

      {/* Main circular button */}
      <button
        type="button"
        onClick={onClick}
        title={
          isListening
            ? 'Detener escucha'
            : isThinking
            ? 'Nexo pensando...'
            : isSpeaking
            ? 'Detener voz'
            : 'Hablar con Nexo'
        }
        aria-label={
          isListening
            ? 'Detener escucha'
            : isThinking
            ? 'Nexo pensando'
            : isSpeaking
            ? 'Detener voz'
            : 'Hablar con Nexo'
        }
        className={clsx(
          'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0',
          isListening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse'
            : isThinking
            ? 'text-white shadow-lg shadow-purple-500/40'
            : isSpeaking
            ? 'text-white shadow-lg shadow-cyan-500/30'
            : 'bg-white/[0.06] border border-white/[0.10] text-slate-400 hover:bg-white/[0.10] hover:text-slate-200'
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
          <MicOff className="w-4 h-4" />
        ) : isThinking ? (
          <span className="text-[10px] font-bold">AI</span>
        ) : isSpeaking ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes voiceWave {
          from { transform: scaleY(0.35); opacity: 0.6; }
          to   { transform: scaleY(1);    opacity: 1;   }
        }
        @keyframes nexoThink {
          from { transform: scale(0.5); opacity: 0.4; }
          to   { transform: scale(1.2); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
