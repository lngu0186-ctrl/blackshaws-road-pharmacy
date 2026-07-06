import { ArrowRight, FlaskConical, HeartPulse, Leaf, MessageCircle, Package, Pill, ShoppingBag, Syringe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const coreServices = [
  {
    icon: Pill,
    title: 'Prescriptions',
    description: 'New scripts, repeats, and eScripts. Bring it in or send it ahead and we will talk you through the next step.',
    href: '/prescriptions',
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Flu, COVID-19, and travel vaccinations by accredited pharmacist immunisers. Book online or ask in store.',
    href: '/health-services/vaccinations',
  },
  {
    icon: MessageCircle,
    title: 'Medication advice',
    description: 'Speak with our pharmacists about your medicines, side effects, repeats, and day-to-day health questions.',
    href: '/health-services/medscheck',
  },
  {
    icon: HeartPulse,
    title: 'Health checks',
    description: 'Blood pressure checks and everyday health monitoring, usually while you wait.',
    href: '/health-services/health-checks',
  },
  {
    icon: Package,
    title: 'Webster-paks',
    description: 'Weekly dose packing that keeps medicines organised, for people at home or in aged care.',
    href: '/health-services/dose-administration-aids',
  },
  {
    icon: FlaskConical,
    title: 'Chemist Care Now',
    description: 'Pharmacist consultations for a range of eligible common conditions, with referral to a GP when needed.',
    href: '/chemist-care-now',
    highlight: true,
  },
]

const specialtyServices = [
  { icon: Leaf, title: 'Plant Based Therapies', href: '/plant-based-therapies', description: 'Professional support for patients with prescriptions for plant based therapies.' },
  { icon: FlaskConical, title: 'Compounding', href: '/compounding', description: 'Custom-made preparations when standard medicines do not suit.' },
  { icon: ShoppingBag, title: 'Practitioner-only range', href: 'https://blackshawspharmacy.com.au/collections/practitioner-only-range', external: true, description: 'Practitioner-led products with pharmacist guidance on suitable choices.' },
]

export function ServicesSection() {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.12, rootMargin: '0px 0px -10% 0px' })

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Our services</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">What we can help with</h2>
          </div>
          <p className="max-w-xl text-base text-[var(--color-text-muted)]">Walk in, call, or book. Most services need no appointment.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '24px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          {coreServices.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className={`card group flex h-full flex-col no-underline ${service.highlight ? 'border-[var(--color-sage)] bg-[linear-gradient(180deg,white,rgba(238,245,239,0.75))]' : ''}`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] ${service.highlight ? 'bg-[var(--color-sage-soft)] text-[var(--color-sage)]' : 'bg-[var(--color-red-soft)] text-[var(--color-red)]'}`}>
                <service.icon aria-hidden="true" className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl text-[var(--color-navy)]">{service.title}</h3>
              <p className="mt-4 flex-grow text-sm leading-relaxed text-[var(--color-text-muted)]">{service.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 border-t border-[var(--color-border)] pt-4 text-sm font-semibold text-[var(--color-navy)]">
                Learn more <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Also at our pharmacy</p>
          <div className="grid gap-4 md:grid-cols-3">
            {specialtyServices.map((service) => {
              const inner = (
                <>
                  <service.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-[var(--color-red)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-navy)]">{service.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{service.description}</p>
                  </div>
                  <ArrowRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 self-center text-[var(--color-navy)] transition-transform group-hover:translate-x-1" />
                </>
              )
              const cls = 'group flex items-start gap-4 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 no-underline transition-colors hover:bg-white'
              return service.external ? (
                <a key={service.title} href={service.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={service.title} to={service.href} className={cls}>{inner}</Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
