'use client';
import { useState } from 'react';
import { Eye, EyeOff, TrendingUp, ArrowUpRight } from 'lucide-react';
import { mockUser, formatCurrency } from '@/lib/mock-data';

export const BalanceCard = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-cyan-600/70 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
      {/* Mesh background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.5) 0%, transparent 50%)`,
        }}
      />
      {/* Pattern overlay */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200/80 text-xs font-medium uppercase tracking-widest mb-1">
              Saldo disponible
            </p>
            <p className="text-white/60 text-xs">
              {mockUser.accountType} · {mockUser.accountNumber}
            </p>
          </div>
          <button
            onClick={() => setVisible(!visible)}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
          >
            {visible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="mb-4">
          {visible ? (
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">
                {formatCurrency(mockUser.balance)}
              </span>
              <span className="text-blue-200/70 text-sm mb-1">
                {mockUser.currency}
              </span>
            </div>
          ) : (
            <div className="h-10 w-48 rounded-lg bg-white/20 shimmer" />
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-400/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">+12.4%</span>
            <span className="text-xs text-emerald-300/70">este mes</span>
          </div>
          <button className="flex items-center gap-1 text-white/60 hover:text-white/90 text-xs font-medium transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Ver movimientos
          </button>
        </div>
      </div>
    </div>
  );
};
export default BalanceCard;
