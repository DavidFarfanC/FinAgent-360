'use client';

import { useInView } from '../_hooks/useInView';

const teamMembers = [
  {
    emoji: '👩‍🏫',
    name: 'Mtra. Mónica García R.',
    badge: 'Asesora Académica',
    sub: 'CETYS Universidad',
    isAdvisor: true,
    borderColor: '#92400E',
    bgColor: '#1C1008',
  },
  {
    emoji: '👩‍💻',
    name: 'Kamila García Zamora',
    badge: 'Salesforce Admin · UX',
    sub: 'Ingeniería Mecatrónica',
    isAdvisor: false,
    borderColor: '#1E3A5F',
    bgColor: '#0D1929',
  },
  {
    emoji: '💻',
    name: 'David Farfán C.',
    badge: 'Full Stack · Agentforce',
    sub: 'Ingeniería Mecánica',
    isAdvisor: false,
    borderColor: '#1E3A5F',
    bgColor: '#0D1929',
  },
];

export default function Section6Team() {
  const { ref: refTitle, inView: inViewTitle } = useInView(0.2);
  const { ref: refCards, inView: inViewCards } = useInView(0.15);
  const { ref: refFooter, inView: inViewFooter } = useInView(0.15);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1A3A]/50 via-[#0A0F1E] to-[#0A0F1E] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#2563EB] opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-12">
        {/* Title */}
        <div
          ref={refTitle}
          className={`text-center flex flex-col gap-3 transition-all duration-700 ${
            inViewTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#94A3B8] text-xs uppercase tracking-widest font-medium">
            Hackathon IA Agéntica 2026 — CETYS Universidad Tijuana
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-[#F8FAFC]">
            Equipo{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              37
            </span>
          </h2>
        </div>

        {/* Team cards */}
        <div
          ref={refCards}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 w-full transition-all duration-700 delay-150 ${
            inViewCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 flex flex-col items-center gap-4 text-center border transition-colors duration-300 hover:brightness-110"
              style={{
                backgroundColor: member.bgColor,
                borderColor: member.borderColor,
              }}
            >
              <span className="text-5xl">{member.emoji}</span>
              <div className="flex flex-col gap-2">
                <p className="text-[#F8FAFC] font-bold text-base leading-snug">{member.name}</p>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    member.isAdvisor
                      ? 'bg-[#451A03] text-[#FCD34D] border border-[#92400E]/40'
                      : 'bg-[#1E3A5F] text-[#60A5FA] border border-[#2563EB]/20'
                  }`}
                >
                  {member.badge}
                </span>
                <p className="text-[#94A3B8] text-sm">{member.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div
          ref={refFooter}
          className={`w-full flex flex-col items-center gap-4 transition-all duration-700 delay-200 ${
            inViewFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent" />
          <p className="text-[#94A3B8] text-sm text-center">
            <span className="text-[#2563EB] font-semibold">FinAgent360</span>
            {' · '}
            <span className="text-[#F8FAFC]">Equipo 37</span>
            {' · '}
            <span>Hackathon IA Agéntica 2026</span>
          </p>
        </div>
      </div>
    </section>
  );
}
