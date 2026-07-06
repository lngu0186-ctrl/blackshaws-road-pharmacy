import { Button } from '../ui/Button'
import { Clock3, MapPin, Phone } from 'lucide-react'
import { Logo } from '../layout/Logo'
import { PhoneMockup } from '../PhoneMockup'
import { useUploadPrescriptionStore } from '../../stores/uploadPrescriptionStore'
import { getOpenStatus, pharmacyInfo } from '../../data/pharmacyInfo'

export function HeroSection() {
  const openUpload = useUploadPrescriptionStore((s) => s.open)
  const openStatus = getOpenStatus()

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      <div className="absolute inset-0 hero-parallax">
        <img
          src="/hero-pharmacy.webp"
          alt="Blackshaws Road Pharmacy interior"
          className="hero-img-settle absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[center_30%]"
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

      <div className="container-custom relative z-10 py-10 md:py-14">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="hero-choreo max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="badge-red">Est. 1968</span>
              <span className="badge-soft">Open 7 days</span>
            </div>

            <div className="mt-6 md:mt-7">
              <Logo
                variant="dark"
                className="brand-logo-hero h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem]"
                imageClassName="drop-shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                priority
              />
            </div>

            <h1 className="mt-7 max-w-4xl text-white md:mt-8">Your local pharmacy on Blackshaws Road</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              Prescriptions, vaccinations, and practical health advice for Altona North. Family owned since 1968.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/85">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><MapPin aria-hidden="true" className="h-4 w-4" /> {pharmacyInfo.addressShort}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2">
                <Clock3 aria-hidden="true" className="h-4 w-4" />
                <span className={`h-2 w-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} aria-hidden="true" />
                {openStatus.label}
              </span>
              <a href={pharmacyInfo.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 hover:bg-white/8"><Phone aria-hidden="true" className="h-4 w-4" /> {pharmacyInfo.phone}</a>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button variant="red" size="lg" onClick={openUpload}>Upload a prescription</Button>
              <a href={pharmacyInfo.vaccinationBookingUrl} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">Book a vaccination</Button></a>
              <a href={pharmacyInfo.phoneHref} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline decoration-white/40 underline-offset-4 hover:text-white sm:ml-2">
                Or call {pharmacyInfo.phone}
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="float-gentle">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
