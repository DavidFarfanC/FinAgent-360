import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinAgent 360 — Banca Digital Inteligente',
  description: 'Tu copiloto financiero impulsado por IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#F0F4FF] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
