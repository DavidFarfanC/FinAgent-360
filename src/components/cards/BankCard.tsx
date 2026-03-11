'use client';
import { clsx } from 'clsx';
import { Card } from '@/types';
import { Wifi } from 'lucide-react';

interface BankCardProps {
  card: Card;
  flipped?: boolean;
}

export const BankCard = ({ card, flipped = false }: BankCardProps) => {
  const isBlocked = card.status === 'blocked';

  return (
    <div
      className={clsx(
        'relative w-full max-w-[380px] h-[220px] rounded-2xl overflow-hidden select-none transition-all duration-500',
        isBlocked && 'opacity-60 grayscale-[30%]',
        card.color === 'blue'
          ? 'shadow-2xl shadow-blue-500/30'
          : 'shadow-2xl shadow-slate-900/50'
      )}
    >
      {/* Card gradient background */}
      <div
        className={clsx(
          'absolute inset-0',
          card.color === 'blue'
            ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800'
            : 'bg-gradient-to-br from-slate-800 via-slate-900 to-gray-950'
        )}
      />

      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            card.color === 'blue'
              ? `radial-gradient(circle at 10% 90%, rgba(6, 182, 212, 0.6) 0%, transparent 50%), radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)`
              : `radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 90% 10%, rgba(30, 30, 60, 0.6) 0%, transparent 50%)`,
        }}
      />

      {/* Glossy top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-0 w-1/2 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

      {/* Blocked overlay */}
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wider uppercase">
            Bloqueada
          </div>
        </div>
      )}

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/50 text-[10px] font-medium uppercase tracking-widest">
              {card.cardType === 'debit' ? 'Débito' : 'Crédito'}
            </p>
            <p className="text-white/70 text-xs font-medium mt-0.5">
              FinAgent 360
            </p>
          </div>
          <Wifi className="w-5 h-5 text-white/40 rotate-90" />
        </div>

        {/* Chip + Card number */}
        <div>
          {/* EMV Chip */}
          <div className="w-10 h-7 rounded-md mb-4 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(135deg, #d4a017 0%, #f5d060 25%, #c8880a 50%, #f5d060 75%, #d4a017 100%)',
              }}
            >
              <div className="w-full h-px bg-yellow-600/50 mt-2" />
              <div className="w-full h-px bg-yellow-600/50 mt-1" />
              <div className="flex mt-0.5">
                <div className="w-1/2 h-3 border-r border-yellow-600/50" />
              </div>
            </div>
          </div>

          {/* Card number */}
          <p className="text-white font-mono text-sm tracking-[0.2em] font-medium">
            **** **** **** {card.lastFour}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-0.5">
              Titular
            </p>
            <p className="text-white text-xs font-semibold tracking-wide">
              {card.holder}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-0.5">
              Vence
            </p>
            <p className="text-white text-xs font-semibold font-mono">
              {card.expiryMonth}/{card.expiryYear}
            </p>
          </div>
          <div className="flex-shrink-0">
            {card.type === 'visa' ? (
              <span className="text-white font-bold text-lg italic tracking-tight">
                VISA
              </span>
            ) : (
              <div className="flex">
                <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
                <div className="w-7 h-7 rounded-full bg-amber-400 opacity-90 -ml-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
