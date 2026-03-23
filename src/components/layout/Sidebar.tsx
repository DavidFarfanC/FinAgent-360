'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  CreditCard,
  User,
  Activity,
  FileText,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'Asistente IA', icon: Sparkles, isAI: true },
  { href: '/cards', label: 'Mis Tarjetas', icon: CreditCard },
  { href: '/account', label: 'Mi Cuenta', icon: User },
  { href: '/activity', label: 'Actividad', icon: Activity },
  { href: '/documents', label: 'Documentos', icon: FileText },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] flex flex-col border-r border-slate-200 bg-white z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-[72px] border-b border-slate-200">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            FinAgent
          </span>
          <span className="text-sm font-bold gradient-text tracking-tight">
            {' '}
            360
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          Principal
        </p>
        {navItems.map(({ href, label, icon: Icon, isAI }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r-full" />
              )}
              <span
                className={clsx(
                  'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 flex-shrink-0',
                  isActive
                    ? isAI
                      ? 'bg-purple-100'
                      : 'bg-blue-100'
                    : 'group-hover:bg-slate-100'
                )}
              >
                <Icon
                  className={clsx('w-4 h-4', {
                    'text-purple-600': isActive && isAI,
                    'text-blue-600': isActive && !isAI,
                    'text-slate-400 group-hover:text-slate-700': !isActive,
                  })}
                />
              </span>
              <span className="flex-1">{label}</span>
              {isAI && (
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-200 p-4 space-y-2">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg">
            <Settings className="w-4 h-4 text-slate-400" />
          </span>
          <span>Configuración</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            AF
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-700 truncate">
              Alberto F.
            </p>
            <p className="text-[10px] text-slate-400 truncate">Premium</p>
          </div>
          <button className="text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
