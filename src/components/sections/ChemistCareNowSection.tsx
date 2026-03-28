import { Shield, Pill, Syringe, Heart, Stethoscope, Baby, BadgeCheck } from 'lucide-react'
import { Card } from '../ui/Card'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id={id} className="section-padding bg-[var(--color-sage-soft)]">
      <div className="container-custom" ref={ref}>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="badge-navy" style={{ background: 'rgba(16,24,63,0.1)' }}>Victorian Government-backed care</span>
            <h2 className="mt-5 text-[var(--color-navy-deep)]">Chemist Care Now, delivered with faster access and trusted pharmacy judgement.</h2>
            <p className="mt-5 text-lg text-[var(--color-text-muted)]">For eligible everyday conditions, the pharmacy can provide an easier path to treatment while keeping advice clinically grounded, private and community-focused.</p>

            <div className="mt-8 rounded-[30px] bg-white p-6 shadow-[0_30px_70px_-48px_rgba(16,24,63,0.28)]">
              <h3 className="text-2xl text-[var(--color-navy)]">What patients can expect</h3>
              <div className="mt-5 space-y-4">
                {['Private consultations that typically take 15–30 minutes', 'Most eligible Chemist Care Now consultations are free', 'Clear pharmacist guidance on when GP or urgent review is needed', 'Convenient access for common conditions without compromising safety'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--color-sage)]" />
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.betterhealth.vic.gov.au/chemist-care-now" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <Button variant="sage" size="lg">Learn more at Better Health Victoria</Button>
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
    <Card ref={cardRef} className="flex h-full flex-col bg-white" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '20px'})`, transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s` }}>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--color-sage-soft)] text-[var(--color-sage)]"><Icon className="h-6 w-6" /></div>
        <div>
          <h3 className="text-xl text-[var(--color-navy)]">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-[var(--color-border)] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-sage)]">Available now · Ask the pharmacist</div>
    </Card>
  )
}
