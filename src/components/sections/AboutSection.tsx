import { Users, Award, HeartHandshake, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '../layout/Logo'
import { Reveal } from '../ui/Reveal'

const teamHighlights = [
  {
    name: 'Experienced local pharmacists',
    role: 'Medication reviews, vaccinations, and everyday medicine guidance',
    icon: Award,
  },
  {
    name: 'Patient-first support team',
    role: 'Warm, practical help with scripts, repeat medicines, and product selection',
    icon: HeartHandshake,
  },
  {
    name: 'Clinically focused care',
    role: 'AHPRA-registered pharmacists working to current Australian standards',
    icon: ShieldCheck,
  },
]

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-alt">
      <div className="container-custom">
        {/* Intro */}
        <Reveal className="max-w-3xl mb-16">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>Our story</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
            Part of Altona North since 1968
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] leading-relaxed mb-5">
            Blackshaws Road Pharmacy has served Altona North, Brooklyn, South Kingsville, and the surrounding suburbs for over five decades. We are an independent, family-run pharmacy, and a member of Independent Pharmacies Australia, which gives a local business the training and resources of a national network.
          </p>
          <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
            Many of our customers have been coming here since they were kids. Whether you need a script filled, a vaccination, or honest advice about a medicine, you will get a straight answer from someone local.
          </p>
        </Reveal>

        {/* History block */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <Reveal className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
              Over five decades of community health
            </h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Founded in 1968, we have grown with the community, adapting to new health challenges without losing sight of what makes a pharmacy useful: trust, access, and care that feels personal.
            </p>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Our pharmacists do more than dispense medicines. They listen, explain, and help you make sense of your treatment, in plain language.
            </p>
          </Reveal>
          {/* TODO(owner): replace this graphic card with a real photo of the shop or team when available (see design/visual-assets-plan.md, photo-team.webp). */}
          <Reveal variant="scale" delay={120} className="order-1 lg:order-2 relative h-80 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,57,43,0.12),transparent_34%),linear-gradient(180deg,rgba(27,42,107,0.02),rgba(27,42,107,0.08))]" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[var(--color-navy-soft)]/70 blur-2xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <Logo className="h-16 max-w-[220px] mb-4" imageClassName="opacity-70 object-contain" />
              <p className="text-5xl font-serif font-bold mb-2" style={{ color: 'var(--color-navy)' }}>1968</p>
              <p className="text-sm text-[var(--color-gray-600)] uppercase tracking-wider">Your local pharmacy</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-red)', color: 'white' }}>
                  Est. 1968
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
                  Independent & proud
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Team & IPA */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Our pharmacists</p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6" style={{ color: 'var(--color-navy)' }}>
              Pharmacists you can talk to
            </h3>
            <p className="text-[var(--color-gray-600)] mb-4 leading-relaxed">
              Our pharmacists are registered with AHPRA and keep their training current. From immunisations to medication reviews to compounding support, you can expect clear explanations and practical help, not a rushed handover.
            </p>
            <p className="text-[var(--color-gray-600)] mb-6 leading-relaxed">
              As an IPA member pharmacy, we share clinical protocols and training with independent pharmacies across Australia. You get local, personal service with solid clinical backing.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {teamHighlights.map(({ name, role, icon: Icon }) => (
                <div key={name} className="rounded-2xl border border-[var(--color-gray-200)] bg-white p-4 shadow-sm">
                  <Icon aria-hidden="true" className="h-6 w-6 text-[var(--color-red)]" />
                  <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>{name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-600)]">{role}</p>
                </div>
              ))}
            </div>
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
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center rounded-full bg-[var(--color-red)] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[var(--color-red-hover)]" style={{ color: '#ffffff' }}>
                Speak with our pharmacy team
              </Link>
            </div>
          </Reveal>
          <Reveal variant="scale" delay={120} className="relative rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-red-light)] to-[var(--color-navy)] opacity-10" />
            <div className="relative grid gap-4 p-6">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-gray-200)] bg-white/95 p-4">
                <Users aria-hidden="true" className="h-10 w-10 text-[var(--color-navy)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">Dedicated local team</p>
                  <p className="text-xs text-[var(--color-gray-600)]">Pharmacists, dispensary technicians, and support staff focused on continuity of care.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--color-gray-200)] bg-[var(--color-surface-alt)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-red)]">What you can expect</p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--color-gray-600)]">
                  <li>• Clear medicine counselling in plain language</li>
                  <li>• Respectful help with sensitive health concerns</li>
                  <li>• Practical coordination with your GP and other providers</li>
                  <li>• Support across vaccinations, medication reviews, and everyday care</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[var(--color-navy)] p-5 text-white">
                <p className="text-3xl font-serif font-bold">Since 1968</p>
                <p className="mt-2 text-sm text-white/85">Independent, community-based care in Altona North.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
