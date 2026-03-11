'use client';
import { useState } from 'react';
import {
  FileText,
  Download,
  Loader2,
  Plus,
  Clock,
  CheckCircle,
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { clsx } from 'clsx';
import { mockStatements, formatCurrency } from '@/lib/mock-data';
import { Statement } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

function StatementStatusBadge({ status }: { status: Statement['status'] }) {
  if (status === 'available')
    return (
      <Badge variant="success" dot>
        Disponible
      </Badge>
    );
  if (status === 'processing')
    return (
      <Badge variant="warning" dot>
        Procesando
      </Badge>
    );
  return (
    <Badge variant="neutral" dot>
      Pendiente
    </Badge>
  );
}

function CurrentPeriodCard({ statement }: { statement: Statement }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-cyan-900/20 border border-blue-500/20">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-widest mb-1">
              Período actual
            </p>
            <h3 className="text-xl font-bold text-white">{statement.period}</h3>
          </div>
          <StatementStatusBadge status={statement.status} />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
          <p className="text-sm text-slate-400">
            Estado de cuenta en generación...
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.05] rounded-xl p-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Saldo inicial
            </p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(statement.openingBalance)}
            </p>
          </div>
          <div className="bg-white/[0.05] rounded-xl p-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Fecha estimada
            </p>
            <p className="text-sm font-semibold text-white">1 Apr 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatementCard({ statement }: { statement: Statement }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDownloading(false);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="glass-card rounded-2xl p-5 card-hover flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {statement.period}
            </p>
            <p className="text-xs text-slate-500">
              {statement.fileSize || '—'}
            </p>
          </div>
        </div>
        <StatementStatusBadge status={statement.status} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
          <p className="text-[10px] text-slate-600 mb-1">Movimientos</p>
          <p className="text-sm font-semibold text-slate-300">
            {statement.transactions}
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
          <p className="text-[10px] text-slate-600 mb-1">Saldo final</p>
          <p className="text-sm font-semibold text-slate-300">
            {formatCurrency(statement.closingBalance)}
          </p>
        </div>
      </div>

      {/* Balance change */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">
          Saldo inicial:{' '}
          <span className="text-slate-400">
            {formatCurrency(statement.openingBalance)}
          </span>
        </span>
        {statement.closingBalance > statement.openingBalance ? (
          <span className="text-emerald-400 font-medium">
            +{formatCurrency(statement.closingBalance - statement.openingBalance)}
          </span>
        ) : (
          <span className="text-slate-500">Sin cambio</span>
        )}
      </div>

      {/* Download button */}
      <Button
        variant={downloaded ? 'secondary' : 'outline'}
        size="sm"
        fullWidth
        loading={downloading}
        onClick={handleDownload}
        disabled={statement.status !== 'available'}
      >
        {downloaded ? (
          <>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Descargado</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            Descargar PDF
          </>
        )}
      </Button>
    </div>
  );
}

export const DocumentCenter = () => {
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  const currentStatement = mockStatements[0];
  const pastStatements = mockStatements.slice(1);

  const handleRequestStatement = async () => {
    setRequesting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRequesting(false);
    setRequested(true);
    setTimeout(() => setRequested(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Disponibles',
            value: pastStatements.filter((s) => s.status === 'available')
              .length,
            icon: CheckCircle,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/15',
          },
          {
            label: 'Procesando',
            value: mockStatements.filter((s) => s.status === 'processing')
              .length,
            icon: Clock,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/15',
          },
          {
            label: 'Total meses',
            value: mockStatements.length,
            icon: BarChart3,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/15',
          },
        ].map(({ label, value, icon: Icon, color, bg, border }) => (
          <div
            key={label}
            className={clsx(
              'glass-card rounded-2xl p-4 flex items-center gap-3 border',
              border
            )}
          >
            <div
              className={clsx(
                'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                bg
              )}
            >
              <Icon className={clsx('w-4 h-4', color)} />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Current period */}
      <div>
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">
          Período actual
        </p>
        <CurrentPeriodCard statement={currentStatement} />
      </div>

      {/* Request button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Historial de estados
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            {pastStatements.length} estados de cuenta disponibles
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          loading={requesting}
          onClick={handleRequestStatement}
        >
          {requested ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Solicitado</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              Solicitar nuevo
            </>
          )}
        </Button>
      </div>

      {/* Statements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pastStatements.map((statement) => (
          <StatementCard key={statement.id} statement={statement} />
        ))}
      </div>

      {/* Load more hint */}
      <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors mx-auto">
        Ver estados anteriores
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
