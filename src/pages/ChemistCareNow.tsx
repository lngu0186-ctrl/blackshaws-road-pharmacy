import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Phone, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BrandSignature } from '../components/layout/BrandSignature'
import {
  IconContraceptive,
  IconUTI,
  IconShingles,
  IconPsoriasis,
  IconVaccinations,
  IconImpetigo,
} from '../components/sections/ChemistCareCards'

const services = [
  {
    icon: IconContraceptive,
    title: 'Contraceptive pill resupply',
    description: 'Running low on your contraceptive pill? If you have a previous prescription, a pharmacist may be able to provide a continuing supply.',
  },
  {
    icon: IconUTI,
    title: 'Urinary tract infections (UTI)',
    description: 'Burning when you pee? Frequent urges? UTI treatment may be available directly from your pharmacist without a GP visit.',
  },
  {
    icon: IconShingles,
    title: 'Shingles',
    description: 'Painful blistering rash or tingling sensation? If you are 18 or older, treatment may be available from your chemist.',
  },
  {
    icon: IconPsoriasis,
    title: 'Psoriasis',
    description: 'Has your psoriasis flared up? You may be able to get a resupply of your cream or ointment from your pharmacist.',
  },
  {
    icon: IconVaccinations,
    title: 'Vaccinations for travel',
    description: 'Heading overseas? A range of travel vaccinations can be administered by your accredited pharmacy immuniser.',
  },
  {
    icon: IconImpetigo,
    title: 'Impetigo (school sores)',
    description: 'Red sores on the face or body? You may have impetigo. Treatment may be available directly from your chemist.',
  },
]

const eligibilityPoints = [
  'You are presenting with a mild to moderate case of an eligible condition',
  'You have been assessed by the pharmacist as suitable for this service',
  'You do not require urgent or emergency medical care',
  'Your condition does not need a prescription from a GP or specialist',
  'You consent to the pharmacist providing treatment under the program',
]

const processSteps = [
  {
    step: '1',
    title: 'Visit or call the pharmacy',
    description: 'Walk in or call (03) 9391 3257 to discuss whether Chemist Care Now is appropriate for your condition.',
  },
  {
    step: '2',
    title: 'Private consultation',
    description: 'Our pharmacist will ask about your symptoms, medical history, and any medications you are taking.',
  },
  {
    step: '3',
    title: 'Assessment',
    description: 'The pharmacist will assess your condition to determine if it is suitable for Chemist Care Now treatment.',
  },
  {
    step: '4',
    title: 'Treatment or referral',
    description: 'If eligible, receive treatment on the spot. If not, the pharmacist will guide you to a GP or urgent care.',
  },
]

export default function ChemistCareNow() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Chemist Care Now | Blackshaws Road Pharmacy'

    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Chemist Care Now at Blackshaws Road Pharmacy in Altona North. Victorian Government-backed pharmacy service for eligible conditions including UTIs, contraception resupply, shingles, and more. Free or low-cost.'

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      document.head.appendChild(metaRobots)
    }
    metaRobots.content = 'index, follow'
  }, [])

  return (
    <div className="bg-[var(--color-cream)]">
      {/* Hero */}
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label !text-white/70">Victorian Government-backed care</p>
            <h1 className="max-w-4xl text-white">Chemist Care Now</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
              Faster, more convenient care for eligible everyday conditions — delivered by your
              local pharmacist with the same clinical rigour and safety you expect from a
              trusted community pharmacy.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/74">
              Chemist Care Now is a Victorian Government initiative that allows accredited
              pharmacists to assess and treat a range of common conditions without requiring a
              GP visit. At Blackshaws Road Pharmacy, we deliver this service with professional
              judgement, privacy, and a clear pathway to further care where needed.
            </p>
            <div className="mt-6">
              <BrandSignature tone="dark" className="max-w-xl" />
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="tel:0393913257">
                <Button variant="red" size="lg">
                  <Phone className="mr-2 h-5 w-5" /> Call (03) 9391 3257
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">
                  Enquire Online
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="rounded-[30px] bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4">What to expect</p>
              <ul className="space-y-3">
                {[
                  'Private consultations (15–30 minutes)',
                  'Most consultations are free',
                  'Clear pharmacist guidance',
                  'Convenient, local access',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 text-[var(--color-sage)]" />
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Conditions */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10">
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Eligible conditions</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">Conditions your pharmacist may be able to treat.</h2>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-3xl">
              Chemist Care Now covers a range of common conditions that do not always need a GP.
              Our pharmacists will assess each case individually and refer you on where appropriate.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] transition-all hover:shadow-lg"
                >
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#1a5eab] text-white">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-navy)]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom">
          <div className="mb-10">
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>How it works</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">A straightforward, four-step pathway.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-red)] text-lg font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-navy)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Eligibility</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">When Chemist Care Now is appropriate.</h2>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Not every condition or every patient is suitable for Chemist Care Now.
              Your pharmacist will make the final assessment. In general, you may be
              eligible if:
            </p>
            <div className="mt-6 space-y-3">
              {eligibilityPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 text-[var(--color-sage)]" />
                  <span className="text-sm text-[var(--color-text-muted)]">{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[24px] bg-[var(--color-navy-deep)] p-6 text-white">
              <p className="text-sm font-medium text-white/70">Not sure if you're eligible?</p>
              <p className="mt-2 text-base">Call us and our pharmacists can help you decide the right pathway.</p>
              <a href="tel:0393913257" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-red-light)] hover:underline">
                <Phone className="h-4 w-4" /> (03) 9391 3257 <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
            <h3 className="text-xl font-semibold text-[var(--color-navy)]">Cost</h3>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Most Chemist Care Now consultations at Blackshaws Road Pharmacy are free under the
              Victorian Government program. If a medication is prescribed, there may be a cost
              for the medicine itself.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-[var(--color-navy)]">When to see a GP instead</h3>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Chemist Care Now is not a replacement for GP care. You should see a GP or seek urgent
              medical attention if:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-red)]" />
                Your symptoms are severe, worsening, or you feel very unwell
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-red)]" />
                You are pregnant, immunocompromised, or have a complex medical history
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-red)]" />
                Your condition has not improved after pharmacist treatment
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-red)]" />
                You need ongoing management or specialist referrals
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <a href="tel:0393913257">
                <Button variant="primary" className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> Call to Discuss
                </Button>
              </a>
              <a
                href="https://www.betterhealth.vic.gov.au/chemist-care-now"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  Better Health Vic <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-white">Need help choosing the right care pathway?</h2>
          <p className="mt-4 text-lg text-white/80">
            Our pharmacists are here to help. Call us or walk in to discuss whether Chemist Care Now
            is the right option for your situation.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row items-center justify-center">
            <a href="tel:0393913257">
              <Button variant="red" size="lg">
                <Phone className="mr-2 h-5 w-5" /> Call (03) 9391 3257
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">
                Send an Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
