import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { BrandLogo } from '../BrandLogo'
import { Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      <div className="absolute inset-0">
        {/* Pharmacy storefront background — native img for LCP discoverability */}
        <img
          src="/hero-pharmacy.webp"
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[center_30%]"
        />
        {/* Primary navy overlay — lighter to let storefront show */}
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/68 md:bg-[var(--color-navy-deep)]/58" />
        {/* Gradient mask — darkens left text zone, lets image breathe on right */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,24,63,0.82)_0%,rgba(16,24,63,0.5)_50%,rgba(16,24,63,0.32)_100%)]" />
        {/* Subtle warm vignette at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,14,38,0.5)_100%)]" />
        {/* Soft brand-colour glow accents */}
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[var(--color-red)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-18 md:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="badge-red">EST. 1968</span>
              <span className="badge-soft">Alliance Pharmacy member</span>
            </div>

            <div className="mt-7">
              <BrandLogo variant="light" className="h-18 w-auto md:h-24" style={{ maxWidth: '330px' }} />
            </div>

            <h1 className="mt-8 max-w-4xl text-white">Premium everyday pharmacy care for Altona North and the west.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/78 md:text-xl">Prescriptions, trusted pharmacist advice, vaccinations, medication reviews and a curated online health range — all delivered with the calm confidence of a long-standing local pharmacy.</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/76">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><MapPin className="h-4 w-4" /> 310A Blackshaws Road, Altona North</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><Clock3 className="h-4 w-4" /> Open 7 days</span>
              <a href="tel:0393913257" className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 hover:bg-white/8"><Phone className="h-4 w-4" /> (03) 9391 3257</a>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/shop"><Button variant="red" size="lg">Shop online now</Button></Link>
              <Link to="/upload-prescription"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">Upload prescription</Button></Link>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="lg" className="text-white hover:bg-white/10">Book a vaccination</Button></a>
            </div>
          </div>

          <div className="rounded-[32px] bg-red-light p-6 text-[var(--color-text-dark)] md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-red)]"><ShieldCheck className="h-4 w-4" /> trusted local healthcare</div>
            <h2 className="mt-5 text-3xl text-[var(--color-navy-deep)] md:text-4xl">Designed for convenience. Grounded in care.</h2>
            <div className="mt-6 space-y-4">
              {[
                'Accredited vaccination and pharmacist consultation services',
                'Medication support for families, seniors and complex care needs',
                'Online shopping paired with real in-store pharmacy expertise',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-red)]" />
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 rounded-[24px] bg-[var(--color-navy-deep)] p-5 text-white sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Need a script filled?</p>
                <p className="mt-2 text-lg font-semibold">Speak to the team about prescriptions and repeats.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Need an appointment?</p>
                <p className="mt-2 text-lg font-semibold">Vaccinations and key services are easy to book online.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
