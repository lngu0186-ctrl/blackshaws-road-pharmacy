import { Button } from '../ui/Button'
import { Pill, Droplets, Sparkles, HandHeart, Plane, Baby } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

interface ChemistCareNowSectionProps { id?: string }

const chemistCareServices = [
  {
    icon: Pill,
    title: 'Contraceptive options',
    description: 'Is your contraceptive running low? If you have a previous prescription, you might be able to get a resupply from your chemist.'
  },
  {
    icon: Droplets,
    title: 'Urinary tract infections',
    description: 'Frequent bathroom visits? A burning sensation when you pee? You may have a UTI. Treatment may be available at your chemist.'
  },
  {
    icon: Sparkles,
    title: 'Shingles',
    description: 'A painful blistering rash or a tingling, burning sensation on the skin? You may have shingles. If you are 18 or older treatment is available.'
  },
  {
    icon: HandHeart,
    title: 'Psoriasis',
    description: 'Has your psoriasis flared up? You may be able to get a resupply of your cream or ointment.'
  },
  {
    icon: Plane,
    title: 'Vaccinations for travel',
    description: 'Heading overseas? A range of travel vaccinations can be administered by your chemist.'
  },
  {
    icon: Baby,
    title: 'Impetigo (school sores)',
    description: 'Red sores on the face or body? You may have impetigo (school sores). Treatment may be available at your chemist.'
  }
]

export function ChemistCareNowSection({ id }: ChemistCareNowSectionProps) {
  return (
    <section id={id} className="section-padding bg-white">
      <div className="container-custom">
        {/* Official logos */}
        <Reveal className="flex flex-wrap items-center gap-6 mb-10">
          <img src="/chemist-care-now-logo.png" alt="Chemist Care Now" className="h-12 w-auto" />
          <div className="h-8 w-px bg-gray-300" />
          <img src="/vic-gov-logo.png" alt="Victorian Government – Department of Health" className="h-10 w-auto" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left: Intro text */}
          <Reveal>
            <span className="badge-red">Victorian Government-backed care</span>
            <h2 className="mt-5 text-[var(--color-navy-deep)]">Chemist Care Now, delivered with faster access and trusted pharmacy judgement.</h2>
            <p className="mt-5 text-lg text-[var(--color-text-muted)]">For eligible everyday conditions, the pharmacy can provide an easier path to treatment while keeping advice clinically grounded, private and community-focused.</p>

            <div className="mt-8 rounded-[30px] bg-[var(--color-navy-deep)] p-6 shadow-[0_30px_70px_-48px_rgba(16,24,63,0.28)] text-white">
              <h3 className="text-2xl text-white">What patients can expect</h3>
              <div className="mt-5 space-y-4">
                {[
                  'Private consultations that typically take 15–30 minutes',
                  'Most eligible Chemist Care Now consultations are free',
                  'Clear pharmacist guidance on when GP or urgent review is needed',
                  'Convenient access for common conditions without compromising safety'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-[var(--color-sage)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <p className="text-sm leading-relaxed text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.betterhealth.vic.gov.au/chemist-care-now" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <Button variant="sage" size="lg">Learn more at Better Health Victoria</Button>
              </a>
            </div>
          </Reveal>

          {/* Right: Cards grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {chemistCareServices.map((service, index) => (
              <Reveal key={index} delay={(index % 2) * 90}>
                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gray-200)] bg-white shadow-[0_10px_30px_-20px_rgba(16,24,63,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(16,24,63,0.35)]">
                  {/* Icon header */}
                  <div className="flex items-center gap-3 bg-[var(--color-navy-deep)] px-6 py-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      <service.icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-white">
                      {service.title}
                    </h3>
                  </div>
                  {/* Body */}
                  <div className="flex flex-1 flex-col px-6 py-5">
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{service.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
