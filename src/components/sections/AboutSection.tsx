import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users } from 'lucide-react'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const teamRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-alt">
      <div className="container-custom">
        {/* Main intro */}
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          style={{
            opacity: isInView ? 1 : 0,
            transform: `translateY(${isInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div>
            <span className="section-label">About us</span>
            <h2 style={{ color: 'var(--color-navy)' }}>Serving Altona North since 1968</h2>
            <p className="text-[var(--color-gray-600)] mt-6 leading-relaxed text-lg">
              Blackshaws Road Pharmacy has been part of the Altona North community for over 55 years. We're a locally owned, independently run pharmacy where your health is always personal — never transactional.
            </p>
            <p className="text-[var(--color-gray-600)] mt-4 leading-relaxed">
              As a proud member of Independent Pharmacies Australia, we bring together the warmth and personal attention of your local chemist with the clinical strength of Australia's largest independent pharmacy network. That means better access to medications, expert pharmacist consultations, vaccinations, Chemist Care Now services, and everyday health advice — all backed by national support.
            </p>
            <p className="text-[var(--color-gray-600)] mt-4 leading-relaxed">
              Whether you need a script filled, a health check, travel vaccinations, or simply someone to talk through your options — our experienced team is here. No appointment needed for most services, no rush, and always a familiar face behind the counter.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {['AHPRA Registered', 'IPA Member', 'Accredited Immunisers'].map(tag => (
                <div key={tag} className="px-4 py-2 bg-white rounded-lg border border-[var(--color-gray-200)] text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md flex items-center justify-center">
            <div className="text-center p-8">
              <img
                src="/ipa-logo.png"
                alt="Independent Pharmacies Australia"
                className="mx-auto mb-6"
                style={{ maxWidth: '160px', height: 'auto' }}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gray-600)]">
                Proud member of
              </p>
              <h3 className="text-xl mt-1" style={{ color: 'var(--color-navy)' }}>
                Independent Pharmacies Australia
              </h3>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-red)', color: 'white' }}>
                  55+ Years
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
                  Locally Owned
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div
          ref={teamRef}
          className="grid lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: isTeamInView ? 1 : 0,
            transform: `translateY(${isTeamInView ? 0 : '30px'})`,
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
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
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden border border-[var(--color-gray-200)] bg-white shadow-md">
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
