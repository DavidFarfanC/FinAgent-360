'use client';
import { useState } from 'react';
import {
  Wallet,
  Lock,
  Unlock,
  MapPin,
  FileText,
  Download,
  LogIn,
  User,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ActivityEvent } from '@/types';
import { mockActivityEvents, formatDate, formatTime } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';

const eventConfig: Record<
  ActivityEvent['type'],
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    label: string;
    filterGroup: string;
  }
> = {
  balance_check: {
    icon: Wallet,
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    label: 'Saldo',
    filterGroup: 'Cuenta',
  },
  card_blocked: {
    icon: Lock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/20',
    label: 'Tarjetas',
    filterGroup: 'Tarjetas',
  },
  card_unblocked: {
    icon: Unlock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/20',
    label: 'Tarjetas',
    filterGroup: 'Tarjetas',
  },
  address_updated: {
    icon: MapPin,
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    label: 'Cuenta',
    filterGroup: 'Cuenta',
  },
  statement_requested: {
    icon: FileText,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/20',
    label: 'Documentos',
    filterGroup: 'Documentos',
  },
  statement_downloaded: {
    icon: Download,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/20',
    label: 'Documentos',
    filterGroup: 'Documentos',
  },
  login: {
    icon: LogIn,
    color: 'text-slate-400',
    bg: 'bg-slate-500/15',
    border: 'border-slate-500/20',
    label: 'Seguridad',
    filterGroup: 'Seguridad',
  },
  profile_updated: {
    icon: User,
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    label: 'Cuenta',
    filterGroup: 'Cuenta',
  },
  payment_made: {
    icon: CreditCard,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/20',
    label: 'Pagos',
    filterGroup: 'Pagos',
  },
};

const filters = ['Todos', 'Seguridad', 'Tarjetas', 'Cuenta', 'Documentos', 'Pagos'];

function EventItem({
  event,
  isLast,
}: {
  event: ActivityEvent;
  isLast: boolean;
}) {
  const config = eventConfig[event.type];
  const Icon = config.icon;

  const StatusIcon =
    event.status === 'success'
      ? CheckCircle
      : event.status === 'pending'
      ? Clock
      : XCircle;

  return (
    <div className="flex gap-4 group">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div
          className={clsx(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-200 group-hover:scale-105',
            config.bg,
            config.border
          )}
        >
          <Icon className={clsx('w-4 h-4', config.color)} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-white/[0.06] min-h-[20px]" />
        )}
      </div>

      {/* Content */}
      <div
        className={clsx(
          'flex-1 pb-5',
          isLast ? '' : ''
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                {event.title}
              </p>
              <Badge
                variant={
                  event.status === 'success'
                    ? 'success'
                    : event.status === 'pending'
                    ? 'warning'
                    : 'error'
                }
                size="sm"
              >
                <StatusIcon className="w-2.5 h-2.5" />
                {event.status === 'success'
                  ? 'Exitoso'
                  : event.status === 'pending'
                  ? 'Pendiente'
                  : 'Fallido'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {event.description}
            </p>

            {/* Metadata pills */}
            {event.metadata && Object.keys(event.metadata).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Object.entries(event.metadata).map(([key, value]) => (
                  <span
                    key={key}
                    className="text-[10px] bg-white/[0.04] border border-white/[0.06] text-slate-500 px-2 py-0.5 rounded-lg"
                  >
                    {value}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-slate-500">
              {formatDate(event.timestamp)}
            </p>
            <p className="text-[10px] text-slate-600 mt-0.5">
              {formatTime(event.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const EventLog = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtered =
    activeFilter === 'Todos'
      ? mockActivityEvents
      : mockActivityEvents.filter(
          (e) => eventConfig[e.type].filterGroup === activeFilter
        );

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Event count */}
      <p className="text-xs text-slate-600">
        Mostrando {filtered.length} evento
        {filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Timeline */}
      <div className="glass-card rounded-2xl p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-slate-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              No hay eventos en esta categoría
            </p>
          </div>
        ) : (
          <div>
            {filtered.map((event, index) => (
              <EventItem
                key={event.id}
                event={event}
                isLast={index === filtered.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
