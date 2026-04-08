'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Section0QR from './_sections/Section0QR';

const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((m) => m.QRCodeSVG),
  { ssr: false }
);
import Section1Problem from './_sections/Section1Problem';
import Section2Voice from './_sections/Section2Voice';
import Section3Solution from './_sections/Section3Solution';
import Section4Architecture from './_sections/Section4Architecture';
import Section6Team from './_sections/Section6Team';
import Section5Scale from './_sections/Section5Scale';

const SECTION_LABELS = ['Inicio', 'Problema', 'Voz', 'Solución', 'Arquitectura', 'Escala', 'Equipo'];

export default function PitchPage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(index);
        },
        {
          root: containerRef.current,
          threshold: 0.55,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        setActiveSection((prev) => {
          const next = Math.min(prev + 1, SECTION_LABELS.length - 1);
          sectionRefs.current[next]?.scrollIntoView({ behavior: 'smooth' });
          return next;
        });
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setActiveSection((prev) => {
          const next = Math.max(prev - 1, 0);
          sectionRefs.current[next]?.scrollIntoView({ behavior: 'smooth' });
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="relative bg-[#0A0F1E]">
      {/* Scroll container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Section 0 — QR */}
        <div ref={setSectionRef(0)} className="snap-start">
          <Section0QR />
        </div>

        {/* Section 1 — Problem */}
        <div ref={setSectionRef(1)} className="snap-start">
          <Section1Problem />
        </div>

        {/* Section 2 — Voice */}
        <div ref={setSectionRef(2)} className="snap-start">
          <Section2Voice />
        </div>

        {/* Section 3 — Solution */}
        <div ref={setSectionRef(3)} className="snap-start">
          <Section3Solution />
        </div>

        {/* Section 4 — Architecture */}
        <div ref={setSectionRef(4)} className="snap-start">
          <Section4Architecture />
        </div>

        {/* Section 5 — Scale */}
        <div ref={setSectionRef(5)} className="snap-start">
          <Section5Scale />
        </div>

        {/* Section 6 — Team */}
        <div ref={setSectionRef(6)} className="snap-start">
          <Section6Team />
        </div>
      </div>

      {/* Lateral navigation dots */}
      <nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
        aria-label="Navegación de secciones"
      >
        {SECTION_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            title={label}
            aria-label={`Ir a sección: ${label}`}
            className="group relative flex items-center justify-end"
          >
            {/* Label tooltip */}
            <span
              className={`absolute right-6 whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-lg pointer-events-none transition-all duration-200 ${
                activeSection === i
                  ? 'opacity-100 text-[#F8FAFC] bg-[#2563EB]'
                  : 'opacity-0 group-hover:opacity-100 text-[#94A3B8] bg-[#111827] border border-[#1E293B]'
              }`}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'w-3 h-3 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shadow-md shadow-[#2563EB]/50'
                  : 'w-2 h-2 bg-[#1E293B] border border-[#334155] group-hover:border-[#2563EB]/50 group-hover:bg-[#1E3A6E]'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Team badge — fixed bottom-left */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50 transition-transform duration-200 hover:scale-105">
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl px-4 py-3 flex flex-col gap-2 min-w-[200px]">
          {/* Header row */}
          <div className="flex items-center gap-2">
            <span className="text-[#F8FAFC] text-xs font-bold">FinAgent360</span>
            <span className="text-[#94A3B8] text-xs">·</span>
            <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Equipo 37
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1E293B]" />

          {/* Advisor */}
          <div>
            <p className="text-[#F8FAFC] text-xs">👩‍🏫 Mtra. Mónica García R.</p>
            <p className="text-[#94A3B8] text-[10px] italic">Asesora</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1E293B]" />

          {/* Members */}
          <div className="flex flex-col gap-0.5">
            <p className="text-[#F8FAFC] text-xs">👩‍💻 Kamila García Zamora</p>
            <p className="text-[#F8FAFC] text-xs">💻 David Farfán C.</p>
          </div>

          {/* Footer */}
          <p className="text-[#06B6D4] text-[9px] font-medium tracking-wide">
            Hackathon IA Agéntica 2026
          </p>
        </div>
      </div>

      {/* QR popup — fixed bottom-right */}
      <div className="hidden md:flex flex-col fixed bottom-6 right-6 z-50 transition-transform duration-200 hover:scale-105 w-48 bg-[#111827] border border-[#1E293B] rounded-2xl shadow-2xl p-4 gap-2">
        <p className="text-[#94A3B8] text-xs text-center">📱 Escanea para ver la app</p>
        <div className="rounded-lg overflow-hidden mx-auto">
          <QRCodeSVG
            value="https://fin-agent-360.vercel.app"
            size={128}
            bgColor="#ffffff"
            fgColor="#2563EB"
            level="M"
          />
        </div>
        <p className="text-[#06B6D4] text-xs text-center">fin-agent-360.vercel.app</p>
        <div className="border-t border-[#1E293B] mt-0 pt-2">
          <p className="text-[#94A3B8] text-xs text-center">🏆 Equipo 37</p>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-5 right-5 z-50 hidden md:flex items-center gap-1.5 text-[#94A3B8]/50 text-xs select-none">
        <kbd className="bg-[#111827] border border-[#1E293B] rounded px-1.5 py-0.5 text-[10px]">↑</kbd>
        <kbd className="bg-[#111827] border border-[#1E293B] rounded px-1.5 py-0.5 text-[10px]">↓</kbd>
        <span>navegar</span>
      </div>
    </div>
  );
}
