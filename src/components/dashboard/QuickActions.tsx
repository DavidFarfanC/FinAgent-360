'use client';
import { ArrowUpRight, CreditCard, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

const actions = [
  {
    id: 'transfer',
    label: 'Transferir',
    icon: ArrowUpRight,
    color: 'blue',
    gradient: 'from-blue-600/20 to-blue-500/10',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
    glow: 'hover:shadow-blue-500/10',
  },
  {
    id: 'pay',
    label: 'Pagar',
    icon: CreditCard,
    color: 'cyan',
    gradient: 'from-cyan-600/20 to-cyan-500/10',
    iconColor: 'text-cyan-400',
    border: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-cyan-500/10',
  },
  {
    id: 'deposit',
    label: 'Depositar',
    icon: ArrowDownLeft,
    color: 'emerald',
    gradient: 'from-emerald-600/20 to-emerald-500/10',
    iconColor: 'text-emerald-400',
    border: 'border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-emerald-500/10',
  },
  {
    id: 'more',
    label: 'Más',
    icon: MoreHorizontal,
    color: 'slate',
    gradient: 'from-slate-600/20 to-slate-500/10',
    iconColor: 'text-slate-400',
    border: 'border-white/10',
    hoverBorder: 'hover:border-white/20',
    glow: 'hover:shadow-slate-500/10',
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map(
        ({ id, label, icon: Icon, gradient, iconColor, border, hoverBorder, glow }) => (
          <button
            key={id}
            className={clsx(
              'flex flex-col items-center gap-3 p-4 rounded-2xl border bg-gradient-to-b transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] group',
              gradient,
              border,
              hoverBorder,
              glow
            )}
          >
            <div
              className={clsx(
                'w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors',
              )}
            >
              <Icon className={clsx('w-5 h-5', iconColor)} />
            </div>
            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
              {label}
            </span>
          </button>
        )
      )}
    </div>
  );
};
