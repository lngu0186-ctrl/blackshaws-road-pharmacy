'use client'

import { Shield, ExternalLink } from 'lucide-react'
import { Card } from '../ui/Card'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const resources = [
  {
    name: 'Better Health Victoria',
    description:
      'Victorian Government health information including the Chemist Care Now program details and eligibility requirements.',
    url: 'https://www.betterhealth.vic.gov.au',
    features: ['Chemist Care Now program', 'Victorian health services', 'Official government advice'],
  },
  {
    name: 'NPS MedicineWise',
    description:
      'Evidence-based information about medicines, side effects, interactions, and safe medication use from an independent, trusted source.',
    url: 'https://www.nps.org.au',
    features: ['Medicine information', 'Side effect checker', 'Drug interaction tool'],
  },
  {
    name: 'HealthDirect Australia',
    description:
      '24/7 national health advice line and online service. Free, trusted health information when you need it most.',
    url: 'https://www.healthdirect.gov.au',
    features: ['24/7 health advice', 'Symptom checker', 'Find a healthcare service'],
  },
]

export function HealthInfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="health-info" className="section-padding bg-white">
      <div className="container-custom">
        <div
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: `translateY(${isInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>HEALTH RESOURCES</p>
          <h2 className="mb-6" style={{ color: 'var(--color-navy)' }}>
            Trusted Health Information
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] mb-12 max-w-3xl">
            Our pharmacists are here to provide general health information and guidance. For personalised medical advice, please consult your doctor or specialist.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          {/* TGA Compliance notice */}
          <div
            className="mt-16 p-6 rounded-2xl border-2"
            style={{ borderColor: 'var(--color-navy)/20', backgroundColor: 'var(--color-offwhite)' }}
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-navy)' }} />
              <div className="text-sm text-[var(--color-gray-600)]">
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>
                  Important Health Information Disclaimer
                </h4>
                <p className="mb-3 leading-relaxed">
                  The information provided on this website and by our staff is general in nature and does not replace professional medical advice. Always consult your doctor or healthcare provider before making decisions about your health, especially if you have a medical condition or are taking medication.
                </p>
                <p className="text-xs italic">
                  Medicines have benefits and risks — always read the label and follow directions. If symptoms persist, see your healthcare professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResourceCard({
  name,
  description,
  url,
  features,
}: {
  name: string
  description: string
  url: string
  features: string[]
}) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif font-semibold" style={{ color: 'var(--color-navy)' }}>{name}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--color-red)' }}
        >
          <ExternalLink className="w-4 h-4" />
          Visit
        </a>
      </div>
      <p className="text-[var(--color-gray-600)] mb-4 flex-grow leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-red)' }}
            />
            <span className="text-[var(--color-gray-600)]">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
