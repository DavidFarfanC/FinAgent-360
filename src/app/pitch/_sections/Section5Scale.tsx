'use client';

import { useInView } from '../_hooks/useInView';

const scalePoints = [
  {
    icon: '⚡',
    title: 'Nuevo Flow: 20 minutos',
    desc: 'Agregar capacidades sin tocar el frontend',
  },
  {
    icon: '🏦',
    title: 'Listo para banca real',
    desc: 'Arquitectura replicable en cualquier institución financiera',
  },
  {
    icon: '📋',
    title: 'Auditoría total',
    desc: 'Cada acción genera un registro en Agent_Log__c',
  },
];

const achievements = [
  {
    criteria: 'Topics de clasificación de intención',
    status: 'completed',
    evidence: '5 Topics configurados en Agentforce Builder',
  },
  {
    criteria: 'Autolaunched Flows (acciones reales)',
    status: 'completed',
    evidence: '3 Flows activos: BlockCard, GetCardStatus, RequestStatement',
  },
  {
    criteria: 'Knowledge Articles (RAG)',
    status: 'completed',
    evidence: '5 artículos publicados en Salesforce Knowledge',
  },
  {
    criteria: 'Event Logging / Trazabilidad',
    status: 'completed',
    evidence: 'Agent_Log__c con registro automático por operación',
  },
  {
    criteria: 'Resolución autónoma sin humano',
    status: 'completed',
    evidence: 'Los 3 escenarios resueltos end-to-end sin intervención',
  },
  {
    criteria: 'Despliegue en canal real',
    status: 'beyond',
    evidence: 'Frontend Next.js 14 en Vercel con Embedded Service Chat',
  },
  {
    criteria: 'Interacción por voz bidireccional',
    status: 'beyond',
    evidence: 'Web Speech API en español (es-MX) integrada al frontend',
  },
  {
    criteria: 'Ciberseguridad y Zero Trust',
    status: 'beyond',
    evidence: 'Cloudflare CDN + DDoS mitigation + headers de seguridad',
  },
  {
    criteria: 'Trazabilidad para auditoría',
    status: 'beyond',
    evidence:
      'Cada operación genera registro con Action, Status, Timestamp y lookup a Card__c',
  },
];

export default function Section5Scale() {
  const { ref: refTitle, inView: inViewTitle } = useInView(0.2);
  const { ref: refPoints, inView: inViewPoints } = useInView(0.15);
  const { ref: refNote, inView: inViewNote } = useInView(0.15);
  const { ref: refTable, inView: inViewTable } = useInView(0.1);
  const { ref: refClose, inView: inViewClose } = useInView(0.1);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0D1A3A]/40 to-[#0A0F1E] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-[#2563EB] opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-14">
        {/* Title */}
        <div
          ref={refTitle}
          className={`text-center transition-all duration-700 ${
            inViewTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC]">
            ¿Por qué{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              escala?
            </span>
          </h2>
        </div>

        {/* Scale points */}
        <div
          ref={refPoints}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 w-full transition-all duration-700 delay-150 ${
            inViewPoints ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {scalePoints.map((point, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-7 flex flex-col gap-4 hover:border-[#2563EB]/50 transition-colors duration-300"
            >
              <span className="text-4xl">{point.icon}</span>
              <div>
                <p className="text-[#F8FAFC] font-bold text-base mb-1">{point.title}</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <div
          ref={refNote}
          className={`w-full max-w-2xl transition-all duration-700 delay-200 ${
            inViewNote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#111827]/80 border border-[#1E293B] rounded-2xl px-6 py-5 flex gap-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Algunos componentes no están completamente integrados por limitaciones de licencia de
              Salesforce Developer Edition, pero son técnicamente replicables con acceso a licencia
              completa.
            </p>
          </div>
        </div>

        {/* Achievements table */}
        <div
          ref={refTable}
          className={`w-full transition-all duration-700 delay-250 ${
            inViewTable ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Table header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-xl font-bold text-[#F8FAFC]">¿Qué logramos?</h3>
            <span className="inline-flex items-center gap-1.5 bg-[#14532D] text-[#4ADE80] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#4ADE80]/20">
              Entrega completa ✓
            </span>
          </div>

          {/* Scrollable table wrapper (mobile) */}
          <div className="overflow-x-auto rounded-2xl border border-[#1E293B]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-[#1E293B]">
                  <th className="text-left text-[#94A3B8] text-xs font-semibold uppercase tracking-wider px-5 py-3.5 w-[32%]">
                    Criterio
                  </th>
                  <th className="text-left text-[#94A3B8] text-xs font-semibold uppercase tracking-wider px-5 py-3.5 w-[22%]">
                    Status
                  </th>
                  <th className="text-left text-[#94A3B8] text-xs font-semibold uppercase tracking-wider px-5 py-3.5">
                    Evidencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-[#1E293B] transition-colors duration-200 hover:bg-[#1E293B]/30"
                    style={{ backgroundColor: i % 2 === 0 ? '#111827' : '#0D1321' }}
                  >
                    <td className="px-5 py-4 text-[#F8FAFC] font-semibold text-sm">
                      {row.criteria}
                    </td>
                    <td className="px-5 py-4">
                      {row.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 bg-[#14532D] text-[#4ADE80] text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border border-[#4ADE80]/10">
                          ✅ Completado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-[#1E3A5F] text-[#60A5FA] text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border border-[#60A5FA]/10">
                          🚀 Fuimos más allá
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-[#94A3B8] text-sm leading-relaxed">
                      {row.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-[#94A3B8]/60 text-xs mt-3 leading-relaxed max-w-2xl mx-auto">
            Desarrollado bajo restricciones de Salesforce Developer Edition. Todos los componentes
            son técnicamente replicables con licencia completa.
          </p>
        </div>

        {/* Final close */}
        <div
          ref={refClose}
          className={`text-center flex flex-col items-center gap-8 transition-all duration-700 delay-300 ${
            inViewClose ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col gap-4 max-w-3xl">
            <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed">
              &ldquo;BreBank pasó de tener un call center saturado a tener un ejecutivo bancario disponible
              24/7, que nunca se equivoca, nunca se cansa, y deja rastro de cada decisión.&rdquo;
            </p>
            <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              &ldquo;Eso es banca agéntica.&rdquo;
            </p>
          </div>

          {/* Logo + badge */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#2563EB]/40">
                <span className="text-white font-black text-sm">FA</span>
              </div>
              <span className="text-[#F8FAFC] font-bold text-xl tracking-tight">FinAgent360</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#2563EB]/30">
              🏆 Hackathon IA Agéntica 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
