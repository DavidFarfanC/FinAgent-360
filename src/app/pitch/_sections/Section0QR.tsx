'use client';

import dynamic from 'next/dynamic';
import { useInView } from '../_hooks/useInView';

const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((m) => m.QRCodeSVG),
  { ssr: false }
);

export default function Section0QR() {
  const { ref, inView } = useInView(0.3);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0D1A3A] to-[#0A0F1E]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB] opacity-5 blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 flex flex-col items-center gap-8 px-6 text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#06B6D4] font-semibold text-sm tracking-widest uppercase">FinAgent 360</span>
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] max-w-lg leading-tight">
          Escanea para explorar{' '}
          <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
            FinAgent 360
          </span>
        </h1>

        {/* QR Card */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-[#2563EB]/30 ring-4 ring-[#2563EB]/20">
          <QRCodeSVG
            value="https://fin-agent-360.vercel.app"
            size={256}
            bgColor="#FFFFFF"
            fgColor="#2563EB"
            level="M"
          />
        </div>

        <p className="text-[#94A3B8] text-base font-mono tracking-wide">
          fin-agent-360.vercel.app
        </p>

        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-[#2563EB]/40">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Powered by Salesforce Agentforce
        </div>

        <div className="inline-flex items-center gap-2 bg-[#0C2A30] text-[#06B6D4] border border-[#06B6D4]/20 px-5 py-2 rounded-full text-xs font-semibold tracking-wide">
          🏆 Equipo 37 — Hackathon IA Agéntica 2026
        </div>
      </div>
    </section>
  );
}
