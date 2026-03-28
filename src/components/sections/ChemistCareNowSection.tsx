import { Shield, Pill, Syringe, Heart, Stethoscope, Baby, BadgeCheck } from 'lucide-react'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Button } from '../ui/Button'

interface ChemistCareNowSectionProps { id?: string }

const chemistCareServices = [
  { icon: Pill, title: 'Contraceptive Pill Resupply', description: 'If you have had a previous prescription, our pharmacists may be able to provide timely confidential resupply without waiting for a GP appointment.' },
  { icon: Stethoscope, title: 'Urinary Tract Infections (UTI)', description: 'Fast assessment and treatment pathways for eligible uncomplicated UTIs, with private consultation and referral guidance if needed.' },
  { icon: Shield, title: 'Shingles Treatment', description: 'Early pharmacist-led access can help reduce discomfort and support faster management for eligible adults.' },
  { icon: Heart, title: 'Psoriasis Flare-Up', description: 'Discuss repeat management and pharmacist advice for flare-ups, including when follow-up with your doctor is appropriate.' },
  { icon: Syringe, title: 'Travel Vaccinations', description: 'Destination-specific vaccination support and travel health guidance through an accredited local pharmacy team.' },
  { icon: Baby, title: 'Impetigo (School Sores)', description: 'Prompt care for eligible presentations to help families access treatment faster and more conveniently.' },
]

export function ChemistCareNowSection({ id }: ChemistCareNowSectionProps) {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Ensure autoplay works — browsers may block it without user interaction
  const handleVideoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      (videoRef as React.MutableRefObject<HTMLVideoElement>).current = el
      el.play().catch(() => {/* autoplay blocked — video stays paused, overlay covers */})
    }
  }, [])

  return (
    <section id={id} className="section-padding relative overflow-hidden" style={{ background: 'var(--color-navy-deep)' }}>
      {/* Video background */}
      {!prefersReducedMotion && (
        <video
          ref={handleVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ opacity: 0.28 }}
          aria-hidden="true"
        >
          <source src="/chemist-care-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(16,24,63,0.76) 0%, rgba(16,24,63,0.60) 40%, rgba(16,24,63,0.72) 100%)' }} aria-hidden="true" />

      {/* Content */}
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">Victorian Government-backed care</span>

            <img
              src="/chemist-care-now-logo.png"
              alt="Chemist Care Now"
              className="mt-6 h-14 w-auto md:h-18"
              style={{ objectFit: 'contain', display: 'block' }}
            />

            <h2 className="mt-5 text-white">Delivered with faster access and trusted pharmacy judgement.</h2>
            <p className="mt-5 text-lg text-white/75">For eligible everyday conditions, the pharmacy can provide an easier path to treatment while keeping advice clinically grounded, private and community-focused.</p>

            <div className="mt-8 rounded-[30px] bg-white/12 p-6 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <h3 className="text-2xl text-white">What patients can expect</h3>
              <div className="mt-5 space-y-4">
                {['Private consultations that typically take 15–30 minutes', 'Most eligible Chemist Care Now consultations are free', 'Clear pharmacist guidance on when GP or urgent review is needed', 'Convenient access for common conditions without compromising safety'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#3b82f6]" />
                    <p className="text-sm leading-relaxed text-white/80">{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.betterhealth.vic.gov.au/chemist-care-now" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <Button variant="primary" size="lg">Learn more at Better Health Victoria</Button>
              </a>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '24px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            {chemistCareServices.map((service, index) => <ChemistCareCard key={index} {...service} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChemistCareCard({ icon: Icon, title, description, index }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <div
      ref={cardRef}
      className="flex h-full flex-col rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-42px_rgba(14,20,45,0.24)]"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '20px'})`,
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--color-sage-soft)] text-[var(--color-sage)]"><Icon className="h-6 w-6" /></div>
        <div>
          <h3 className="text-xl text-[var(--color-navy)]">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-[var(--color-border)] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-sage)]">Available now · Ask the pharmacist</div>
    </div>
  )
}
