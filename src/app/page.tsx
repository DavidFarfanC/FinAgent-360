'use client';
import { MainLayout } from '@/components/layout/MainLayout';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AgentHighlight } from '@/components/dashboard/AgentHighlight';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { mockCards, mockTransactions } from '@/lib/mock-data';
import { CreditCard, ArrowUpDown, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

const statCards = [
  {
    label: 'Total movimientos',
    value: mockTransactions.length.toString(),
    sub: 'Este mes',
    icon: ArrowUpDown,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/15',
  },
  {
    label: 'Tarjetas activas',
    value: mockCards.filter((c) => c.status === 'active').length.toString(),
    sub: `de ${mockCards.length} registradas`,
    icon: CreditCard,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/15',
  },
  {
    label: 'Próximo pago',
    value: '15 Mar',
    sub: 'Tarjeta de crédito',
    icon: Calendar,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/15',
  },
];

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <MainLayout
      title="Dashboard"
      subtitle={`${greeting}, Alberto`}
    >
      <div className="space-y-6">
        {/* Welcome banner */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-white">
            {greeting},{' '}
            <span className="gradient-text">Alberto</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Aquí tienes un resumen de tu actividad financiera.
          </p>
        </div>

        {/* Main grid: Balance + Agent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in delay-100">
          <div className="lg:col-span-2">
            <BalanceCard />
          </div>
          <div className="lg:col-span-1">
            <AgentHighlight />
          </div>
        </div>

        {/* Quick actions */}
        <div className="animate-fade-in delay-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Acciones rápidas
          </p>
          <QuickActions />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in delay-300">
          {statCards.map(({ label, value, sub, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={clsx(
                'glass-card rounded-2xl p-5 flex items-center gap-4 card-hover border',
                border
              )}
            >
              <div
                className={clsx(
                  'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                  bg
                )}
              >
                <Icon className={clsx('w-5 h-5', color)} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs font-medium text-slate-400 truncate">
                  {label}
                </p>
                <p className="text-[10px] text-slate-600 truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent transactions */}
        <div className="animate-fade-in delay-400">
          <RecentTransactions />
        </div>
      </div>
    </MainLayout>
  );
}
