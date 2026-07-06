import { CalendarClock, HeartHandshake, Landmark, ShieldCheck } from 'lucide-react'

const facts = [
  {
    icon: Landmark,
    title: 'Since 1968',
    description: 'Serving three generations of Altona North families from the same street.',
  },
  {
    icon: CalendarClock,
    title: 'Open 7 days',
    description: 'Weekdays until 9:00 pm, plus Saturday and Sunday hours.',
  },
  {
    icon: ShieldCheck,
    title: 'AHPRA-registered pharmacists',
    description: 'Every script and consultation is overseen by a registered pharmacist.',
  },
  {
    icon: HeartHandshake,
    title: 'Independent and local',
    description: 'Family-run, with the support of a national independent pharmacy network.',
  },
]

const credibilityPoints = [
  // TODO(owner): confirm the pharmacist-in-charge name and preferred membership wording (Alliance Pharmacy vs IPA) before launch.
  'Pharmacist in charge: Tram-Anh Bui',
  'Alliance Pharmacy member',
  'Private consultations available',
  'Prescriptions, vaccinations and everyday advice',
]

export function TrustBar() {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] py-14 text-white">
      <div className="container-custom">
        <div className="mb-5 flex flex-wrap gap-3">
          {credibilityPoints.map((point) => (
            <span key={point} className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              {point}
            </span>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.title} className="rounded-[28px] border border-white/10 bg-white/6 px-6 py-7 backdrop-blur-sm">
              <fact.icon aria-hidden="true" className="h-7 w-7 text-[#e8938a]" />
              <div className="mt-4 text-2xl font-bold">{fact.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
