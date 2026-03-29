/** BrandLogo — centralised brand logo component for consistent usage site-wide. */

interface BrandLogoProps {
  /** 'dark' = black logo on light bg, 'light' = white logo on dark bg, 'badge' = with Alliance badge */
  variant?: 'dark' | 'light' | 'badge'
  className?: string
  style?: React.CSSProperties
}

export function BrandLogo({ variant = 'dark', className = '', style }: BrandLogoProps) {
  const src =
    variant === 'light'
      ? '/logo-white.webp'
      : variant === 'badge'
        ? '/logo-badge.webp'
        : '/logo-black.webp'

  return (
    <img
      src={src}
      alt="Blackshaws Road Pharmacy"
      className={className}
      style={{ objectFit: 'contain', display: 'block', ...style }}
      loading={variant === 'dark' ? undefined : 'lazy'}
    />
  )
}
