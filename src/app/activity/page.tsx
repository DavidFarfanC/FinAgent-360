import { MainLayout } from '@/components/layout/MainLayout';
import { EventLog } from '@/components/activity/EventLog';
import { mockActivityEvents } from '@/lib/mock-data';
import { Activity, CheckCircle, Clock } from 'lucide-react';

export default function ActivityPage() {
  const successCount = mockActivityEvents.filter(
    (e) => e.status === 'success'
  ).length;
  const pendingCount = mockActivityEvents.filter(
    (e) => e.status === 'pending'
  ).length;

  return (
    <MainLayout
      title="Actividad"
      subtitle="Registro de todas las acciones en tu cuenta"
    >
      <div className="max-w-3xl space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in">
          {[
            {
              label: 'Total eventos',
              value: mockActivityEvents.length,
              icon: Activity,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/15',
            },
            {
              label: 'Exitosos',
              value: successCount,
              icon: CheckCircle,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
              border: 'border-emerald-500/15',
            },
            {
              label: 'Pendientes',
              value: pendingCount,
              icon: Clock,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
              border: 'border-amber-500/15',
            },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={`glass-card rounded-2xl p-4 flex items-center gap-3 border ${border}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Event log */}
        <div className="animate-fade-in delay-100">
          <EventLog />
        </div>
      </div>
    </MainLayout>
  );
}
