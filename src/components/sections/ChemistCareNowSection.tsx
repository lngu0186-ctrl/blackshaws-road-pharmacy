import { useInView } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Button } from '../ui/Button'
import { BadgeCheck } from 'lucide-react'

interface ChemistCareNowSectionProps { id?: string }

/* ── SVG illustrations (white line art) ── */
function PillPackIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      <rect x="15" y="12" width="50" height="56" rx="4" />
      <line x1="15" y1="24" x2="65" y2="24" />
      {[0,1,2,3].map(row => [0,1,2].map(col => (
        <circle key={`${row}-${col}`} cx={27 + col * 12} cy={33 + row * 10} r="3.5" fill="white" fillOpacity="0.3" />
      )))}
    </svg>
  )
}

function CapsuleIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      <rect x="28" y="10" width="24" height="60" rx="12" />
      <line x1="28" y1="40" x2="52" y2="40" />
      <ellipse cx="40" cy="25" rx="8" ry="10" fill="white" fillOpacity="0.2" />
    </svg>
  )
}

function ShinglesIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      <path d="M40 10 C40 10 28 14 28 28 L28 52 C28 56 32 60 36 62 L40 70 L44 62 C48 60 52 56 52 52 L52 28 C52 14 40 10 40 10Z" />
      {[[36,30],[44,34],[38,40],[46,44],[40,50],[34,46]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="white" fillOpacity="0.5" />
      ))}
    </svg>
  )
}

function PsoriasisIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      <path d="M30 70 L30 30 C30 20 35 12 45 12" />
      <path d="M30 30 L22 22" />
      <path d="M45 12 C50 12 54 16 54 22 L54 36" />
      {[[36,38,4,3],[42,28,3,2],[48,42,3.5,2.5],[34,50,3,2],[40,56,2.5,2]].map(([cx,cy,rx,ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

function AeroplaneIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      <path d="M40 15 L44 25 L68 35 L68 40 L44 35 L44 55 L52 60 L52 64 L40 60 L28 64 L28 60 L36 55 L36 35 L12 40 L12 35 L36 25 Z" fill="white" fillOpacity="0.15" />
    </svg>
  )
}

function ImpetigoIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
      {/* Child 1 */}
      <circle cx="28" cy="26" r="10" />
      <path d="M28 36 C20 36 14 44 14 52 L14 62 L42 62 L42 52 C42 44 36 36 28 36Z" />
      <circle cx="25" cy="24" r="1.5" fill="white" fillOpacity="0.5" />
      <circle cx="31" cy="28" r="1.5" fill="white" fillOpacity="0.5" />
      {/* Child 2 */}
      <circle cx="54" cy="26" r="10" />
      <path d="M54 36 C46 36 40 44 40 52 L40 62 L68 62 L68 52 C68 44 62 36 54 36Z" />
      <circle cx="51" cy="24" r="1.5" fill="white" fillOpacity="0.5" />
      <circle cx="57" cy="28" r="1.5" fill="white" fillOpacity="0.5" />
      <circle cx="54" cy="48" r="1.5" fill="white" fillOpacity="0.5" />
    </svg>
  )
}

const chemistCareServices = [
  { Icon: PillPackIcon, title: 'Contraceptive options', description: 'Is your contraceptive running low? If you have a previous prescription, you might be able to get a resupply from your chemist.' },
  { Icon: CapsuleIcon, title: 'Urinary tract infections', description: 'Frequent bathroom visits? A burning sensation when you pee? You may have a UTI. Treatment may be available at your chemist.' },
  { Icon: ShinglesIcon, title: 'Shingles', description: 'A painful blistering rash or a tingling, burning sensation on the skin? You may have shingles. If you are 18 or older treatment is available.' },
  { Icon: PsoriasisIcon, title: 'Psoriasis', description: 'Has your psoriasis flared up? You may be able to get a resupply of your cream or ointment.' },
  { Icon: AeroplaneIcon, title: 'Vaccinations for travel', description: 'Heading overseas? A range of travel vaccinations can be administered by your chemist.' },
  { Icon: ImpetigoIcon, title: 'Impetigo (school sores)', description: 'Red sores on the face or body? You may have impetigo (school sores). Treatment may be available at your chemist.' },
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
      video.play().catch(() => {})
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
    el.play().catch(() => {})
  }, [prefersReducedMotion])

  return (
    <section id={id} className="section-padding relative overflow-hidden" style={{ background: 'var(--color-navy-deep)' }}>
      {/* Poster fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/chemist-care-bg-poster.webp)',
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

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(16,24,63,0.80) 0%, rgba(16,24,63,0.62) 38%, rgba(16,24,63,0.80) 100%)' }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at left center, rgba(16,24,63,0.32) 0%, rgba(16,24,63,0.10) 34%, rgba(16,24,63,0.58) 100%)' }} aria-hidden="true" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          {/* Left: intro + expectations */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">Victorian Government-backed care</span>

            <img
              src="/chemist-care-now-logo.png"
              alt="Chemist Care Now"
              className="mt-6 h-12 w-auto sm:h-14 md:h-16"
              style={{ objectFit: 'contain', display: 'block' }}
            />

            <h2 className="mt-5 text-white">Get it at the chemist with Chemist Care Now</h2>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">Visit your local participating chemist to get the care you need. For eligible everyday conditions, the pharmacy can provide an easier path to treatment.</p>

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

          {/* Right: condition cards — 3×2 grid */}
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `translateY(${isInView ? 0 : '24px'})`,
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {chemistCareServices.map((service, index) => (
              <ChemistCareCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChemistCareCard({ Icon, title, description, index }: { Icon: React.ComponentType; title: string; description: string; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <div
      ref={cardRef}
      className="group flex h-full cursor-default flex-col overflow-hidden rounded-2xl shadow-lg"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '20px'})`,
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      {/* Blue illustration area */}
      <div
        className="flex items-center justify-center py-8 transition-colors duration-250"
        style={{ backgroundColor: '#1a5eab' }}
      >
        <Icon />
      </div>
      {/* White text area — turns blue on hover */}
      <div className="flex flex-1 flex-col bg-white p-5 transition-colors duration-250 group-hover:bg-[#1a5eab]">
        <h4 className="text-base font-bold leading-snug transition-colors duration-250" style={{ color: '#2a9d5c' }} >
          <span className="group-hover:text-white">{title}</span>
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-600)] transition-colors duration-250 group-hover:text-white/90">{description}</p>
      </div>
    </div>
  )
}
