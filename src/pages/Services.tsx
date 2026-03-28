import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Stethoscope, Pill as PillIcon, Heart as HeartIcon, Activity as ActivityIcon, Brain as BrainIcon, Wind as WindIcon, Droplet as DropletIcon, Moon as MoonIcon, Plane as PlaneIcon, CalendarCheck as CalendarCheckIcon, ClipboardList as ClipboardListIcon, Users as UsersIcon, Sparkles as SparklesIcon, Bandage as BandageIcon, Phone, ArrowRight } from 'lucide-react'
import { serviceCategories, getServicesByCategory, getCategories } from '../data/services'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import './Services.css'

const iconMap: Record<string, React.ElementType> = {
  activity: ActivityIcon,
  shield: Stethoscope,
  pill: PillIcon,
  heart: HeartIcon,
  brain: BrainIcon,
  wind: WindIcon,
  droplet: DropletIcon,
  moon: MoonIcon,
  plane: PlaneIcon,
  'calendar-check': CalendarCheckIcon,
  'clipboard-list': ClipboardListIcon,
  users: UsersIcon,
  sparkles: SparklesIcon,
  bandage: BandageIcon,
  stethoscope: Stethoscope,
}

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Health Services | Blackshaws Road Pharmacy'
  }, [])

  const categories = getCategories()

  return (
    <div className="services-page bg-[var(--color-cream)]">
      <section className="section-padding-lg relative overflow-hidden bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="section-label !text-white/70">Health services</p>
              <h1 className="max-w-4xl text-white">Authoritative, pharmacist-led services for everyday health and long-term care.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">From structured medication reviews to vaccination support and common-condition care, our pharmacy services are built to be accessible, trustworthy and easy to understand.</p>
            </div>
            <div className="premium-panel rounded-[32px] p-7 text-[var(--color-text-dark)]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-red)]">What patients value</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {['Clear eligibility and booking guidance', 'Convenient local access to accredited care', 'Respectful, clinically grounded service information', 'Support for families, seniors and everyday health needs'].map((item) => (
                  <div key={item} className="rounded-[24px] bg-white/85 p-4 text-sm text-[var(--color-text-muted)]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10 pb-8">
        <div className="container-custom">
          <div className="grid gap-5 rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_30px_90px_-50px_rgba(16,24,63,0.28)] md:grid-cols-3">
            {['Vaccinations and travel health', 'Medication review and adherence support', 'Minor ailment and everyday health consultations'].map((item) => (
              <div key={item} className="rounded-[22px] bg-[var(--color-surface-alt)] px-5 py-4 text-sm font-semibold text-[var(--color-navy)]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {categories.map((category, index) => {
        const categoryServices = getServicesByCategory(category)
        const categoryInfo = serviceCategories[category]
        const IconComponent = iconMap[categoryServices[0]?.icon] || Stethoscope

        return (
          <section key={category} className="services-category section-padding" style={{ backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-surface-alt)' }}>
            <div className="container-custom">
              <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-[var(--color-red-soft)] text-[var(--color-red)]"><IconComponent className="h-8 w-8" /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-red)]">Service category</p>
                    <h2 className="mt-2 text-[var(--color-navy)]">{categoryInfo.title}</h2>
                    <p className="mt-3 max-w-3xl text-[var(--color-text-muted)]">{categoryInfo.description}</p>
                  </div>
                </div>
                <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]">Browse all services <ArrowRight className="h-4 w-4" /></Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {categoryServices.map((service) => {
                  const ServiceIcon = iconMap[service.icon] || PillIcon
                  return (
                    <Card key={service.id} className="service-card flex h-full flex-col">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"><ServiceIcon className="h-7 w-7" /></div>
                      <div className="flex-1">
                        <h3 className="mt-6 text-2xl text-[var(--color-navy)]">{service.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{service.shortDescription}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-semibold text-[var(--color-navy)]">{tag}</span>)}
                        </div>
                      </div>
                      <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                        <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: service.isFree ? 'var(--color-sage)' : 'var(--color-red)' }}>{service.isFree ? 'Free or funded options available' : 'Private service details available'}</div>
                        <Link to={`/services/${service.slug}`}>
                          <Button variant="primary" className="w-full justify-center">Learn more <ChevronRight className="h-4 w-4" /></Button>
                        </Link>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      <section className="section-padding bg-[var(--color-navy-deep)] text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-white">Need help choosing the right service?</h2>
            <p className="mt-4 text-lg text-white/76">Our pharmacists can guide you to the most appropriate service, booking pathway or next clinical step — including when a GP or urgent review is more appropriate.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="tel:0393913257"><Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]"><Phone className="mr-2 h-5 w-5" /> Call: (03) 9391 3257</Button></a>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer"><Button variant="red" size="lg">Book online where available</Button></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
