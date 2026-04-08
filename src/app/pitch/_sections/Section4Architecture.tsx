'use client';

import { useInView } from '../_hooks/useInView';

const techStack = [
  { name: 'Next.js 14', color: 'from-[#2563EB] to-[#3B82F6]', icon: '▲' },
  { name: 'Vercel', color: 'from-[#1E293B] to-[#334155]', icon: '◆' },
  { name: 'Cloudflare', color: 'from-[#F97316] to-[#FB923C]', icon: '☁' },
  { name: 'Salesforce Agentforce', color: 'from-[#06B6D4] to-[#0EA5E9]', icon: '⚡' },
  { name: 'OpenAI + Web Speech', color: 'from-[#10B981] to-[#34D399]', icon: '🎙' },
  { name: 'TypeScript', color: 'from-[#2563EB] to-[#60A5FA]', icon: 'TS' },
  { name: 'Tailwind CSS', color: 'from-[#06B6D4] to-[#22D3EE]', icon: '✦' },
];

const flowNodes = [
  { label: 'Usuario', sublabel: 'Voz / Chat', highlight: false },
  { label: 'Frontend', sublabel: 'Next.js · Vercel · Cloudflare CDN', highlight: false },
  { label: 'Salesforce Agentforce', sublabel: '', highlight: true },
  { label: 'Topics · Knowledge RAG · Flows', sublabel: 'Autolaunched', highlight: false, isGroup: true },
  { label: 'Salesforce Data', sublabel: 'Card__c · Agent_Log__c', highlight: false },
  { label: 'Respuesta + Trazabilidad', sublabel: '', highlight: true },
];

export default function Section4Architecture() {
  const { ref: refTitle, inView: inViewTitle } = useInView(0.2);
  const { ref: refTech, inView: inViewTech } = useInView(0.15);
  const { ref: refFlow, inView: inViewFlow } = useInView(0.15);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden py-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0D1A3A] via-[#0A0F1E] to-[#0A0F1E] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col gap-12">
        {/* Title */}
        <div
          ref={refTitle}
          className={`text-center transition-all duration-700 ${
            inViewTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#F8FAFC]">
            Arquitectura de la{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Solución
            </span>
          </h2>
        </div>

        {/* Tech stack grid */}
        <div
          ref={refTech}
          className={`transition-all duration-700 delay-100 ${
            inViewTech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest text-center mb-5 font-medium">
            Stack tecnológico
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-[#1E293B] rounded-xl px-4 py-3 flex items-center gap-2.5 hover:border-[#2563EB]/50 transition-colors duration-300 min-w-fit"
              >
                <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {tech.icon}
                </span>
                <span className="text-[#F8FAFC] text-sm font-medium whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture flow */}
        <div
          ref={refFlow}
          className={`transition-all duration-700 delay-200 ${
            inViewFlow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest text-center mb-6 font-medium">
            Flujo de arquitectura
          </p>

          <div className="flex flex-col items-center gap-0">
            {flowNodes.map((node, i) => (
              <div key={i} className="flex flex-col items-center w-full max-w-lg">
                {/* Node card */}
                <div
                  className={`w-full rounded-2xl px-6 py-4 border text-center transition-all duration-300 ${
                    node.highlight
                      ? 'bg-gradient-to-r from-[#2563EB]/20 to-[#06B6D4]/20 border-[#2563EB]/50 shadow-lg shadow-[#2563EB]/10'
                      : node.isGroup
                      ? 'bg-[#0D1A3A] border-[#1E293B] border-dashed'
                      : 'bg-[#111827] border-[#1E293B]'
                  }`}
                >
                  <p
                    className={`font-semibold text-sm md:text-base ${
                      node.highlight
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent'
                        : 'text-[#F8FAFC]'
                    }`}
                  >
                    {node.label}
                  </p>
                  {node.sublabel && (
                    <p className="text-[#94A3B8] text-xs mt-0.5">{node.sublabel}</p>
                  )}
                </div>

                {/* Arrow */}
                {i < flowNodes.length - 1 && (
                  <div className="flex flex-col items-center py-1.5">
                    <div className="w-px h-4 bg-gradient-to-b from-[#2563EB] to-[#06B6D4]" />
                    <svg className="w-4 h-4 text-[#06B6D4] -mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 16l-6-6h12z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
