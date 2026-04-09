import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'warning' | 'success'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
        {
          'border-blue-200 bg-blue-50 text-blue-700': variant === 'default',
          'border-slate-200 bg-slate-100 text-slate-700': variant === 'secondary',
          'border-red-200 bg-red-50 text-red-700': variant === 'destructive',
          'border-slate-300 bg-white text-slate-700': variant === 'outline',
          'border-amber-200 bg-amber-50 text-amber-700': variant === 'warning',
          'border-green-200 bg-green-50 text-green-700': variant === 'success',
        },
        className,
      )}
      {...props}
    />
  )
}
