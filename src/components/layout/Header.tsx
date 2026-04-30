import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Phone, ChevronDown, Clock3, MapPin, ArrowRight, Shield, FileText, FlaskConical, MessageSquare, Menu, Search } from 'lucide-react'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { useCartStore } from '../../stores/cartStore'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { healthServiceGroups } from '../../data/healthServicesNav'
import type { ReactNode } from 'react'

const navLinks: Array<{ href: string; label: string; isAnchor?: boolean }> = [
  { href: '/', label: 'Home' },
  { href: '/prescriptions', label: 'Prescriptions' },
  { href: '/health-services', label: 'Health Services' },
  { href: '/learn', label: 'Health Library' },
  { href: '/plant-based-therapies', label: 'Plant Based' },
  { href: '/compounding', label: 'Compounding' },
  { href: '/shop', label: 'Shop' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]


const featuredServiceLinks = [
  {
    href: '/prescriptions',
    label: 'Upload a prescription',
    description: 'Send it ahead for pharmacist review before pickup.',
    icon: FileText,
  },
  {
    href: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist',
    label: 'Book a vaccination',
    description: 'Fast access to the most common pharmacy bookings.',
    icon: Shield,
    external: true,
  },
  {
    href: '/compounding',
    label: 'Compounding support',
    description: 'Custom medication help and specialised supply support.',
    icon: FlaskConical,
  },
  {
    href: '/contact',
    label: 'Contact the pharmacy',
    description: 'Call or message us when you need a clear next step.',
    icon: MessageSquare,
  },
]

function NavItem({ href, isActive, isAnchor, children }: { href: string; isActive?: boolean; isAnchor?: boolean; children: ReactNode }) {
  const className = cn('nav-link', isActive ? 'nav-link-active' : '')

  if (isAnchor) return <a href={href} className={className}>{children}</a>
  return <Link to={href} className={className}>{children}</Link>
}

function MobileNavItem({ href, isAnchor, onClick, children }: { href: string; isAnchor?: boolean; onClick: () => void; children: ReactNode }) {
  const className = 'block rounded-2xl px-4 py-3 text-base font-semibold text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)]'

  if (isAnchor) return <a href={href} className={className} onClick={onClick}>{children}</a>
  return <Link to={href} className={className} onClick={onClick}>{children}</Link>
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const scrolled = useScrolled(10)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCartStore((s) => s.openCart)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const servicesMenuRef = useRef<HTMLDivElement>(null)

  const handleSearchSubmit = (e: FormEvent, q: string, closeMobile = false) => {
    e.preventDefault()
    const trimmed = q.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    if (closeMobile) setMobileMenuOpen(false)
  }

  const isHome = location.pathname === '/'
  const activeHref = useMemo(() => navLinks.find((link) => !link.isAnchor && link.href === location.pathname)?.href, [location.pathname])

  useEffect(() => {
    if (!servicesDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!servicesMenuRef.current?.contains(target) && !servicesButtonRef.current?.contains(target)) {
        setServicesDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false)
        servicesButtonRef.current?.focus()
        return
      }

      if (!servicesMenuRef.current) return
      const items = Array.from(servicesMenuRef.current.querySelectorAll<HTMLAnchorElement>('a[href]'))
      const currentIndex = items.findIndex((item) => item === document.activeElement)

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length
        items[nextIndex]?.focus()
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1
        items[nextIndex]?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [servicesDropdownOpen])

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

      <div className={cn('transition-all duration-300', scrolled || !isHome ? 'border-b border-[var(--color-border)] bg-[rgba(255,253,250,0.96)] backdrop-blur-xl shadow-[0_20px_40px_-36px_rgba(16,24,63,0.55)]' : 'bg-[rgba(255,253,250,0.88)] backdrop-blur-xl')}>
        <div className="container-custom flex h-[var(--header-height-mobile)] items-center justify-between gap-3 md:h-[var(--header-height-desktop)] md:gap-4">
          <div className="flex min-w-0 items-center gap-2.5 md:gap-5">
            <button onClick={() => setMobileMenuOpen(true)} className="icon-btn md:!hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <Logo
              className="brand-logo-header h-[var(--logo-max-height-mobile)] md:h-[var(--logo-max-height)]"
              imageClassName="origin-left"
              priority
            />
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              if (link.href === '/health-services') {
                return (
                  <div key={link.href} className="relative">
                    <button
                      ref={servicesButtonRef}
                      className="nav-link flex items-center gap-1"
                      onClick={() => setServicesDropdownOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          setServicesDropdownOpen(true)
                          requestAnimationFrame(() => servicesMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus())
                        }
                      }}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="health-services-menu"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', servicesDropdownOpen && 'rotate-180')}
                      />
                    </button>
                    {servicesDropdownOpen && (
                        <div
                          ref={servicesMenuRef}
                          id="health-services-menu"
                          className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
                          role="navigation"
                          aria-label="Health services"
                          style={{
                            width: '860px',
                            background: '#10183f',
                            borderRadius: '12px',
                            padding: '24px 28px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                          }}
                        >
                          <div className="mb-5 grid grid-cols-2 gap-3 border-b border-white/15 pb-5">
                            {featuredServiceLinks.map((item) => {
                              const Icon = item.icon
                              const sharedClassName = 'rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30'

                              if (item.external) {
                                return (
                                  <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={sharedClassName}
                                    onClick={() => setServicesDropdownOpen(false)}
                                  >
                                    <div className="flex items-center gap-2 text-white">
                                      <Icon className="h-4 w-4 text-[#e6b3ac]" />
                                      <span className="text-sm font-semibold">{item.label}</span>
                                    </div>
                                    <p className="mt-2 text-xs leading-relaxed text-white/68">{item.description}</p>
                                  </a>
                                )
                              }

                              return (
                                <Link key={item.href} to={item.href} className={sharedClassName} onClick={() => setServicesDropdownOpen(false)}>
                                  <div className="flex items-center gap-2 text-white">
                                    <Icon className="h-4 w-4 text-[#e6b3ac]" />
                                    <span className="text-sm font-semibold">{item.label}</span>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-white/68">{item.description}</p>
                                </Link>
                              )
                            })}
                          </div>

                          <div className="mb-4 flex items-center justify-between gap-4 pb-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Browse by service area</p>
                            <Link
                              to="/health-services"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 transition-colors hover:text-white"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              View all Health Services <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
                            {healthServiceGroups.map((group) => (
                              <div key={group.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                                <p
                                  style={{
                                    fontFamily: 'Nunito, sans-serif',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: '#c0392b',
                                    marginBottom: '12px',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {group.heading}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  {group.items.map((item) => {
                                    const Icon = item.icon
                                    return (
                                      <Link
                                        key={`${group.id}-${item.href}-${item.title}`}
                                        to={item.href}
                                        className="group rounded-lg px-2 py-2 transition hover:bg-white/6"
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          textDecoration: 'none',
                                        }}
                                        onClick={() => setServicesDropdownOpen(false)}
                                      >
                                        <Icon style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.7)', flexShrink: 0, marginRight: '0' }} />
                                        <span
                                          className="group-hover:!text-[#f0c0b8]"
                                          style={{
                                            fontFamily: 'Nunito, sans-serif',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: '#ffffff',
                                            lineHeight: 1.3,
                                            transition: 'color 150ms',
                                          }}
                                        >
                                          {item.title}
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
                )
              }
              return (
                <NavItem
                  key={link.href}
                  href={link.href}
                  isActive={activeHref === link.href}
                  isAnchor={link.isAnchor}
                >
                  {link.label}
                </NavItem>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="tel:+61393913257" className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy-soft)] md:inline-flex">
              Call the pharmacy
            </a>
            <button onClick={openCart} className="icon-btn relative" aria-label={`Shopping cart with ${cartCount} items`}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">{cartCount > 9 ? '9+' : cartCount}</span>}
            </button>
            <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer" className="btn-header-primary text-sm">
              <span className="hidden sm:inline">Book vaccination</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </div>
      </div>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="space-y-6">
          <div className="rounded-[28px] bg-[linear-gradient(145deg,var(--color-navy-deep),var(--color-navy))] p-5 text-white shadow-[0_28px_70px_-42px_rgba(16,24,63,0.75)]">
            <Logo variant="dark" className="h-12 max-w-[220px]" imageClassName="drop-shadow-[0_10px_25px_rgba(0,0,0,0.28)]" priority />
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/65">Blackshaws Road Pharmacy</p>
            <p className="mt-2 text-lg font-semibold">Trusted local care, prescriptions, services and online shopping.</p>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <MobileNavItem key={link.href} href={link.href} isAnchor={link.isAnchor} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </MobileNavItem>
            ))}
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Quick actions</p>
            <div className="grid gap-2">
              <Link to="/prescriptions" className="rounded-2xl bg-[var(--color-red-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-red)]" onClick={() => setMobileMenuOpen(false)}>
                Upload a prescription
              </Link>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[var(--color-navy-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]" onClick={() => setMobileMenuOpen(false)}>
                Book a vaccination
              </a>
              <Link to="/contact" className="rounded-2xl bg-[var(--color-surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]" onClick={() => setMobileMenuOpen(false)}>
                Contact the pharmacy
              </Link>
            </div>
          </div>
          <div className="rounded-[24px] bg-[var(--color-surface-alt)] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Health Services</p>
            <div className="space-y-3">
              {healthServiceGroups.map((group) => (
                <div key={group.id} className="border-b border-[var(--color-border)] last:border-b-0">
                  <button
                    className="flex w-full items-center justify-between py-2 text-left font-semibold text-[var(--color-navy)]"
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === group.id ? null : group.id)}
                    aria-expanded={expandedMobileGroup === group.id}
                  >
                    {group.heading}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', expandedMobileGroup === group.id && 'rotate-180')} />
                  </button>
                  {expandedMobileGroup === group.id && (
                    <div className="mt-2 space-y-2 pb-3">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-navy-soft)] hover:text-[var(--color-navy)]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <span>{item.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Helpful links</p>
            <div className="space-y-1">
              {[
                { href: '/prescriptions', label: 'Upload a prescription' },
                { href: '/faq', label: 'Read FAQs' },
                { href: '/patient-info', label: 'Patient information' },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="block rounded-xl px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-navy-soft)] hover:text-[var(--color-navy)]" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MobileDrawer>
    </header>
  )
}
