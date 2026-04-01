import { Building2 } from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '../../utils/cn'

interface BrandSignatureProps {
  className?: string
  tone?: 'light' | 'dark'
}

export function BrandSignature({ className, tone = 'light' }: BrandSignatureProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-4 rounded-[24px] border px-4 py-3 backdrop-blur-sm',
        isDark
          ? 'border-white/14 bg-white/8 text-white shadow-[0_18px_50px_-34px_rgba(255,255,255,0.28)]'
          : 'border-[var(--color-border)] bg-white/92 text-[var(--color-navy)] shadow-[0_24px_60px_-42px_rgba(16,24,63,0.22)]',
        className,
      )}
    >
      <Logo
        variant={isDark ? 'dark' : 'default'}
        className="h-12 w-[9.5rem] sm:w-[10.5rem]"
        imageClassName="object-contain"
        priority={isDark}
      />
      <div className="min-w-0">
        <p className={cn('text-xs font-bold uppercase tracking-[0.2em]', isDark ? 'text-white/65' : 'text-[var(--color-red)]')}>
          Blackshaws Road Pharmacy
        </p>
        <p className={cn('mt-1 text-sm font-semibold leading-tight', isDark ? 'text-white' : 'text-[var(--color-navy-deep)]')}>
          Trusted community pharmacy care in Altona North since 1968.
        </p>
      </div>
      <Building2 className={cn('h-5 w-5 shrink-0', isDark ? 'text-white/72' : 'text-[var(--color-red)]')} />
    </div>
  )
}
