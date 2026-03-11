import {
  Music,
  Building2,
  ShoppingCart,
  UtensilsCrossed,
  Play,
  ArrowDownLeft,
  Fuel,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { mockTransactions, formatCurrency, formatDate } from '@/lib/mock-data';
import { Transaction } from '@/types';
import { clsx } from 'clsx';

const iconMap: Record<string, React.ElementType> = {
  music: Music,
  building: Building2,
  'shopping-cart': ShoppingCart,
  utensils: UtensilsCrossed,
  play: Play,
  'arrow-down': ArrowDownLeft,
  fuel: Fuel,
  zap: Zap,
};

const categoryColors: Record<string, string> = {
  Entretenimiento: 'bg-purple-500/15 text-purple-400',
  Depósito: 'bg-emerald-500/15 text-emerald-400',
  Supermercado: 'bg-blue-500/15 text-blue-400',
  Comida: 'bg-amber-500/15 text-amber-400',
  Transferencia: 'bg-cyan-500/15 text-cyan-400',
  Gasolina: 'bg-orange-500/15 text-orange-400',
  Servicios: 'bg-slate-500/15 text-slate-400',
};

function TransactionIcon({ transaction }: { transaction: Transaction }) {
  const Icon = iconMap[transaction.icon] || Zap;
  const colorClass =
    categoryColors[transaction.category] || 'bg-slate-500/15 text-slate-400';

  return (
    <div
      className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
        colorClass
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
}

export const RecentTransactions = () => {
  const recent = mockTransactions.slice(0, 6);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-white">
            Movimientos recientes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Últimas transacciones de tu cuenta
          </p>
        </div>
        <Link
          href="/activity"
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Ver todo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((transaction, index) => (
          <div
            key={transaction.id}
            className={clsx(
              'flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-150 group',
              index !== recent.length - 1 ? 'mb-0' : ''
            )}
          >
            <TransactionIcon transaction={transaction} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition-colors">
                  {transaction.description}
                </p>
                <span
                  className={clsx(
                    'text-sm font-semibold ml-4 flex-shrink-0',
                    transaction.type === 'credit'
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  )}
                >
                  {transaction.type === 'credit' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-slate-500 truncate">
                  {transaction.merchant}
                </p>
                <span className="text-xs text-slate-600 ml-4 flex-shrink-0">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
