'use client'

import { useRef } from 'react'
import { Users } from 'lucide-react'

export function AboutSection() {
  const introRef = useRef(null)
  const isIntroInView = true

  const historyRef = useRef(null)
  const isHistoryInView = true

  const teamRef = useRef(null)
  const isTeamInView = true

  return (
    <section id="about" className="section-padding bg-alt">
      <div className="container-custom">
        {/* Intro: headline + two paragraphs */}
        <div
          ref={introRef}
          className="max-w-3xl mb-16"
          style={{
            opacity: isIntroInView ? 1 : 0,
            transform: `translateY(${isIntroInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
            Your local pharmacy, backed by national strength
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] leading-relaxed mb-5">
            Since 1968, Blackshaws Road Pharmacy has been a trusted part of the Altona North community. As a proud member of Independent Pharmacies Australia (IPA), we combine the personaltouch of an independent local pharmacy with the resources and clinical rigour of Australia's largest independent pharmacy network.
          </p>
          <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
            Whether it&apos;s everyday healthcare, prescription management, vaccinations, or our Chemist Care Now service, you&apos;ll always find expert advice and genuine care from people who know your name.
          </p>
        </div>

        {/* History block */}
        <div
          ref={historyRef}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          style={{
            opacity: isHistoryInView ? 1 : 0,
            transform: `translateY(${isHistoryInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
              55+ years of community health
            </h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Founded in 1968, we&apos;ve grown with the community, adapting to new health challenges while never losing sight of what makes a pharmacy great: trust, accessibility, and compassionate care.
            </p>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Today, our team of registered pharmacists brings together decades of combined experience. We don&apos;t just dispense medication — we listen, advise, and support you through every health journey.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative h-80 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <img
                src="/logo.svg"
                alt="Blackshaws Road Pharmacy"
                className="h-16 w-auto mb-4 opacity-50"
                style={{ maxWidth: '220px' }}
              />
              <p className="text-5xl font-serif font-bold mb-2" style={{ color: 'var(--color-navy)' }}>1968</p>
              <p className="text-sm text-[var(--color-gray-600)] uppercase tracking-wider">Your trusted local pharmacy</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-red)', color: 'white' }}>
                  Est. 1968
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
                  Independent & proud
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team & IPA */}
        <div
          ref={teamRef}
          className="grid lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: isTeamInView ? 1 : 0,
            transform: `translateY(${isTeamInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
              Expert pharmacists you can trust
            </h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Our pharmacists are registered with AHPRA and undergo continuous professional development to stay at the forefront of clinical practice. From immunisations to medication reviews, from chronic disease management to specialist compounding — we bring expertise and empathy to every consultation.
            </p>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              As an IPA member, we&apos;re part of a nationwide network that shares best practices, clinical protocols, and training resources. This means you receive local,personal service backed by national standards of excellence.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                AHPRA Registered
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                Independent Pharmacies Australia
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                Accredited Immunisers
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-red-light)] to-[var(--color-navy)] opacity-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Users className="w-24 h-24 mb-4 opacity-30" style={{ color: 'var(--color-navy)' }} />
              <p className="text-4xl font-serif font-bold mb-2" style={{ color: 'var(--color-navy)' }}>10+</p>
              <p className="text-sm text-[var(--color-gray-600)]">Dedicated Team Members</p>
              <p className="text-xs text-[var(--color-gray-600)] mt-2">Including pharmacists, technicians, and support staff</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}