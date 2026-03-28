/** Logo — renders official pharmacy logo linked to homepage. */
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
  variant?: 'default' | 'dark'
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  const logoSrc = variant === 'dark' ? '/logo-dark.svg' : '/logo.svg'

  return (
    <Link
      to="/"
      aria-label="Blackshaws Road Pharmacy — return to homepage"
      className={cn('inline-flex items-center shrink-0 focus-visible:outline-none', className)}
    >
      <img
        src={logoSrc}
        alt="Blackshaws Road Pharmacy"
        height={44}
        style={{
          maxHeight: '100%',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        fetchPriority="high"
        decoding="sync"
      />
    </Link>
  )
}
