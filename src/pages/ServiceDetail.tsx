import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Check, Calendar, Star, ArrowRight } from 'lucide-react'
import { getServiceBySlug, services, serviceCategories, type Service } from '../data/services'
import { SERVICE_SLUG_MAP } from '../data/serviceSlugMapping'
import { healthServiceGroups } from '../data/healthServicesNav'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { BrandSignature } from '../components/layout/BrandSignature'
import { applySeo } from '../lib/seo'
import './ServiceDetail.css'

interface ServiceDetailProps {
  slugOverride?: string // For hub page overview
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getNavServiceTitle(slug: string): string {
  for (const group of healthServiceGroups) {
    for (const item of group.items) {
      const key = item.href.replace(/^\/health-services\//, '')
      if (key === slug) return item.title
    }
  }
  return titleFromSlug(slug)
}

export default function ServiceDetail({ slugOverride }: ServiceDetailProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = slugOverride || routeSlug

  const service = useMemo<Service | null>(() => {
    if (!slug || slug === 'hub') return null

    const directMatch = getServiceBySlug(slug)
    if (directMatch) return directMatch

    const mappedSlug = SERVICE_SLUG_MAP[slug]
    if (mappedSlug) {
      const mappedMatch = getServiceBySlug(mappedSlug)
      if (mappedMatch) return mappedMatch
    }

    return services.find(
      (item) => item.slug.toLowerCase() === slug.toLowerCase() || item.id.toLowerCase() === slug.toLowerCase()
    ) || null
  }, [slug])

  useEffect(() => {
    if (!slug) return

    window.scrollTo(0, 0)

    const title = slug === 'hub'
      ? 'Health Services | Blackshaws Road Pharmacy'
      : service
        ? `${service.title} | Blackshaws Road Pharmacy`
        : `${getNavServiceTitle(slug)} | Blackshaws Road Pharmacy`

    const description = slug === 'hub'
      ? 'Explore health services at Blackshaws Road Pharmacy in Altona North including vaccinations, health checks, medication reviews, diabetes support, and more. Call (03) 9391 3257 to book.'
      : service
        ? `${service.title} at Blackshaws Road Pharmacy, Altona North. ${service.shortDescription} ${service.isFree ? 'Free or bulk-billed.' : service.cost}`
        : `${getNavServiceTitle(slug)} services at Blackshaws Road Pharmacy in Altona North. Our pharmacists provide professional healthcare support. Call (03) 9391 3257.`

    applySeo({
      title,
      description,
      robots: service || slug === 'hub' ? 'index, follow' : 'noindex, nofollow',
      canonicalPath: slug === 'hub' ? '/health-services' : `/health-services/${slug}`,
    })
  }, [service, slug])

  // For hub overview page
  if (slug === 'hub' || !slug) {
    return <HealthServicesHub />
  }

  // Service not found — show intelligent fallback
  if (!service) {
    const navTitle = getNavServiceTitle(slug)
    return (
      <ServiceStubPage title={navTitle} />
    )
  }

  const categoryInfo = serviceCategories[service.category]

  return (
    <div className="service-detail-page bg-[var(--color-cream)]">
      {/* Hero */}
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom">
          <div className="mb-6">
            <Link to="/health-services" className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">{categoryInfo.title.toUpperCase()}</p>
              <h1 className="text-clamp-2xl-4xl mb-6 text-white">{service.title}</h1>
              <p className="text-lg mb-6 text-white/80 leading-relaxed">{service.shortDescription}</p>

              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white/10 text-white border border-white/15">
                {service.isFree ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-[var(--color-sage)]" />
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
                <a href="tel:0393913257">
                  <Button variant="red" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (03) 9391 3257
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-[var(--color-navy)]">
                    Enquire Online
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <BrandSignature tone="dark" className="max-w-md opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>About This Service</h2>
                <div className="prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
                  {service.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-navy)' }}>
                  <Star className="w-6 h-6 mr-3 text-[var(--color-red)]" />
                  Who Is This For?
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{service.whoIsItFor}</p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-navy)' }}>
                  <Calendar className="w-6 h-6 mr-3 text-[var(--color-red)]" />
                  What to Expect
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{service.whatToExpect}</p>
              </Card>

              {service.tags.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>Related Topics</h2>
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full text-sm bg-[var(--color-navy-soft)] text-[var(--color-navy)] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 sticky top-28">
                <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--color-navy)' }}>Service Details</h3>
                <div className="space-y-4 pb-6 border-b border-[var(--color-border)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-1">Cost</p>
                    <p className="font-semibold text-[var(--color-navy)]">{service.cost}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-1">How to Access</p>
                    <p className="font-medium text-[var(--color-navy)]">{service.bookingCTA}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-1">Category</p>
                    <p className="font-medium text-[var(--color-navy)]">{categoryInfo.title}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a href="tel:0393913257" className="block">
                    <Button variant="primary" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call (03) 9391 3257
                    </Button>
                  </a>
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Send an Enquiry
                    </Button>
                  </Link>
                </div>

                <p className="mt-5 text-xs text-[var(--color-text-muted)] text-center">
                  For urgent medical concerns, call 000 or visit your GP.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-navy)]">Other Services You Might Be Interested In</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.category === service.category && s.id !== service.id)
              .slice(0, 3)
              .map((relatedService) => (
                <Card key={relatedService.id} className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-navy)]">{relatedService.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">{relatedService.shortDescription}</p>
                  <Link to={`/health-services/${relatedService.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-red)] hover:underline">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticlesSection serviceSlug={service.slug} />
    </div>
  )
}

/**
 * Related Articles Section — shows relevant health library articles
 * at the bottom of service pages for content enrichment and SEO.
 */
function RelatedArticlesSection({ serviceSlug }: { serviceSlug: string }) {
  // Map service slugs to related article slugs
  const ARTICLE_MAP: Record<string, string[]> = {
    'blood-pressure-check': ['managing-high-blood-pressure'],
    'hypertension-management': ['managing-high-blood-pressure'],
    'flu-vaccination': ['flu-vaccination-why-annual'],
    'vaccinations': ['flu-vaccination-why-annual'],
    'medscheck': ['what-is-medscheck'],
    'diabetes-medscheck': ['what-is-medscheck', 'managing-high-blood-pressure'],
    'diabetes-management': ['managing-high-blood-pressure', 'what-is-medscheck'],
    'asthma-management': [],
    'wound-care': ['when-to-see-pharmacist-vs-gp'],
    'contraceptive-pill': ['when-to-see-pharmacist-vs-gp'],
    'uti-treatment': ['when-to-see-pharmacist-vs-gp'],
    'travel-vaccinations': ['flu-vaccination-why-annual'],
    'travel-health': ['flu-vaccination-why-annual'],
    'pain-support': [],
    'pregnancy-testing': [],
    'skin-health': [],
    'skincare-consultations': [],
    'aged-care-services': ['when-to-see-pharmacist-vs-gp'],
    'dose-administration-aids': ['what-is-medscheck'],
    'prescription-reviews': ['what-is-medscheck', 'understanding-your-prescription'],
    'escripts': ['understanding-your-prescription'],
    'absence-certificates': ['when-to-see-pharmacist-vs-gp'],
    'out-of-hospital': ['when-to-see-pharmacist-vs-gp'],
    'mens-health': [],
    'baby-breastfeeding': [],
    'minor-ailments': ['when-to-see-pharmacist-vs-gp'],
    'health-checks': ['managing-high-blood-pressure'],
    'ndis-support': [],
  }

  const relatedArticleSlugs = ARTICLE_MAP[serviceSlug] || []

  const articles = [
    {
      slug: 'when-to-see-pharmacist-vs-gp',
      title: 'When Should You See a Pharmacist vs. a GP?',
      excerpt: 'Not sure whether your symptoms need a doctor or whether a pharmacist can help? This guide explains the right care pathway.',
      category: 'General Health',
    },
    {
      slug: 'flu-vaccination-why-annual',
      title: 'Flu Vaccination: Why Annual Shots Matter',
      excerpt: 'The flu virus changes every year. Learn how the vaccine works, who should get it, and why timing matters.',
      category: 'Preventive Health',
    },
    {
      slug: 'managing-high-blood-pressure',
      title: 'Managing High Blood Pressure at Home',
      excerpt: 'High blood pressure affects one in three Australian adults. Discover practical lifestyle changes and monitoring tips.',
      category: 'Chronic Conditions',
    },
    {
      slug: 'what-is-medscheck',
      title: 'What Is MedsCheck and Who Qualifies?',
      excerpt: 'MedsCheck is a free, government-funded medication review service. Find out who is eligible and what happens.',
      category: 'Medication Management',
    },
    {
      slug: 'understanding-your-prescription',
      title: 'Understanding Your Prescription: A Patient\'s Guide',
      excerpt: 'Confused by the instructions on your prescription label? This guide breaks down common terminology and dosing.',
      category: 'Medication Management',
    },
  ]

  const relatedArticles = articles.filter((a) => relatedArticleSlugs.includes(a.slug))

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Related Health Articles</h2>
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">Further reading from our health library</p>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/learn/${article.slug}`}
              className="group block rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 shadow-[0_20px_50px_-40px_rgba(16,24,63,0.18)] transition-all hover:shadow-lg"
            >
              <span className="inline-block rounded-full bg-[var(--color-red-soft)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-red)]">
                {article.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)] transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)]">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Health Services Hub Page — index/overview of all services
 */
