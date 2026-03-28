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
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !videoRef.current) return

    const video = videoRef.current

    const attemptPlayback = () => {
      video.defaultMuted = true
      video.muted = true
      video.playsInline = true

      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => {
          // If autoplay is still blocked, the poster image remains visible.
        })
      }
    }

    attemptPlayback()

    video.addEventListener('canplay', attemptPlayback)
    video.addEventListener('loadeddata', attemptPlayback)
    document.addEventListener('visibilitychange', attemptPlayback)

    return () => {
      video.removeEventListener('canplay', attemptPlayback)
      video.removeEventListener('loadeddata', attemptPlayback)
      document.removeEventListener('visibilitychange', attemptPlayback)
    }
  }, [prefersReducedMotion])

  const handleVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el

    if (!el || prefersReducedMotion) return

    el.defaultMuted = true
    el.muted = true
    el.playsInline = true
    el.play().catch(() => {
      // Autoplay can still be blocked briefly on some devices until metadata is ready.
    })
  }, [prefersReducedMotion])

  return (
    <section id={id} className="section-padding relative overflow-hidden" style={{ background: 'var(--color-navy-deep)' }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/chemist-care-bg-poster.jpg)',
          opacity: videoLoaded && !prefersReducedMotion ? 0 : 0.26,
          transition: 'opacity 220ms ease',
        }}
        aria-hidden="true"
      />

      {!prefersReducedMotion && (
        <video
          ref={handleVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/chemist-care-bg-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ opacity: videoLoaded ? 0.34 : 0 }}
          aria-hidden="true"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/chemist-care-bg-silent.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(16,24,63,0.80) 0%, rgba(16,24,63,0.62) 38%, rgba(16,24,63,0.80) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at left center, rgba(16,24,63,0.32) 0%, rgba(16,24,63,0.10) 34%, rgba(16,24,63,0.58) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">Victorian Government-backed care</span>

            <img
              src="/chemist-care-now-logo.png"
              alt="Chemist Care Now"
              className="mt-6 h-12 w-auto sm:h-14 md:h-16"
              style={{ objectFit: 'contain', display: 'block' }}
            />

            <h2 className="mt-5 text-white">Delivered with faster access and trusted pharmacy judgement.</h2>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">For eligible everyday conditions, the pharmacy can provide an easier path to treatment while keeping advice clinically grounded, private and community-focused.</p>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-white/12 p-5 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-6">
              <h3 className="text-2xl text-white">What patients can expect</h3>
              <div className="mt-5 space-y-4">
                {['Private consultations that typically take 15–30 minutes', 'Most eligible Chemist Care Now consultations are free', 'Clear pharmacist guidance on when GP or urgent review is needed', 'Convenient access for common conditions without compromising safety'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-navy-soft)]" />
                    <p className="text-sm leading-relaxed text-white/80">{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.betterhealth.vic.gov.au/chemist-care-now" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block w-full sm:w-auto">
                <Button variant="primary" size="lg">Learn more at Better Health Victoria</Button>
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '24px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
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
      className="flex h-full flex-col rounded-[28px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_24px_60px_-42px_rgba(14,20,45,0.24)] sm:p-7"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '20px'})`,
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--color-sage-soft)] text-[var(--color-sage)]"><Icon className="h-6 w-6" /></div>
        <div>
          <h3 className="text-xl text-[var(--color-navy)] sm:text-[1.35rem]">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-[var(--color-border)] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-sage)]">Available now · Ask the pharmacist</div>
    </div>
  )
}
