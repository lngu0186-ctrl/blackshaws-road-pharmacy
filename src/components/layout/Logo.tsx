/** Logo — renders official pharmacy logo linked to homepage. */
import { Link } from 'react-router-dom'
import { BrandLogo } from '../BrandLogo'

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
      <BrandLogo
        variant="dark"
        style={{
          maxHeight: 'var(--logo-max-height)',
          width: 'auto',
        }}
      />
    </Link>
  )
}
