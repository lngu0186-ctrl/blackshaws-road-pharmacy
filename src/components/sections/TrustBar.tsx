'use client'

import { useCountUp } from '../../hooks/useIntersectionObserver'

const stats = [
  {
    label: 'Serving',
    value: 55,
    suffix: '+ Years',
    description: 'Since 1968',
  },
  {
    label: 'Patients',
    value: 8000,
    suffix: '+',
    description: 'Trusted locally',
  },
  {
    label: 'Team',
    value: 12,
    suffix: '+',
    description: 'Dedicated staff',
  },
  {
    label: 'Days',
    value: 7,
    suffix: '/week',
    description: 'Always open',
  },
]

export function TrustBar() {
  return (
    <section className="bg-[var(--color-navy)] text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  suffix,
  description,
}: {
  label: string
  value: number
  suffix: string
  description: string
}) {
  const { ref, count } = useCountUp(value, 2000)

  return (
    <div className="text-center px-4 py-4" ref={ref}>
      <div className="text-4xl md:text-5xl font-serif font-bold mb-2">
        {count}
        <span className="text-xl md:text-2xl font-normal ml-1">{suffix}</span>
      </div>
      <div className="text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--color-red-light)' }}>
        {label}
      </div>
      <div className="text-xs text-white/70">{description}</div>
    </div>
  )
}
