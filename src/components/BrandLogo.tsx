/** BrandLogo — legacy compatibility wrapper around the current Logo component. */
import { Logo } from './layout/Logo'

interface BrandLogoProps {
  /** 'dark' = dark wordmark on light bg, 'light' = white wordmark on dark bg, 'badge' maps to the standard dark wordmark */
  variant?: 'dark' | 'light' | 'badge'
  className?: string
  style?: React.CSSProperties
}

export function BrandLogo({ variant = 'dark', className = '', style }: BrandLogoProps) {
  const mappedVariant = variant === 'light' ? 'dark' : 'default'

  return (
    <div className={className} style={style}>
      <Logo variant={mappedVariant} className="h-full w-full" imageClassName="object-contain" />
    </div>
  )
}
