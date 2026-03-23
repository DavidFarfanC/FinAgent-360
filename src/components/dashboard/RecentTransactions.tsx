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
  Entretenimiento: 'bg-purple-100 text-purple-600',
  Depósito: 'bg-emerald-100 text-emerald-700',
  Supermercado: 'bg-blue-100 text-blue-600',
  Comida: 'bg-amber-100 text-amber-700',
  Transferencia: 'bg-cyan-100 text-cyan-700',
  Gasolina: 'bg-orange-100 text-orange-700',
  Servicios: 'bg-slate-100 text-slate-600',
};

function TransactionIcon({ transaction }: { transaction: Transaction }) {
  const Icon = iconMap[transaction.icon] || Zap;
  const colorClass =
    categoryColors[transaction.category] || 'bg-slate-100 text-slate-600';

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
          <h2 className="text-base font-semibold text-slate-900">
            Movimientos recientes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Últimas transacciones de tu cuenta
          </p>
        </div>
        <Link
          href="/activity"
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Ver todo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-150 group"
          >
            <TransactionIcon transaction={transaction} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800 truncate group-hover:text-slate-900 transition-colors">
                  {transaction.description}
                </p>
                <span
                  className={clsx(
                    'text-sm font-semibold ml-4 flex-shrink-0',
                    transaction.type === 'credit'
                      ? 'text-emerald-600'
                      : 'text-slate-700'
                  )}
                >
                  {transaction.type === 'credit' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-slate-400 truncate">
                  {transaction.merchant}
                </p>
                <span className="text-xs text-slate-400 ml-4 flex-shrink-0">
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
export default RecentTransactions;
