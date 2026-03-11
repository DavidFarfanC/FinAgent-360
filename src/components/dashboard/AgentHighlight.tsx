'use client';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export const AgentHighlight = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 h-full border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-blue-900/30">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Decorative orb */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-500/10 blur-xl" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400"></span>
            </span>
            En línea
          </div>
          <span className="text-xs text-slate-500">Disponible 24/7</span>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/20 flex items-center justify-center mb-4 animate-float">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-purple-400/80 uppercase tracking-widest mb-1">
            Asistente IA
          </p>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
            FinAgent{' '}
            <span className="gradient-text-purple">AI</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tu copiloto financiero inteligente. Consulta saldos, gestiona
            tarjetas y más con lenguaje natural.
          </p>
        </div>

        {/* Features */}
        <div className="mt-4 mb-5 space-y-2">
          {[
            'Consulta de saldo instantánea',
            'Bloqueo y gestión de tarjetas',
            'Estados de cuenta al instante',
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-3 h-3 text-purple-400 flex-shrink-0" />
              {feat}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 border border-purple-500/30 text-white text-sm font-medium hover:from-purple-500/80 hover:to-blue-500/80 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 group"
        >
          Iniciar conversación
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
