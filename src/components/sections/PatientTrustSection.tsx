import { Award, BadgeCheck, HeartHandshake, Shield } from 'lucide-react'
import { Logo } from '../layout/Logo'

const pillars = [
  {
    icon: Shield,
    title: 'AHPRA-registered pharmacists',
    description: 'Clinical advice and dispensing decisions stay grounded in registered professional oversight.',
  },
  {
    icon: BadgeCheck,
    title: 'Independent community pharmacy care',
    description: 'Long-standing local care with the strength of Alliance Pharmacy support and training.',
  },
  {
    icon: HeartHandshake,
    title: 'Private, respectful consultations',
    description: 'Clear conversations about prescriptions, vaccinations and everyday health concerns.',
  },
  {
    icon: Award,
    title: 'Trusted by local families since 1968',
    description: 'A premium but approachable pharmacy experience shaped by decades of community trust.',
  },
]

export function PatientTrustSection() {
  return (
    <section className="section-padding bg-alt">
      <div className="container-custom">
        <div className="mb-6 flex justify-end">
          <div className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 shadow-[0_16px_40px_-34px_rgba(16,24,63,0.22)]">
            <Logo className="h-8 w-[8.5rem]" imageClassName="object-contain opacity-85" />
          </div>
        </div>
        <div className="mb-12 max-w-3xl">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>Why patients choose us</p>
          <h2 className="text-[var(--color-navy)]">Built to feel reassuring, not overwhelming.</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">This second layer of the homepage does the quiet trust work: experience, standards, privacy and practical support, without veering into hard-sell language.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"><pillar.icon className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl text-[var(--color-navy)]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
