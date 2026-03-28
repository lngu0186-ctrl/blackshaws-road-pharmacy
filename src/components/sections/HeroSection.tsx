'use client'

import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-navy-deep)' }}
    >
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20, 31, 82, 0.65)' }} />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-24">
        <div className="max-w-4xl">
          {/* EST. 1968 Badge */}
          <div className="mb-6">
            <span className="badge-red" style={{ backgroundColor: 'var(--color-red)' }}>EST. 1968</span>
            <span className="ml-3 text-white/80 text-sm font-medium tracking-wider">
              Alliance Pharmacy Member
            </span>
          </div>

          {/* Logo Image */}
          <div className="mb-8">
            <img
              src="/logo-white.svg"
              alt="Blackshaws Road Pharmacy"
              className="h-20 md:h-24 w-auto"
              style={{ maxWidth: '320px' }}
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Altona North's Trusted
            <br />
            <span style={{ color: 'var(--color-red)' }}>Community Pharmacy</span>
          </h1>

          {/* Contact info line */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-white/90">
            <a href="tel:0393913257" className="hover:text-white transition-colors">
              <span className="font-semibold">(03) 9391 3257</span>
            </a>
            <span className="text-white/60">|</span>
            <span>0406 692 267</span>
            <span className="text-white/60">|</span>
            <span>310A Blackshaws Road, Altona North</span>
            <span className="text-white/60">|</span>
            <span>Open 7 days from 8am</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" asChild>
              <a href="#services">Our Services</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--color-navy-deep)]" asChild>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer">
                Book a Vaccination →
              </a>
            </Button>
            <Button variant="primary" size="lg" className="!bg-[var(--color-red)] !border-[var(--color-red)] hover:!bg-red-700 text-white" asChild>
              <Link to="/shop">
                Shop Online Now →
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Alliance reference */}
      <div className="absolute bottom-8 right-8 text-white/40 text-sm font-medium text-right">
        <div>Alliance Pharmacy</div>
        <div className="text-xs">Australia&apos;s leading independent network</div>
      </div>
    </section>
  )
}
