import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ShoppingBag, ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../utils/cn'
import { useCartStore } from '../../stores/cartStore'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'

const navLinks = [
  { href: '#services', label: 'Home' },
  { href: '#vaccination', label: 'Vaccinations' },
  { href: '#chemist-care', label: 'Chemist Care' },
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCartStore((s) => s.openCart)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'nav-blur nav-blur-scrolled py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center"
          >
            <img
              src="/logo-white.svg"
              alt="Blackshaws Road Pharmacy"
              className="h-10 md:h-11 w-auto"
              style={{ maxWidth: '180px' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-white/90 hover:text-white transition-colors group"
              >
                {link.label}
                {link.label === 'Vaccinations' && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Book
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-red)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                className="relative text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                aria-expanded={isServicesDropdownOpen}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-red)] transition-all duration-300 group-hover:w-full hover:w-full" />
              </button>

              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <Link
                      to="/services"
                      className="block px-6 py-4 hover:bg-gray-50 font-semibold border-b"
                      style={{ color: 'var(--color-navy)' }}
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      View All Services
                    </Link>
                    <div className="py-2">
                      {topServices.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="block px-6 py-3 hover:bg-gray-50 text-sm"
                          style={{ color: 'var(--color-gray-600)' }}
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/shop"
              className="relative text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-red)] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Desktop CTA + Phone + Cart */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0393913257"
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" style={{ color: 'var(--color-red)' }} />
              <span>(03) 9391 3257</span>
            </a>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
                  style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            <ThemeToggle />
            <Button variant="primary" size="sm" asChild>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer">
                Book Vaccination
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-navy)] border-b border-white/10"
          >
            <div className="container-custom py-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <img
                  src="/logo-white.svg"
                  alt="Blackshaws Road Pharmacy"
                  className="h-8 w-auto"
                  style={{ maxWidth: '150px' }}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={openCart}
                    className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label={`Shopping cart with ${cartCount} items`}
                  >
                    <ShoppingBag className="w-5 h-5 text-white" />
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
                        style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
                      >
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </button>
                  <ThemeToggle />
                </div>
              </div>
              {/* Mobile Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium py-2 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {link.label === 'Vaccinations' && (
                      <span className="ml-2 text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                        Book
                      </span>
                    )}
                  </a>
                ))}
                <Link
                  to="/services"
                  className="block text-lg font-medium py-2 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Services
                </Link>
                {topServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block text-lg font-medium py-2 pl-4 text-white/80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
                <Link
                  to="/shop"
                  className="block text-lg font-medium py-2 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="tel:0393913257"
                  className="flex items-center gap-2 font-medium"
                  style={{ color: 'var(--color-red)' }}
                >
                  <Phone className="w-4 h-4" />
                  (03) 9391 3257
                </a>
                <a
                  href="tel:0406692267"
                  className="flex items-center gap-2 font-medium"
                  style={{ color: 'var(--color-red)' }}
                >
                  <Phone className="w-4 h-4" />
                  0406 692 267
                </a>
                <p className="text-sm text-white/60">Open 7 days from 8am</p>
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="sm" className="w-full" asChild>
                    <a
                      href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Vaccination
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                      Shop Products
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
