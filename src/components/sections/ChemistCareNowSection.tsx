import { useRef } from 'react'
import { Button } from '../ui/Button'
import { IconContraceptive, IconUTI, IconShingles, IconPsoriasis, IconVaccinations, IconImpetigo } from './ChemistCareCards'

interface ChemistCareNowSectionProps { id?: string }

const chemistCareServices = [
  {
    icon: IconContraceptive,
    title: 'Contraceptive options',
    description: 'Is your contraceptive running low? If you have a previous prescription, you might be able to get a resupply from your chemist.'
  },
  {
    icon: IconUTI,
    title: 'Urinary tract infections',
    description: 'Frequent bathroom visits? A burning sensation when you pee? You may have a UTI. Treatment may be available at your chemist.'
  },
  {
    icon: IconShingles,
    title: 'Shingles',
    description: 'A painful blistering rash or a tingling, burning sensation on the skin? You may have shingles. If you are 18 or older treatment is available.'
  },
  {
    icon: IconPsoriasis,
    title: 'Psoriasis',
    description: 'Has your psoriasis flared up? You may be able to get a resupply of your cream or ointment.'
  },
  {
    icon: IconVaccinations,
    title: 'Vaccinations for travel',
    description: 'Heading overseas? A range of travel vaccinations can be administered by your chemist.'
  },
  {
    icon: IconImpetigo,
    title: 'Impetigo (school sores)',
    description: 'Red sores on the face or body? You may have impetigo (school sores). Treatment may be available at your chemist.'
  }
]

export function ChemistCareNowSection({ id }: ChemistCareNowSectionProps) {
  const ref = useRef(null)
  const isInView = true

  return (
    <section id={id} className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        {/* Official logos */}
        <div className="flex flex-wrap items-center gap-6 mb-10">
          <img src="/chemist-care-now-logo.png" alt="Chemist Care Now" className="h-12 w-auto" />
          <div className="h-8 w-px bg-gray-300" />
          <img src="/vic-gov-logo.png" alt="Victorian Government – Department of Health" className="h-10 w-auto" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left: Intro text */}
          <div>
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
                    <svg className="mt-0.5 h-5 w-5 text-[var(--color-sage)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <p className="text-sm leading-relaxed text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.betterhealth.vic.gov.au/chemist-care-now" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <Button variant="sage" size="lg">Learn more at Better Health Victoria</Button>
              </a>
            </div>
          </div>

          {/* Right: Cards grid */}
          <div className="grid gap-5 md:grid-cols-2" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '24px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            {chemistCareServices.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-250 ease-out hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--color-gray-200)',
                  minHeight: '280px'
                }}
              >
                {/* Top half: blue background with illustration */}
                <div className="relative h-2/5 bg-[#1a5eab] flex items-center justify-center overflow-hidden">
                  <service.icon className="w-14 h-14 text-white" />
                </div>
                {/* Bottom half: white content */}
                <div className="relative h-3/5 p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold" style={{ color: '#2a9d5c' }}>{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{service.description}</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#1a5eab] opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out pointer-events-none">
                  <div className="flex flex-col h-full p-5 justify-center">
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
