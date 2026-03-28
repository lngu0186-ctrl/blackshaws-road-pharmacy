import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Blackshaws Road Pharmacy — return to homepage"
      className={`inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-link-active)] ${className}`}
    >
      <picture>
        <source srcSet="/logo.webp" type="image/webp" />
        <img
          src="/logo.png"
          alt="Blackshaws Road Pharmacy"
          height={44}
          style={{
            maxHeight: 'var(--logo-max-height)',
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
    </Link>
  )
}
