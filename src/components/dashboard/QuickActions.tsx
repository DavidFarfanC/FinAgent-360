'use client';
import { ArrowUpRight, CreditCard, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

const actions = [
  {
    id: 'transfer',
    label: 'Transferir',
    icon: ArrowUpRight,
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'pay',
    label: 'Pagar',
    icon: CreditCard,
    bg: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
  },
  {
    id: 'deposit',
    label: 'Depositar',
    icon: ArrowDownLeft,
    bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'more',
    label: 'Más',
    icon: MoreHorizontal,
    bg: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map(({ id, label, icon: Icon, bg, iconBg, iconColor }) => (
        <button
          key={id}
          className={clsx(
            'flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] group',
            bg
          )}
        >
          <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
            <Icon className={clsx('w-5 h-5', iconColor)} />
          </div>
          <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};
export default QuickActions;
