import { useParams, Link } from 'react-router-dom'
import { healthServiceGroups } from '../data/healthServicesNav'
import { Button } from '../components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'

export default function HealthServicePlaceholder() {
  const { slug } = useParams<{ slug?: string }>()

  // Build a quick lookup map for all service items
  const allItems: Record<string, { title: string }> = {}
  healthServiceGroups.forEach((group) => {
    group.items.forEach((item) => {
      const key = item.href.replace(/^\/health-services\//, '')
      allItems[key] = { title: item.title }
    })
  })

  const isOverview = !slug
  const pageTitle = isOverview
    ? 'Health Services'
    : allItems[slug]?.title || (slug ? slug.replace(/-/g, ' ') : 'Service')
  const pageDescription = isOverview
    ? 'Explore our comprehensive range of pharmacy health services.'
    : `Detailed information about ${pageTitle} is coming soon. Our team is preparing comprehensive content to assist you.`

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <section className="section-padding bg-[var(--color-navy)] text-white">
        <div className="container-custom">
          <p className="section-label !text-white/70">Health Services</p>
          <h1>{pageTitle}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/78">{pageDescription}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-8 text-center">
            <h2 className="text-2xl text-[var(--color-navy)]">Coming Soon</h2>
            <p className="mt-4 max-w-xl mx-auto text-[var(--color-text-muted)]">
              We're currently developing detailed information for this page. In the meantime, explore other health services or contact us directly with any questions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/health-services">
                <Button variant="primary">
                  View all Health Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:0393913257">
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" /> Call the pharmacy
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
