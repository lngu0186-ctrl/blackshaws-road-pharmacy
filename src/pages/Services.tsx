import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Stethoscope, Pill as PillIcon, Heart as HeartIcon, Activity as ActivityIcon, Brain as BrainIcon, Wind as WindIcon, Droplet as DropletIcon, Moon as MoonIcon, Plane as PlaneIcon, CalendarCheck as CalendarCheckIcon, ClipboardList as ClipboardListIcon, Users as UsersIcon, Sparkles as SparklesIcon, Bandage as BandageIcon, Phone } from 'lucide-react'
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
    <div className="services-page">
      <section className="services-header section-padding" style={{ backgroundColor: 'var(--color-off-white)' }}>
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>OUR SERVICES</p>
            <h1 className="mb-6" style={{ color: 'var(--color-navy)' }}>
              Comprehensive Health & Pharmacy Services
            </h1>
            <p className="text-lg text-[var(--color-gray-600)]">
              From routine health checks to specialised consultations, our team of qualified pharmacists
              and health professionals are here to support your wellbeing. All services are delivered
              with the care and expertise you expect from your local pharmacy.
            </p>
          </div>
        </div>
      </section>

      {categories.map((category, index) => {
        const categoryServices = getServicesByCategory(category)
        const categoryInfo = serviceCategories[category]
        const IconComponent = iconMap[categoryServices[0]?.icon] || Stethoscope

        return (
          <section
            key={category}
            className="services-category section-padding"
            style={{ backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-off-white)' }}
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                    {categoryInfo.title}
                  </h2>
                  <p className="text-[var(--color-gray-600)] max-w-2xl">
                    {categoryInfo.description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service) => {
                  const ServiceIcon = iconMap[service.icon] || PillIcon

                  return (
                    <Card key={service.id} className="service-card h-full flex flex-col">
                      <div className="flex-1">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'var(--color-red)', color: 'white' }}
                        >
                          <ServiceIcon className="w-7 h-7" />
                        </div>

                        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-navy)' }}>
                          {service.title}
                        </h3>
                        <p className="text-[var(--color-gray-600)] mb-4">
                          {service.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs rounded-full"
                              style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm font-medium mb-4" style={{ color: service.isFree ? 'var(--color-navy)' : 'var(--color-red)' }}>
                          {service.isFree ? '✓ Free service' : 'Paid service'}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-200">
                        <Link to={`/services/${service.slug}`}>
                          <Button variant="primary" className="w-full">
                            Learn More
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
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

      <section
        className="section-padding text-white"
        style={{ backgroundColor: 'var(--color-navy)' }}
      >
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Book an Appointment?</h2>
            <p className="mb-8 opacity-90">
              Most of our services are walk-in or bookable online. Our friendly pharmacists are ready
              to help you take control of your health. Can't find what you're looking for? Contact
              us to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:0393913257">
                <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-[var(--color-navy)]">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: (03) 9391 3257
                </Button>
              </a>
              <Link to="/services">
                <Button variant="primary" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
