'use client';

import { Mic, MicOff, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

interface VoiceButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
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

export function VoiceButton({ isListening, isSpeaking, isSupported, onClick }: VoiceButtonProps) {
  if (!isSupported) return null;

  const isActive = isListening || isSpeaking;

  return (
    <div className="flex items-center gap-2">
      {/* Animated equalizer bars — only visible when mic or speaker is active */}
      {isActive && (
        <div className="flex items-center gap-[3px]" style={{ height: '24px' }}>
          {BARS.map(({ height, delay }, i) => (
            <span
              key={i}
              className={clsx(
                'w-[3px] rounded-full',
                isListening ? 'bg-red-400' : 'bg-cyan-400'
              )}
              style={{
                height: `${height}px`,
                animation: `voiceWave 0.55s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main circular button */}
      <button
        type="button"
        onClick={onClick}
        title={
          isListening
            ? 'Detener escucha'
            : isSpeaking
            ? 'Detener voz'
            : 'Hablar con el asistente'
        }
        aria-label={
          isListening
            ? 'Detener escucha'
            : isSpeaking
            ? 'Detener voz'
            : 'Usar micrófono'
        }
        className={clsx(
          'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0',
          isListening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse'
            : isSpeaking
            ? 'text-white shadow-lg shadow-cyan-500/30 glow-cyan'
            : 'bg-white/[0.06] border border-white/[0.10] text-slate-400 hover:bg-white/[0.10] hover:text-slate-200'
        )}
        style={isSpeaking ? { backgroundColor: '#06B6D4' } : undefined}
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : isSpeaking ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>

      {/* Scoped keyframe — injected once, no external CSS dependency */}
      <style>{`
        @keyframes voiceWave {
          from { transform: scaleY(0.35); opacity: 0.6; }
          to   { transform: scaleY(1);    opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
