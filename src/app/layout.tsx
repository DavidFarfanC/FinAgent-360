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
    <html lang="es" className="dark">
      <body className="bg-[#050912] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