function HealthServicesHub() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Health Services</p>
          <h1 className="text-white">Comprehensive pharmacy care for Altona North and surrounds.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            From preventive health checks to medication management, chronic disease support,
            and specialised care pathways — our pharmacy team provides accessible,
            professional healthcare services seven days a week.
          </p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {healthServiceGroups.map((group) => (
              <Card key={group.id} className="p-6">
                <h3 className="text-lg font-bold mb-4 text-[var(--color-navy)]">
                  {group.heading}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const serviceSlug = item.href.replace(/^\/health-services\//, '')
                    const hasRealContent = SERVICE_SLUG_MAP[serviceSlug] || getServiceBySlug(serviceSlug)
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className={`group flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--color-navy-soft)] ${
                            hasRealContent ? 'text-[var(--color-navy)] font-medium' : 'text-[var(--color-text-muted)]'
                          }`}
                        >
                          <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${hasRealContent ? 'text-[var(--color-red)]' : 'text-[var(--color-text-muted)]'}`} />
                          <span>{item.title}</span>
                          {!hasRealContent && <span className="ml-auto text-[10px] text-[var(--color-text-muted)]">Info coming soon</span>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row items-center justify-center">
            <a href="tel:0393913257">
              <Button variant="red" size="lg">
                <Phone className="mr-2 h-5 w-5" /> Call (03) 9391 3257
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Send an Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Stub page for services not yet fully built out
 */
function ServiceStubPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Health Services</p>
          <h1 className="text-white">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            Our pharmacy team at Blackshaws Road Pharmacy provides {title.toLowerCase()} support to patients
            in Altona North and surrounding suburbs. For detailed information, eligibility, and booking,
            please speak with our pharmacists directly.
          </p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <Card className="p-8 md:p-10">
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
              Detailed online information for this service is being prepared. In the meantime,
              our pharmacists can provide personalised guidance, explain how the service works,
              check your eligibility, and help you access the right care pathway.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              This information is general in nature and does not substitute for professional medical advice.
              Please consult your pharmacist or GP for guidance specific to your situation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:0393913257">
                <Button variant="red">
                  <Phone className="mr-2 h-4 w-4" /> Call (03) 9391 3257
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline">
                  Send an Enquiry <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
