import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'active';
  size?: 'sm' | 'md';
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export const Badge = ({
  variant = 'neutral',
  size = 'sm',
  children,
  dot,
  className,
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        {
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20':
            variant === 'success' || variant === 'active',
          'bg-amber-500/10 text-amber-400 border border-amber-500/20':
            variant === 'warning',
          'bg-red-500/10 text-red-400 border border-red-500/20':
            variant === 'error',
          'bg-blue-500/10 text-blue-400 border border-blue-500/20':
            variant === 'info',
          'bg-white/5 text-slate-400 border border-white/10':
            variant === 'neutral',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full', {
            'bg-emerald-400': variant === 'success' || variant === 'active',
            'bg-amber-400': variant === 'warning',
            'bg-red-400': variant === 'error',
            'bg-blue-400': variant === 'info',
            'bg-slate-400': variant === 'neutral',
          })}
        />
      )}
      {children}
    </span>
  );
};
