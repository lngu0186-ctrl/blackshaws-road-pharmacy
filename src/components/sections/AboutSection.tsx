'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Users, Shield } from 'lucide-react'

export function AboutSection() {
  const quoteRef = useRef(null)
  const isQuoteInView = useInView(quoteRef, { once: true, margin: '-100px' })

  const historyRef = useRef(null)
  const isHistoryInView = useInView(historyRef, { once: true, margin: '-100px' })

  const teamRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-alt">
      <div className="container-custom">
        {/* Quote block - text left, Alliance card right */}
        <div
          ref={quoteRef}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          style={{
            opacity: isQuoteInView ? 1 : 0,
            transform: `translateY(${isQuoteInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div>
            <Quote className="w-12 h-12 mb-6" style={{ color: 'var(--color-red)' }} />
            <blockquote className="text-3xl md:text-4xl font-serif leading-tight mb-6" style={{ color: 'var(--color-navy)' }}>
              "Your health is personal. So is our care."
            </blockquote>
            <p className="text-[var(--color-gray-600)] text-lg italic">
              — 55 years of putting Altona North first
            </p>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--color-navy)' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <Shield className="w-20 h-20 mb-6" style={{ color: 'var(--color-red)' }} />
              <h3 className="text-2xl font-serif font-bold mb-2 text-white">Alliance Pharmacy</h3>
              <p className="text-white/80 mb-6">Member Since 2015</p>
              <div className="w-16 h-1" style={{ backgroundColor: 'var(--color-red)' }} />
            </div>
          </div>
        </div>

        {/* History section - text right, image left */}
        <div
          ref={historyRef}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          style={{
            opacity: isHistoryInView ? 1 : 0,
            transform: `translateY(${isHistoryInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <div className="order-2 lg:order-1 relative h-80 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-navy-light)] to-[var(--color-red)] opacity-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <img
                src="/logo-black.png"
                alt="Blackshaws Road Pharmacy"
                className="h-16 w-auto mb-4 opacity-40"
                style={{ maxWidth: '220px', objectFit: 'contain' }}
              />
              <p className="text-5xl font-serif font-bold mb-2" style={{ color: 'var(--color-navy)' }}>1968</p>
              <p className="text-sm text-[var(--color-gray-600)] uppercase tracking-wider">Where It All Began</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-red)', color: 'white' }}>
                  55+ Years
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
                  Locally Owned
                </span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h3 style={{ color: 'var(--color-navy)' }}>Over 55 Years of Community Care</h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Blackshaws Road Pharmacy opened in 1968, built on a simple belief: healthcare should be personal, accessible, and delivered with integrity. For five generations, we&apos;ve been a trusted part of the Altona North community.
            </p>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Today, we combine that heritage with modern clinical expertise. Our pharmacists are not just medication experts — they&apos;re your health partners, dedicated to providing evidence-based care with genuine compassion.
            </p>
            <p className="text-[var(--color-gray-600)] text-sm italic">
              We&apos;re proud to be a member of Alliance Pharmacy, Australia&apos;s leading independent pharmacy network, giving us access to cutting-edge clinical programs and training to serve you better.
            </p>
          </div>
        </div>

        {/* Team section - alternating */}
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
            <h3 style={{ color: 'var(--color-navy)' }}>Meet Our Experienced Team</h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Our pharmacy team is more than a group of professionals — we&apos;re your neighbours. We know many of our customers by name, and we take pride in the relationships we&apos;ve built over decades.
            </p>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              All our pharmacists are registered with AHPRA and participate in ongoing professional development. From immunisations to medication reviews, from chronic disease management to wellness advice — we bring clinical excellence and genuine care to every interaction.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                AHPRA Registered
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                Alliance Pharmacy
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
