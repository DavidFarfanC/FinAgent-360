'use client';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export const AgentHighlight = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 h-full border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(124, 58, 237, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-purple-100 border border-purple-200 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
            </span>
            En línea
          </div>
          <span className="text-xs text-slate-500">Disponible 24/7</span>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-200 animate-float">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-widest mb-1">
            Asistente IA
          </p>
          <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
            FinAgent{' '}
            <span className="gradient-text-purple">AI</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
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
            <div key={feat} className="flex items-center gap-2 text-xs text-slate-600">
              <Zap className="w-3 h-3 text-purple-600 flex-shrink-0" />
              {feat}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-purple-200 group"
        >
          Iniciar conversación
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
export default AgentHighlight;
