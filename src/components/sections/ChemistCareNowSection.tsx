'use client'

import { Shield, Pill, Syringe, Heart, Stethoscope, Baby } from 'lucide-react'
import { Card } from '../ui/Card'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/Button'

interface ChemistCareNowSectionProps {
  id?: string
}

const chemistCareServices = [
  {
    icon: Pill,
    title: 'Contraceptive Pill Resupply',
    description: 'Run low on the pill? If you have a previous prescription, we may be able to resupply without a GP visit. Quick, confidential service available now.',
  },
  {
    icon: Stethoscope,
    title: 'Urinary Tract Infections (UTI)',
    description: 'Burning or frequent urination? We can assess and treat UTIs on the spot. No appointment needed. Get relief today.',
  },
  {
    icon: Shield,
    title: 'Shingles Treatment',
    description: 'A painful blistering rash? Shingles treatment is available at the pharmacy for adults 18+. Early treatment reduces complications.',
  },
  {
    icon: Heart,
    title: 'Psoriasis Flare-Up',
    description: 'Has your psoriasis flared up? We may be able to resupply your cream or ointment directly. Ask our pharmacists about access.',
  },
  {
    icon: Syringe,
    title: 'Travel Vaccinations',
    description: 'Heading overseas? We administer a full range of travel vaccines — book a consultation with us for your destination requirements.',
  },
  {
    icon: Baby,
    title: 'Impetigo (School Sores)',
    description: 'Red sores on the face or body? Treatment for impetigo is available — no GP referral required. Fast relief for children and adults.',
  },
]

export function ChemistCareNowSection({ id }: ChemistCareNowSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id={id} className="section-padding" style={{ backgroundColor: '#F4F4F6' }}>
      <div className="container-custom">
        <div ref={ref}>
          {/* Section Header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `translateY(${isInView ? 0 : '20px'})`,
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
              <Shield className="w-5 h-5" />
              <span className="font-semibold text-sm uppercase tracking-wider">Victorian Government Program</span>
            </div>
            <h2 className="mb-4">
              Now at Blackshaws — <span style={{ color: 'var(--color-red)' }}>Chemist Care Now</span>
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] max-w-3xl mx-auto leading-relaxed">
              Victorian Government-backed healthcare, right at your chemist. No GP needed for many common conditions.
              <strong className="block mt-2 text-[var(--color-gray-800)]">Most consultations are FREE.</strong>
            </p>
          </div>

          {/* Service Cards Grid */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `translateY(${isInView ? 0 : '30px'})`,
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            {chemistCareServices.map((service, index) => (
              <ChemistCareCard key={index} {...service} index={index} />
            ))}
          </div>

          {/* Info Block */}
          <div
            className="mt-12 p-8 rounded-2xl shadow-lg"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: 'var(--color-navy)' }}>
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {[
                    'Consultations are conducted privately and take 15–30 minutes',
                    'No Medicare card required (bring it if you have one)',
                    'GP follow-up is always recommended after treatment',
                    'Most Chemist Care Now consultations are completely free',
                    'No appointment necessary for most conditions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-red)' }} />
                      <span className="text-[var(--color-gray-600)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-[var(--color-gray-600)] mb-4">
                  Learn more about the program and eligibility
                </p>
                <Button variant="primary" size="lg" asChild>
                  <a
                    href="https://www.betterhealth.vic.gov.au/chemist-care-now"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More at Better Health Victoria
                  </a>
                </Button>
                <p className="text-xs text-[var(--color-gray-600)] mt-3">
                  External link to Victorian Government health information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChemistCareCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  index: number
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <Card
      ref={cardRef}
      className="ccn-card flex flex-col h-full bg-white"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '20px'})`,
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-red)/10' }}
        >
          <Icon className="w-6 h-6" style={{ color: 'var(--color-red)' }} />
        </div>
        <div>
          <h3 className="text-lg font-serif font-semibold leading-tight">{title}</h3>
        </div>
      </div>
      <p className="text-[var(--color-gray-600)] text-sm leading-relaxed flex-grow">
        {description}
      </p>
      <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
        <p className="text-xs font-medium" style={{ color: 'var(--color-red)' }}>
          Available now • No GP referral needed
        </p>
      </div>
    </Card>
  )
}
