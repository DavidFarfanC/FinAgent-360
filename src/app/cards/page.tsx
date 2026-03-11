'use client';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BankCard } from '@/components/cards/BankCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockCards, formatCurrency } from '@/lib/mock-data';
import { Card as CardType } from '@/types';
import {
  Lock,
  Unlock,
  Eye,
  Settings,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Check,
} from 'lucide-react';
import { clsx } from 'clsx';

function CardStatusBadge({ status }: { status: CardType['status'] }) {
  if (status === 'active') return <Badge variant="success" dot>Activa</Badge>;
  if (status === 'blocked') return <Badge variant="error" dot>Bloqueada</Badge>;
  return <Badge variant="warning" dot>Expirada</Badge>;
}

function CardDetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-medium text-slate-300">{value}</span>
    </div>
  );
}

interface BlockConfirmProps {
  card: CardType;
  onConfirm: () => void;
  onCancel: () => void;
  isBlocking: boolean;
}

function BlockConfirmModal({
  card,
  onConfirm,
  onCancel,
  isBlocking,
}: BlockConfirmProps) {
  const willBlock = card.status === 'active';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative glass-card rounded-2xl p-6 w-full max-w-sm border border-white/10 animate-slide-up">
        <div
          className={clsx(
            'w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4',
            willBlock ? 'bg-amber-500/15' : 'bg-emerald-500/15'
          )}
        >
          {willBlock ? (
            <AlertTriangle
              className="w-6 h-6 text-amber-400"
            />
          ) : (
            <Unlock className="w-6 h-6 text-emerald-400" />
          )}
        </div>
        <h3 className="text-base font-semibold text-white text-center mb-2">
          {willBlock ? 'Bloquear tarjeta' : 'Desbloquear tarjeta'}
        </h3>
        <p className="text-sm text-slate-400 text-center mb-6">
          {willBlock
            ? `¿Confirmas que deseas bloquear temporalmente tu tarjeta ${card.type.toUpperCase()} *${card.lastFour}?`
            : `¿Confirmas que deseas reactivar tu tarjeta ${card.type.toUpperCase()} *${card.lastFour}?`}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant={willBlock ? 'danger' : 'primary'}
            fullWidth
            loading={isBlocking}
            onClick={onConfirm}
          >
            {willBlock ? 'Bloquear' : 'Desbloquear'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CardsPage() {
  const [cards, setCards] = useState<CardType[]>(mockCards);
  const [confirmCardId, setConfirmCardId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentlyChanged, setRecentlyChanged] = useState<string | null>(null);

  const cardToConfirm = cards.find((c) => c.id === confirmCardId);

  const handleToggleBlock = async () => {
    if (!confirmCardId) return;
    setIsProcessing(true);

    await new Promise((r) => setTimeout(r, 1500));

    setCards((prev) =>
      prev.map((c) =>
        c.id === confirmCardId
          ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' }
          : c
      )
    );
    setRecentlyChanged(confirmCardId);
    setIsProcessing(false);
    setConfirmCardId(null);

    setTimeout(() => setRecentlyChanged(null), 3000);
  };

  return (
    <MainLayout
      title="Mis Tarjetas"
      subtitle="Gestiona tus tarjetas bancarias"
    >
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-slate-500 text-sm">
              {cards.filter((c) => c.status === 'active').length} de{' '}
              {cards.length} tarjetas activas
            </p>
          </div>
          <Button variant="outline" size="sm">
            <CreditCard className="w-3.5 h-3.5" />
            Solicitar tarjeta
          </Button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={clsx(
                'glass-card rounded-2xl p-6 space-y-6 transition-all duration-500 animate-fade-in',
                recentlyChanged === card.id && 'ring-1 ring-emerald-500/30'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Success toast */}
              {recentlyChanged === card.id && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-2 rounded-xl animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  Cambio aplicado exitosamente
                </div>
              )}

              {/* Visual card */}
              <div className="flex justify-center">
                <BankCard card={card} />
              </div>

              {/* Card header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {card.type === 'visa' ? 'Visa' : 'Mastercard'}{' '}
                    {card.cardType === 'debit' ? 'Débito' : 'Crédito'} *
                    {card.lastFour}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {card.holder}
                  </p>
                </div>
                <CardStatusBadge status={card.status} />
              </div>

              {/* Card details */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4">
                <CardDetailRow
                  label="Número"
                  value={`**** **** **** ${card.lastFour}`}
                />
                <CardDetailRow
                  label="Vencimiento"
                  value={`${card.expiryMonth}/${card.expiryYear}`}
                />
                <CardDetailRow label="Tipo" value={card.type.toUpperCase()} />
                {card.cardType === 'credit' && card.limit && (
                  <>
                    <CardDetailRow
                      label="Límite de crédito"
                      value={formatCurrency(card.limit)}
                    />
                    <CardDetailRow
                      label="Disponible"
                      value={formatCurrency(card.available || 0)}
                    />
                  </>
                )}
              </div>

              {/* Credit utilization bar */}
              {card.cardType === 'credit' && card.limit && card.available && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">Uso del crédito</span>
                    <span className="text-xs font-medium text-slate-300">
                      {Math.round(((card.limit - card.available) / card.limit) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${((card.limit - card.available) / card.limit) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-slate-600">
                      {formatCurrency(card.limit - card.available)} usado
                    </span>
                    <span className="text-[10px] text-slate-600">
                      {formatCurrency(card.available)} libre
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant={card.status === 'active' ? 'danger' : 'secondary'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setConfirmCardId(card.id)}
                >
                  {card.status === 'active' ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Bloquear
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      Desbloquear
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-3.5 h-3.5" />
                  Detalles
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-3.5 h-3.5" />
                </Button>
                {card.cardType === 'credit' && (
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm modal */}
      {confirmCardId && cardToConfirm && (
        <BlockConfirmModal
          card={cardToConfirm}
          onConfirm={handleToggleBlock}
          onCancel={() => setConfirmCardId(null)}
          isBlocking={isProcessing}
        />
      )}
    </MainLayout>
  );
}
