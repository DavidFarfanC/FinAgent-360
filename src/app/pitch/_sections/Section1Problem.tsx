'use client';

import { useInView } from '../_hooks/useInView';

const stats = [
  { value: '58%', label: 'Satisfacción en banca' },
  { value: '700 / 1000', label: 'usuarios buscarán cambiar de banco' },
  { value: '+70%', label: 'interacciones repetitivas' },
];

export default function Section1Problem() {
  const { ref: refHeader, inView: inViewHeader } = useInView(0.2);
  const { ref: refCards, inView: inViewCards } = useInView(0.2);
  const { ref: refFooter, inView: inViewFooter } = useInView(0.2);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden py-20 px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#1E293B_0%,_#0A0F1E_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-16">
        {/* Header */}
        <div
          ref={refHeader}
          className={`text-center flex flex-col gap-6 transition-all duration-700 ${
            inViewHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#F8FAFC] leading-tight max-w-3xl">
            &ldquo;Sabemos que no trabajamos con dinero…{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              protegemos historias.
            </span>
            &rdquo;
          </h2>
          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            &ldquo;Y cuando una de esas historias está en riesgo, lo único que una persona necesita…{' '}
            <span className="text-[#F8FAFC] font-medium">es ser escuchada.&rdquo;</span>
          </p>
        </div>

        {/* Stats cards */}
        <div
          ref={refCards}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 w-full transition-all duration-700 delay-150 ${
            inViewCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-7 flex flex-col items-center gap-3 text-center hover:border-[#2563EB]/50 transition-colors duration-300"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-[#94A3B8] text-sm leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <div
          ref={refFooter}
          className={`text-center transition-all duration-700 delay-300 ${
            inViewFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            &ldquo;El problema no es el banco…{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              es cómo se siente el cliente.
            </span>
            &rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
