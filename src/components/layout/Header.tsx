'use client';
import { Bell, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-[72px] px-8 border-b border-slate-200 bg-white sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-56 pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
            AF
          </div>
          <span className="text-sm font-medium text-slate-700">Alberto</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
