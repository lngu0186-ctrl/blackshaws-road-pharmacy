import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { healthServiceGroups } from '../data/healthServicesNav'
import { Button } from '../components/ui/Button'
import { Phone, ArrowRight } from 'lucide-react'
import { BrandSignature } from '../components/layout/BrandSignature'

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function HealthServicePlaceholder() {
  const { slug } = useParams<{ slug?: string }>()

  const allItems: Record<string, { title: string }> = {}
  healthServiceGroups.forEach((group) => {
    group.items.forEach((item) => {
      const key = item.href.replace(/^\/health-services\//, '')
      allItems[key] = { title: item.title }
    })
  })

  const isOverview = !slug
  const serviceName = slug ? allItems[slug]?.title || titleFromSlug(slug) : 'Health Services'
  const heroTitle = isOverview ? 'Health Services' : serviceName
  const subheading = isOverview
    ? "We're here to help with pharmacy health services — talk to our team for personalised advice."
    : `We're here to help with ${serviceName.toLowerCase()} — talk to our team for personalised advice.`
  const body = isOverview
    ? 'Blackshaws Road Pharmacy provides a range of health services for patients in Altona North and surrounding suburbs. For more information or to discuss your needs, please contact us.'
    : `Our pharmacists at Blackshaws Road Pharmacy provide ${serviceName.toLowerCase()} support to patients in Altona North and surrounding suburbs. For more information or to discuss your needs, please contact us.`

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${heroTitle} | Blackshaws Road Pharmacy`

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      document.head.appendChild(metaRobots)
    }
    metaRobots.content = 'noindex, nofollow'
  }, [heroTitle])

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Health Services</p>
          <h1 className="text-white">{heroTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">{subheading}</p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] md:p-10">
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">{body}</p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">This information is general in nature and does not substitute for professional medical advice. Please consult your pharmacist or GP.</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="primary">
                  Contact our pharmacy team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:0393913257">
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" /> (03) 9391 3257
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
