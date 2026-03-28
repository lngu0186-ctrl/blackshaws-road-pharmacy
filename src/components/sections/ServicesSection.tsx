'use client'

import { Pill, Syringe, Beaker, Heart, Calendar, Stethoscope, Shield, ShoppingBag } from 'lucide-react'
import { Card } from '../ui/Card'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: Pill,
    title: 'Prescriptions & Dispensing',
    description:
      'Expert dispensing of all prescription medications. Our pharmacists ensure you understand your treatment, potential side effects, and proper usage. We work with your doctor to provide seamless care.',
  },
  {
    icon: Syringe,
    title: 'Vaccinations & Immunisations',
    description:
      'Accredited immunisation provider delivering the full National Immunisation Program (NIP). Flu, COVID-19, travel vaccines, and more. No jab no play — we keep your family protected.',
  },
  {
    icon: Beaker,
    title: 'Medication Management Reviews',
    description:
      'Comprehensive Medication Reviews (HMR/RMMR) to optimise your medications. We work with your doctor to improve outcomes, reduce side effects, and streamline your regimen.',
  },
  {
    icon: Shield,
    title: 'Chemist Care Now',
    description:
      'Victorian Government-backed program: Get treatment for UTIs, shingles, impetigo, contraceptive resupply, psoriasis, and more — often without needing a GP. Most consultations are free.',
    highlight: true,
  },
  {
    icon: Heart,
    title: 'Health Checks & Screening',
    description:
      'Blood pressure, cholesterol, diabetes risk assessment, and general health screening. Early detection saves lives. We provide Medicare-funded checks where eligible.',
  },
  {
    icon: Calendar,
    title: 'WebsterPaks & Dose Administration',
    description:
      'Organise your medications into weekly dose packs. Ideal for complex regimens, elderly patients, or anyone wanting to simplify their medication routine. Ask about our free packaging service.',
  },
  {
    icon: Stethoscope,
    title: 'Minor Ailments & Consultations',
    description:
      'Treatment for common conditions like ear infections, skin rashes, allergies, and minor pain. Our pharmacists can provide advice and medication when a GP visit isn&apos;t necessary.',
  },
  {
    icon: ShoppingBag,
    title: 'Practitioner-Only Products',
    description:
      'Access our curated range of practitioner-only supplements and health products, available to order online through our pharmacy.',
    shopLink: 'https://blackshawspharmacy.com.au/collections/practitioner-only-range',
    shopText: 'Shop Online →',
  },
]

export function ServicesSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  const gridRef = useRef(null)
  const isGridInView = useInView(gridRef, { once: true, margin: '-100px' })

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            opacity: isHeaderInView ? 1 : 0,
            transform: `translateY(${isHeaderInView ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>WHAT WE OFFER</p>
          <h2 className="mb-6" style={{ color: 'var(--color-navy)' }}>
            Comprehensive pharmacy care for your whole family
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] max-w-3xl">
            From prescriptions to vaccinations, medication reviews to health checks — we provide the full spectrum of pharmacy services with a personal touch.
          </p>
        </div>

        {/* Services grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          style={{
            opacity: isGridInView ? 1 : 0,
            transform: `translateY(${isGridInView ? 0 : '30px'})`,
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  highlight,
  shopLink,
  shopText,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  index: number
  highlight?: boolean
  shopLink?: string
  shopText?: string
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const isSpecial = highlight || shopLink

  return (
    <Card
      ref={cardRef}
      className={`flex flex-col h-full ${isSpecial ? 'border-l-4' : ''}`}
      style={{
        borderColor: isSpecial ? 'var(--color-red)' : 'var(--color-gray-200)',
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '20px'})`,
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isSpecial ? 'var(--color-red)/10' : 'var(--color-navy)/10', color: isSpecial ? 'var(--color-red)' : 'var(--color-navy)' }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-semibold leading-tight">{title}</h3>
        </div>
      </div>
      <p className="text-[var(--color-gray-600)] text-sm leading-relaxed flex-grow">
        {description}
      </p>
      {shopLink && (
        <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
          <a
            href={shopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:underline"
            style={{ color: 'var(--color-navy)' }}
          >
            {shopText}
          </a>
        </div>
      )}
    </Card>
  )
}
