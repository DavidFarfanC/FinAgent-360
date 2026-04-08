'use client';

import { useInView } from '../_hooks/useInView';

const pills = [
  { icon: '🧠', label: 'Knowledge RAG' },
  { icon: '⚙️', label: 'Agentic Flows' },
  { icon: '📊', label: 'Event Logging' },
  { icon: '🔒', label: 'Salesforce Trust Layer' },
];

const metrics = [
  { value: '< 3 seg', label: 'respuesta + acción' },
  { value: '↓ 60%', label: 'costos operativos' },
  { value: '↑ CSAT', label: 'sin tiempos de espera' },
];

export default function Section3Solution() {
  const { ref: refTitle, inView: inViewTitle } = useInView(0.2);
  const { ref: refPills, inView: inViewPills } = useInView(0.2);
  const { ref: refMetrics, inView: inViewMetrics } = useInView(0.2);
  const { ref: refClose, inView: inViewClose } = useInView(0.2);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#1E293B_0%,_#0A0F1E_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#2563EB] opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-12">
        {/* Title */}
        <div
          ref={refTitle}
          className={`text-center flex flex-col gap-4 transition-all duration-700 ${
            inViewTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
            FinAgent360
          </h2>
          <p className="text-lg md:text-xl text-[#94A3B8] max-w-xl mx-auto">
            Una experiencia bancaria que{' '}
            <span className="text-[#F8FAFC] font-medium">escucha, entiende y actúa</span>
          </p>
        </div>

        {/* Pills */}
        <div
          ref={refPills}
          className={`flex flex-col items-center gap-4 transition-all duration-700 delay-150 ${
            inViewPills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {pills.map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-[#111827] border border-[#1E293B] text-[#F8FAFC] px-5 py-2.5 rounded-full text-sm font-medium hover:border-[#2563EB]/60 transition-colors duration-300"
              >
                <span>{pill.icon}</span>
                {pill.label}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#2563EB]/30">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Portal web real + voz bidireccional
          </span>
        </div>

        {/* Metrics */}
        <div
          ref={refMetrics}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 w-full transition-all duration-700 delay-200 ${
            inViewMetrics ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 flex flex-col items-center gap-3 text-center hover:border-[#2563EB]/50 transition-colors duration-300 hover:bg-[#111827]/80"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                {m.value}
              </span>
              <span className="text-[#94A3B8] text-sm">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Close */}
        <div
          ref={refClose}
          className={`text-center transition-all duration-700 delay-300 ${
            inViewClose ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl md:text-2xl text-[#F8FAFC] font-medium max-w-2xl mx-auto leading-relaxed">
            &ldquo;No estamos automatizando la atención…{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-bold">
              estamos humanizando la automatización.
            </span>
            &rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
