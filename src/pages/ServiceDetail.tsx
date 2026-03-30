import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Check, Calendar, Star } from 'lucide-react'
import { getServiceBySlug, services, serviceCategories } from '../data/services'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import BookingCTA from '../components/BookingCTA'
import './ServiceDetail.css'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState(getServiceBySlug(slug || ''))

  useEffect(() => {
    if (!service && slug) {
      const found = services.find((s) =>
        s.slug.toLowerCase() === slug?.toLowerCase() ||
        s.id.toLowerCase() === slug?.toLowerCase()
      )
      if (found) {
        setService(found)
      }
    }
    window.scrollTo(0, 0)
    if (service) {
      document.title = `${service.title} | Blackshaws Road Pharmacy`
    }
  }, [slug, service])

  if (!service) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>
              Service Not Found
            </h1>
            <p className="text-[var(--color-gray-600)] mb-6">
              We couldn't find the service you're looking for. It may have been moved or renamed.
            </p>
            <Link to="/health-services"><Button variant="primary">View All Services</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  const categoryInfo = serviceCategories[service.category]

  return (
    <div className="service-detail-page">
      <section className="section-padding text-white" style={{ backgroundColor: 'var(--color-navy)' }}>
        <div className="container-custom">
          <div className="mb-6">
            <Link to="/health-services" className="inline-flex items-center text-sm opacity-80 hover:opacity-100 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium mb-3 opacity-80">{categoryInfo.title.toUpperCase()}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl mb-6 opacity-90">{service.shortDescription}</p>

              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'var(--color-red)', color: 'white' }}>
                {service.isFree ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Free or Bulk Billed
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    {service.cost.split('—')[0].trim()}
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <BookingCTA service={service} variant="primary" size="lg" />
                <a href="tel:0393913257">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[var(--color-navy)]">
                    <Phone className="w-5 h-5 mr-2" />
                    Call to Book
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-red)' }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>About This Service</h2>
                <div className="prose max-w-none text-[var(--color-gray-600)] leading-relaxed">
                  {service.fullDescription.split('\n\n').map((paragraph, idx) => <p key={idx} className="mb-4">{paragraph}</p>)}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-navy)' }}><Star className="w-6 h-6 mr-3" style={{ color: 'var(--color-red)' }} />Who Is This For?</h2>
                <p className="text-[var(--color-gray-600)] leading-relaxed">{service.whoIsItFor}</p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-navy)' }}><Calendar className="w-6 h-6 mr-3" style={{ color: 'var(--color-red)' }} />What to Expect</h2>
                <p className="text-[var(--color-gray-600)] leading-relaxed">{service.whatToExpect}</p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>Related Topics</h2>
                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag) => <span key={tag} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'var(--color-off-white)', color: 'var(--color-navy)' }}>{tag}</span>)}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>Service Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-gray-600)] mb-1">Cost</p>
                    <p className="font-semibold" style={{ color: service.isFree ? 'var(--color-navy)' : 'var(--color-red)' }}>{service.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-gray-600)] mb-1">Booking</p>
                    <p className="font-semibold" style={{ color: 'var(--color-navy)' }}>{service.bookingCTA}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-[var(--color-gray-600)] mb-4">Have questions? Call us or visit the store.</p>
                  <a href="tel:0393913257" className="block">
                    <Button variant="primary" className="w-full"><Phone className="w-4 h-4 mr-2" />(03) 9391 3257</Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA service={service} />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-off-white)' }}>
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-navy)' }}>Other Services You Might Be Interested In</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3).map((relatedService) => (
              <Card key={relatedService.id} className="p-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>{relatedService.title}</h3>
                <p className="text-sm text-[var(--color-gray-600)] mb-4">{relatedService.shortDescription}</p>
                <Link to={`/health-services/${relatedService.slug}`} className="text-sm font-medium hover:underline" style={{ color: 'var(--color-red)' }}>Learn more →</Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
