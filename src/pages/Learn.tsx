import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Calendar } from 'lucide-react'
import { BrandSignature } from '../components/layout/BrandSignature'
import { learnArticles } from '../data/learnArticles'
import { usePageSeo } from '../lib/seo'

const categories = [...new Set(learnArticles.map((a) => a.category))]

export default function Learn() {
  usePageSeo({
    title: 'Health Library | Blackshaws Road Pharmacy',
    description:
      'Health articles, guides and resources from Blackshaws Road Pharmacy in Altona North. Learn about medications, preventive health, chronic conditions, and when to see a pharmacist vs. GP.',
    canonicalPath: '/learn',
  })

  return (
    <div className="bg-[var(--color-cream)]">
      {/* Hero */}
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-5xl">
          <p className="section-label !text-white/70">Health Library</p>
          <h1 className="text-white">Practical health guidance from your local pharmacy team.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            Evidence-based articles on medications, preventive care, chronic conditions, and
            everyday health questions — written by pharmacists for our Altona North community.
          </p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white">
              All Topics
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex cursor-pointer items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learnArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/learn/${article.slug}`}
                className="group block rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] transition-all hover:shadow-lg"
              >
                <span className="inline-block rounded-full bg-[var(--color-red-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-red)]">
                  {article.category}
                </span>
                <h2 className="mt-4 line-clamp-2 text-xl font-semibold text-[var(--color-navy)] transition-colors group-hover:text-[var(--color-red)]">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)]">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-[var(--color-navy)]">Can't find what you're looking for?</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Our pharmacists are happy to answer health questions in person or over the phone.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:0393913257"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-red-hover)]"
            >
              <ArrowRight className="h-4 w-4 -rotate-90" /> Call (03) 9391 3257
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy-soft)]"
            >
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
