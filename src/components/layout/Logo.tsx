/** Logo — renders the official brand artwork linked to the homepage. */
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
  imageClassName?: string
  variant?: 'default' | 'dark' | 'white'
  lockup?: 'wordmark' | 'mark'
  priority?: boolean
}

const logoMap = {
  default: {
    wordmark: '/logo-1040.png',
    mark: '/logo-mark-512.png',
  },
  dark: {
    wordmark: '/logo-white.png',
    mark: '/logo-mark-512.png',
  },
  white: {
    wordmark: '/logo-white.png',
    mark: '/logo-mark-512.png',
  },
} as const

export function Logo({
  className,
  imageClassName,
  variant = 'default',
  lockup = 'wordmark',
  priority = false,
}: LogoProps) {
  const logoSrc = logoMap[variant][lockup]
  const alt = lockup === 'mark' ? 'Blackshaws Road Pharmacy brand mark' : 'Blackshaws Road Pharmacy'

  return (
    <Link
      to="/"
      aria-label="Blackshaws Road Pharmacy — return to homepage"
      className={cn('inline-flex min-w-0 shrink-0 items-center focus-visible:outline-none', className)}
    >
      <img
        src={logoSrc}
        alt={alt}
        className={cn('block h-full w-auto max-w-full object-contain object-left', imageClassName)}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </Link>
  )
}
