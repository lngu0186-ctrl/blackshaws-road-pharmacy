import { Award, BadgeCheck, ExternalLink, HeartHandshake, Shield } from 'lucide-react'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Blackshaws+Road+Pharmacy/@-37.8732479,144.8235793,17z/data=!4m8!3m7!1s0x6ad64e7c4ab2b3b5:0x504567521000ce1!8m2!3d-37.8732479!4d144.825768!9m1!1b1!16s%2Fg%2F11c5lqwz8y'

const pillars = [
  {
    icon: Shield,
    title: 'AHPRA-registered pharmacists',
    description: 'Advice and dispensing decisions made by registered professionals.',
  },
  {
    icon: BadgeCheck,
    title: 'Independent community pharmacy',
    description: 'Locally owned and run, not a chain. Decisions get made here, for locals.',
  },
  {
    icon: HeartHandshake,
    title: 'Private consultations',
    description: 'A quiet space to talk through prescriptions, vaccinations and sensitive health questions.',
  },
  {
    icon: Award,
    title: 'Serving local families since 1968',
    description: 'Many of our patients have been coming here for decades. Some since they were kids.',
  },
]

export function PatientTrustSection() {
  return (
    <section className="section-padding bg-alt">
      <div className="container-custom">
        <div className="mb-12 max-w-3xl">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>Why locals trust us</p>
          <h2 className="text-[var(--color-navy)]">A pharmacy that knows your name.</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">No queues of strangers, no call centres. Just registered pharmacists and a local team who take the time to help properly.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"><pillar.icon aria-hidden="true" className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl text-[var(--color-navy)]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[28px] border border-[var(--color-border)] bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl text-[var(--color-navy)]">Don't take our word for it.</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">Read what locals say about us on Google, or leave a review after your next visit.</p>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy-soft)]"
          >
            Reviews on Google <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
