'use client'

import { useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/Button'
import { Shield, Baby, Users, Heart, BabyIcon, Plane, AlertCircle } from 'lucide-react'

const vaccineTabs = [
  {
    id: 'infants',
    label: 'Infants & Children',
    icon: Baby,
    content: {
      title: 'Vaccines for Babies & Young Children',
      description: 'Free NIP vaccines for babies from birth through early childhood. Children must be up to date to enrol in Victorian childcare and education services (No Jab No Play).',
      details: [
        'Hepatitis B, DTP, Polio, Hib, MMR, Varicella, Meningococcal ACWY, and more',
        'First vaccines given at birth (Hepatitis B) and 6 weeks',
        'Medicare card required for free NIP vaccines',
        'No Jab No Play — children must be vaccinated or have a valid exemption to attend childcare/kindergarten',
        'Catch-up schedules available if vaccinations are delayed',
      ],
      cta: {
        text: 'View Full NIP Schedule',
        url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria'
      }
    }
  },
  {
    id: 'adolescents',
    label: 'Adolescents (10–19)',
    icon: Users,
    content: {
      title: 'Vaccines for Young People',
      description: 'NIP schedule vaccines including HPV catch-up for eligible young people under 26. School-based programs and pharmacy access.',
      details: [
        'Student Vaccination Program (Year 7 & 10) — dTpa, MenACWY, HPV',
        'HPV catch-up available for unvaccinated individuals under 26',
        'Whooping cough (dTpa) booster recommended for adolescents',
        'All vaccines provided free under NIP for eligible age groups',
        'Private options available for out-of-age-range or catch-up',
      ],
      cta: {
        text: 'Check Eligibility',
        url: 'https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria'
      }
    }
  },
  {
    id: 'adults',
    label: 'Adults & Pregnancy',
    icon: Heart,
    content: {
      title: 'Vaccines for Adults & Expecting Mothers',
      description: 'Important vaccines for adults, including pregnant women and seniors. Influenza, whooping cough, and more to protect you and your family.',
      details: [
        'Influenza vaccine — free annually for pregnant women and all adults',
        'Whooping cough (dTpa) — recommended each pregnancy and for adults around infants',
        'Pneumococcal vaccines — free for eligible adults over 70 or with chronic conditions',
        'Shingles vaccine (Shingrix) — available for adults 65+ or with specific risk factors',
        'COVID-19 vaccines — available for all eligible adults',
      ],
      cta: {
        text: 'Book an Adult Vaccination',
        url: '#vaccination'
      }
    }
  },
  {
    id: 'indigenous',
    label: 'Aboriginal & Torres Strait Islander',
    icon: BabyIcon,
    content: {
      title: 'Additional Funded Vaccines',
      description: 'Additional vaccines are available free for Aboriginal and Torres Strait Islander people through the NIP, recognising increased risk factors.',
      details: [
        'Additional pneumococcal vaccines — free for all Aboriginal and Torres Strait Islander people',
        'Hepatitis A vaccine — free for all Aboriginal and Torres Strait Islander children',
        'Enhanced influenza vaccination — funded for high-risk groups',
        'All Aboriginal and Torres Strait Islander people can access these free vaccines',
        'Our pharmacists are culturally safe and welcome all community members',
      ],
      cta: {
        text: 'Ask About Eligible Vaccines',
        url: '#location'
      }
    }
  },
  {
    id: 'high-risk',
    label: 'High-Risk Groups & Catch-Up',
    icon: AlertCircle,
    content: {
      title: 'Catch-Up & Special Risk Groups',
      description: 'Vaccination support for people under 20, refugees, humanitarian entrants, and those with medical conditions increasing disease risk.',
      details: [
        'Catch-up immunisations for anyone under 20 who missed vaccines',
        'Refugee and humanitarian entrants — free catch-up program',
        'People with chronic medical conditions (heart disease, diabetes, lung disease) may be eligible for additional vaccines',
        'Victorian Government-funded vaccines available for eligible groups not covered by Medicare',
        'We can check your history and create a personalised catch-up plan',
      ],
      cta: {
        text: 'Book a Catch-Up Consultation',
        url: '#location'
      }
    }
  },
  {
    id: 'travel',
    label: 'Travel Vaccinations',
    icon: Plane,
    content: {
      title: 'Travel Health & Vaccines',
      description: 'Private travel health consultations and vaccination. Protect yourself before you go. Book a consultation for destination-specific requirements.',
      details: [
        'Yellow fever vaccine (required for certain countries)',
        'Typhoid, Hepatitis A & B, Japanese encephalitis',
        'Meningococcal ACWY and MenB',
        'Travel health advice including malaria prophylaxis',
        'Consultation fee may apply for travel vaccines',
        'Book early — some vaccines require multiple doses over weeks',
      ],
      cta: {
        text: 'Book Travel Consultation',
        url: '#vaccination'
      }
    }
  },
]

export function VaccinationsSection() {
  const [activeTab, setActiveTab] = useState('infants')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const activeContent = vaccineTabs.find(tab => tab.id === activeTab)

  return (
    <section id="vaccination" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: `translateY(${isInView ? 0 : '30px'})`,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>IMMUNISATION SERVICES</p>
          <h2 className="mb-4">
            Vaccination Services — <span style={{ color: 'var(--color-navy)' }}>Full NIP Schedule Available</span>
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] max-w-3xl mx-auto">
            Blackshaws Road Pharmacy is an accredited immunisation provider, delivering the full National Immunisation Program (NIP) schedule for Victorians.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
          {vaccineTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'tab-active'
                  : 'text-[var(--color-gray-600)] hover:text-[var(--color-navy)] hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: `translateY(${isInView ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
          }}
        >
          {activeContent && (
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-[var(--color-gray-200)]">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
                >
                  <activeContent.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold" style={{ color: 'var(--color-navy)' }}>
                    {activeContent.content.title}
                  </h3>
                  <p className="text-[var(--color-gray-600)]">{activeContent.label}</p>
                </div>
              </div>

              <p className="text-lg text-[var(--color-gray-700)] mb-8 leading-relaxed">
                {activeContent.content.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--color-navy)' }}>What's included:</h4>
                  <ul className="space-y-3">
                    {activeContent.content.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-navy)' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-[var(--color-gray-600)]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[var(--color-gray-200)]">
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--color-navy)' }}>Need Help?</h4>
                  <p className="text-sm text-[var(--color-gray-600)] mb-6">
                    Not sure what vaccinations you or your family need? Speak to one of our pharmacists — we'll check your vaccination history and recommend what's due.
                  </p>
                  <Button variant="primary" asChild>
                    <a href="tel:0393913257">Call Us Now</a>
                  </Button>
                </div>
              </div>

              {/* Callout Box */}
              <div
                className="mt-8 p-6 rounded-xl"
                style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
              >
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-2">Victorian Immunisation Schedule</h5>
                    <p className="text-sm opacity-90 mb-4">
                      For the complete and up-to-date schedule, including all age groups and vaccine eligibility criteria, visit the official Department of Health resource.
                    </p>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-[var(--color-navy)]" asChild>
                      <a
                        href="https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Full Schedule
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            style={{ backgroundColor: 'var(--color-red)' }}
            asChild
          >
            <a
              href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Vaccination Online →
            </a>
          </Button>
          <p className="text-xs text-[var(--color-gray-600)] mt-3">
            Powered by MedAdvisor
          </p>
        </div>
      </div>
    </section>  )
}
