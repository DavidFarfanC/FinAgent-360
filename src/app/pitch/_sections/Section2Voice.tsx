'use client';

import { useInView } from '../_hooks/useInView';

const voiceStats = [
  { value: '+40%', label: 'confianza con interacción por voz' },
  { value: '+30%', label: 'mayor satisfacción conversacional' },
];

export default function Section2Voice() {
  const { ref: refTop, inView: inViewTop } = useInView(0.2);
  const { ref: refCards, inView: inViewCards } = useInView(0.2);
  const { ref: refBottom, inView: inViewBottom } = useInView(0.2);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 px-6 bg-[#0A0F1E]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1A3A] via-[#0A0F1E] to-[#0A0F1E] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#06B6D4] opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-16">
        {/* Top quote */}
        <div
          ref={refTop}
          className={`text-center transition-all duration-700 ${
            inViewTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Mic icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-2xl shadow-[#06B6D4]/30">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>

          <p className="text-2xl md:text-4xl font-bold text-[#F8FAFC] max-w-2xl mx-auto leading-tight">
            &ldquo;Las personas no solo buscan respuestas…{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              buscan ser escuchadas.
            </span>
            &rdquo;
          </p>
        </div>

        {/* Stats */}
        <div
          ref={refCards}
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl transition-all duration-700 delay-150 ${
            inViewCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {voiceStats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 flex flex-col items-center gap-3 text-center hover:border-[#06B6D4]/50 transition-colors duration-300"
            >
              <span className="text-5xl font-black bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-[#94A3B8] text-sm leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          ref={refBottom}
          className={`text-center flex flex-col gap-6 transition-all duration-700 delay-300 ${
            inViewBottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">
            &ldquo;La voz no es tecnología…{' '}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
              es conexión.
            </span>
            &rdquo;
          </p>

          <p className="text-xs text-[#94A3B8]/70 max-w-xl mx-auto leading-relaxed border border-[#1E293B] rounded-lg px-4 py-3 bg-[#111827]/50">
            HITOS DE CIENCIAS ECONÓMICO ADMINISTRATIVAS, Volumen 32, Número 92, Enero-Abril 2026,
            Universidad Juárez Autónoma de Tabasco
          </p>
        </div>
      </div>
    </section>
  );
}
