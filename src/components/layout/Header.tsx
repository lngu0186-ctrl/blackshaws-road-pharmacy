import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, Phone, ChevronDown, Clock3, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { useCartStore } from '../../stores/cartStore'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import type { Service } from '../../data/services'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/shop', label: 'Shop' },
  { href: '/#vaccination', label: 'Vaccinations' },
  { href: '/#chemist-care', label: 'Chemist Care' },
  { href: '/#location', label: 'Contact' },
]

const topServices: Service[] = [
  { title: 'Flu Vaccination', slug: 'flu-vaccination' },
  { title: 'Medication Review', slug: 'medscheck' },
  { title: 'Travel Vaccinations', slug: 'travel-vaccinations' },
  { title: 'Blood Pressure Check', slug: 'blood-pressure-check' },
  { title: 'Diabetes Care', slug: 'diabetes-management' },
  { title: 'UTI Treatment', slug: 'uti-treatment' },
] as any

export function Header() {
  const location = useLocation()
  const scrolled = useScrolled(10)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCartStore((s) => s.openCart)

  const isHome = location.pathname === '/'
  const activeHref = useMemo(() => navLinks.find((link) => link.href === location.pathname)?.href, [location.pathname])

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:block border-b border-white/10 bg-[var(--color-navy-deep)] text-white">
        <div className="container-custom flex items-center justify-between py-2 text-[0.8rem] text-white/80">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> 310A Blackshaws Road, Altona North</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> Community pharmacy care, 7 days</span>
          </div>
          <a href="tel:+61393913257" className="inline-flex items-center gap-2 font-semibold text-white hover:text-white/85">
            <Phone className="h-3.5 w-3.5" /> (03) 9391 3257
          </a>
        </div>
      </div>

      <div className={cn('transition-all duration-300', scrolled || !isHome ? 'border-b border-[var(--color-border)] bg-[rgba(255,253,250,0.94)] backdrop-blur-xl shadow-[0_20px_40px_-36px_rgba(16,24,63,0.55)]' : 'bg-[rgba(255,253,250,0.82)] backdrop-blur-xl')}>
        <div className="container-custom flex h-[var(--header-height-mobile)] items-center justify-between gap-4 md:h-[var(--header-height-desktop)]">
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setMobileMenuOpen(true)} className="icon-btn md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <Logo className="h-[var(--logo-max-height-mobile)] md:h-[var(--logo-max-height)]" />
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={cn('nav-link', activeHref === link.href ? 'nav-link-active' : '')}>
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button className="nav-link flex items-center gap-1" onClick={() => setServicesDropdownOpen((v) => !v)} aria-expanded={servicesDropdownOpen}>
                Popular services <ChevronDown className={cn('h-4 w-4 transition-transform', servicesDropdownOpen && 'rotate-180')} />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-[22rem] rounded-[24px] border border-[var(--color-border)] bg-white p-3 shadow-[0_32px_80px_-38px_rgba(16,24,63,0.45)]">
                  <Link to="/services" className="mb-2 block rounded-2xl bg-[var(--color-navy-soft)] px-4 py-3 font-semibold text-[var(--color-navy)]" onClick={() => setServicesDropdownOpen(false)}>
                    Explore all pharmacy services
                  </Link>
                  <div className="grid gap-1">
                    {topServices.map((service) => (
                      <Link key={service.slug} to={`/services/${service.slug}`} className="rounded-2xl px-4 py-3 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-navy)]" onClick={() => setServicesDropdownOpen(false)}>
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="tel:+61393913257" className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-navy)] md:inline-flex">
              Call the pharmacy
            </a>
            <button onClick={openCart} className="icon-btn relative" aria-label={`Shopping cart with ${cartCount} items`}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">{cartCount > 9 ? '9+' : cartCount}</span>}
            </button>
            <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer" className="btn-header-primary text-sm">
              Book vaccination
            </a>
          </div>
        </div>
      </div>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="space-y-6">
          <div className="rounded-[28px] bg-[var(--color-navy-deep)] p-5 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-white/65">Blackshaws Road Pharmacy</p>
            <p className="mt-2 text-lg font-semibold">Trusted local care, prescriptions, services and online shopping.</p>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="block rounded-2xl px-4 py-3 text-base font-semibold text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)]" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="rounded-[24px] bg-[var(--color-surface-alt)] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Popular services</p>
            <div className="space-y-1">
              {topServices.map((service) => (
                <Link key={service.slug} to={`/services/${service.slug}`} className="block rounded-xl px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-navy)]" onClick={() => setMobileMenuOpen(false)}>
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MobileDrawer>
    </header>
  )
}
