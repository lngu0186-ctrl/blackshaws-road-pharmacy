import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShoppingBag, Phone, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { useCartStore } from '../../stores/cartStore'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import type { Service } from '../../data/services'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '#vaccination', label: 'Vaccinations' },
  { href: '#chemist-care', label: 'Chemist Care' },
  { href: '/shop', label: 'Shop' },
  { href: '#about', label: 'About' },
  { href: '#location', label: 'Contact' },
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
  const scrolled = useScrolled(10)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCartStore((s) => s.openCart)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[var(--header-height-desktop)] bg-[var(--header-bg)] transition-shadow duration-200',
        scrolled ? 'shadow-[0_1px_0_var(--header-border)]' : ''
      )}
    >
      <div
        className="h-full px-[var(--header-px)] flex items-center justify-between"
        style={{ gap: 'var(--nav-gap)' }}
      >
        {/* LEFT: Logo */}
        <Logo className="h-[var(--logo-max-height)]" />

        {/* CENTER: Primary Navigation (desktop) */}
        <nav className="hidden md:flex items-center gap-[var(--nav-gap)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'nav-link',
                link.href === window.location.pathname ? 'nav-link-active' : ''
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* Services Dropdown */}
          <div className="relative" ref={servicesDropdownRef}>
            <button
              className="nav-link flex items-center gap-1"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <Link
                  to="/services"
                  className="block px-6 py-3 hover:bg-gray-50 font-semibold"
                  style={{ color: 'var(--color-navy)' }}
                  onClick={() => setServicesDropdownOpen(false)}
                >
                  View All Services
                </Link>
                <div className="border-t border-gray-100 my-1" />
                {topServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block px-6 py-2 text-sm hover:bg-gray-50"
                    style={{ color: 'var(--color-gray-600)' }}
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT: Utilities + CTA (desktop) */}
        <div className="hidden md:flex items-center" style={{ gap: 'var(--utility-gap)' }}>
          {/* Phone */}
          <a href="tel:0393913257" className="nav-link text-[var(--font-utility)] text-[var(--utility-icon-color)]">
            (03) 9391 3257
          </a>

          {/* Cart */}
          <button
            onClick={openCart}
            className="icon-btn relative"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
                style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Theme toggle (if used) */}
          <ThemeToggle />

          {/* Book Vaccination CTA */}
          <a
            href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-primary"
          >
            Book Vaccination
          </a>
        </div>

        {/* MOBILE: Hamburger, Logo, Cart, Book */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="icon-btn"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Logo className="h-[var(--logo-max-height-mobile)]" />
          <button
            onClick={openCart}
            className="icon-btn relative"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
                style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <a
            href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-primary text-xs px-3"
          >
            Book
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block py-4 text-lg font-medium border-b border-gray-100"
              style={{ color: 'var(--color-navy)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>
              Services
            </p>
            <Link
              to="/services"
              className="block py-3 text-base"
              style={{ color: 'var(--color-gray-600)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              View All Services
            </Link>
            {topServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="block py-2 text-sm"
                style={{ color: 'var(--color-gray-600)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
            <a
              href="tel:0393913257"
              className="flex items-center gap-2 text-base"
              style={{ color: 'var(--color-navy)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              (03) 9391 3257
            </a>
            <p className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
              310A Blackshaws Road, Altona North
            </p>
            <p className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
              Open 7 days from 8am
            </p>
          </div>
        </div>
      </MobileDrawer>
    </header>
  )
}
