import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Clock3, MapPin, Phone } from 'lucide-react'
import { Logo } from '../layout/Logo'
import { PhoneMockup } from '../PhoneMockup'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      <div className="absolute inset-0">
        <img
          src="/hero-pharmacy.webp"
          alt="Blackshaws Road Pharmacy interior"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[center_30%]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/68 md:bg-[var(--color-navy-deep)]/58" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,24,63,0.82)_0%,rgba(16,24,63,0.5)_50%,rgba(16,24,63,0.32)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,14,38,0.5)_100%)]" />
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[var(--color-red)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-8 md:py-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="badge-red">EST. 1968</span>
              <span className="badge-soft">Alliance Pharmacy member</span>
            </div>

            <div className="mt-6 md:mt-7">
              <Logo
                variant="dark"
                className="brand-logo-hero h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem]"
                imageClassName="drop-shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                priority
              />
            </div>

            <h1 className="mt-7 max-w-4xl text-white md:mt-8">Premium everyday pharmacy care for Altona North and the west.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/78 md:text-xl">Prescriptions, trusted pharmacist advice, vaccinations, medication reviews and a curated online health range — all delivered with the calm confidence of a long-standing local pharmacy.</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/76">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><MapPin className="h-4 w-4" /> 310A Blackshaws Road, Altona North</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><Clock3 className="h-4 w-4" /> Open 7 days</span>
              <a href="tel:0393913257" className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 hover:bg-white/8"><Phone className="h-4 w-4" /> (03) 9391 3257</a>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/prescriptions"><Button variant="red" size="lg">Upload a prescription</Button></Link>
              <Link to="/compounding"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">Compounding support</Button></Link>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">Book a vaccination</Button></a>
              <Link to="/contact"><Button variant="ghost" size="lg" className="text-white hover:bg-white/10">Call or contact us</Button></Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
