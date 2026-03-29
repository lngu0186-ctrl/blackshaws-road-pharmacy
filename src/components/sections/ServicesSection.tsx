import { Pill, Syringe, Beaker, Heart, Calendar, Stethoscope, Shield, ShoppingBag, ArrowRight, Leaf, FlaskConical } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  { icon: Pill, title: 'Prescriptions & Dispensing', description: 'Accurate dispensing, thoughtful counselling and dependable medication support with the reassurance of a local pharmacy team that knows its community.' },
  { icon: Syringe, title: 'Vaccinations & Immunisations', description: 'Accredited vaccination services spanning flu, travel and key adult protections, with strong eligibility and follow-up guidance.' },
  { icon: Beaker, title: 'Medication Management Reviews', description: 'Structured reviews that help simplify regimens, reduce medication burden and improve outcomes alongside your doctor.' },
  { icon: Shield, title: 'Chemist Care Now', description: 'Government-backed care for a range of eligible common conditions, delivered privately and with safe escalation where needed.', highlight: true },
  { icon: Heart, title: 'Health Checks & Screening', description: 'Practical screening and monitoring services that support prevention, earlier intervention and better everyday health decisions.' },
  { icon: Calendar, title: 'WebsterPaks & Dose Administration', description: 'Medication packing and dose support for people managing complex schedules, multiple medicines or family care needs.' },
  { icon: Stethoscope, title: 'Minor Ailments & Consultations', description: 'In-pharmacy advice for common conditions, with appropriate referral to GP or urgent care whenever symptoms warrant it.' },
  { icon: Leaf, title: 'Plant Based Therapies', description: 'Respectful, professional pharmacy support for patients with prescriptions for plant based therapies, focused on safe supply and quality use of medicines.', href: '/plant-based-therapies', linkText: 'Learn more' },
  { icon: FlaskConical, title: 'Compounding', description: 'Customised medicines prepared to your individual needs, facilitated through our partnership with Burke Road Compounding Pharmacy.', href: '/compounding', linkText: 'Learn more' },
  { icon: ShoppingBag, title: 'Practitioner-Only Products', description: 'A curated online range of premium practitioner-led products supported by a pharmacy that can help patients choose appropriately.', shopLink: 'https://blackshawspharmacy.com.au/collections/practitioner-only-range', shopText: 'Shop practitioner range' },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Our core services</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">Comprehensive pharmacy services with a more premium, more human experience.</h2>
          </div>
          <p className="max-w-xl text-base text-[var(--color-text-muted)]">From medication support to preventive care, each service is presented clearly so patients can understand what’s available and take the next step confidently.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '24px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          {services.map((service, index) => <ServiceCard key={index} {...service} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, description, highlight, shopLink, shopText, href, linkText }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string; highlight?: boolean; shopLink?: string; shopText?: string; href?: string; linkText?: string }) {
  return (
    <Card className={`flex h-full flex-col ${highlight ? 'border-[var(--color-sage)] bg-[linear-gradient(180deg,white,rgba(238,245,239,0.75))]' : ''}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] ${highlight ? 'bg-[var(--color-sage-soft)] text-[var(--color-sage)]' : 'bg-[var(--color-red-soft)] text-[var(--color-red)]'}`}><Icon className="h-7 w-7" /></div>
      <h3 className="mt-6 text-2xl text-[var(--color-navy)]">{title}</h3>
      <p className="mt-4 flex-grow text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        {shopLink ? (
          <a href={shopLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]">{shopText} <ArrowRight className="h-4 w-4" /></a>
        ) : href ? (
          <Link to={href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]">{linkText || 'Learn more'} <ArrowRight className="h-4 w-4" /></Link>
        ) : (
          <span className={`text-xs font-bold uppercase tracking-[0.18em] ${highlight ? 'text-[var(--color-sage)]' : 'text-[var(--color-red)]'}`}>{highlight ? 'Most consultations free' : 'Local expert support'}</span>
        )}
      </div>
    </Card>
  )
}
