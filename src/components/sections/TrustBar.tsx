import { useCountUp } from '../../hooks/useIntersectionObserver'

const stats = [
  { label: 'Years of care', value: 55, suffix: '+', description: 'Trusted by local families since 1968' },
  { label: 'Patients served', value: 8000, suffix: '+', description: 'Across scripts, services and daily advice' },
  { label: 'Dedicated team', value: 12, suffix: '+', description: 'Pharmacists and support staff' },
  { label: 'Days open', value: 7, suffix: '/7', description: 'Reliable access to community care' },
]

const credibilityPoints = [
  'Pharmacist in charge: Tram-Anh Bui',
  'Alliance Pharmacy member',
  'Private consultations and pharmacist review',
  'Local care, prescriptions and vaccinations',
]

export function TrustBar() {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] py-14 text-white">
      <div className="container-custom">
        <div className="mb-5 flex flex-wrap gap-3">
          {credibilityPoints.map((point) => (
            <span key={point} className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/78">
              {point}
            </span>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value, suffix, description }: { label: string; value: number; suffix: string; description: string }) {
  const { ref, count } = useCountUp(value, 2000)

  return (
    <div ref={ref} className="rounded-[28px] border border-white/10 bg-white/6 px-6 py-7 text-center backdrop-blur-sm">
      <div className="text-4xl font-bold md:text-5xl">{count}<span className="ml-1 text-xl font-medium text-white/72">{suffix}</span></div>
      <div className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.62)]">{label}</div>
      <p className="mt-3 text-sm text-white/74">{description}</p>
    </div>
  )
}
