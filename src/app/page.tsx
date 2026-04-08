'use client';
import { MainLayout } from '@/components/layout/MainLayout';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AgentHighlight } from '@/components/dashboard/AgentHighlight';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';

export default function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <div className="p-6">

        {/* Saludo */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-slate-900">
            Buenas noches, <span className="text-blue-600">Alberto</span>
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Aquí tienes un resumen de tu actividad financiera.
          </p>
        </div>

        {/* Grid balanceado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          {/* Izquierda: saldo + acciones + movimientos */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <BalanceCard />
            <QuickActions />
            <RecentTransactions />
          </div>

          {/* Derecha: agente */}
          <div className="col-span-1">
            <AgentHighlight />
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
