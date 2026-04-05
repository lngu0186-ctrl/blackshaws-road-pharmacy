import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock3, Calendar, Share2, Check } from 'lucide-react'
import { BrandSignature } from '../components/layout/BrandSignature'
import { learnArticlesBySlug } from '../data/learnArticles'
import { usePageSeo } from '../lib/seo'

export default function LearnArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = useMemo(() => (slug ? learnArticlesBySlug[slug] ?? null : null), [slug])
  const [shareCopied, setShareCopied] = useState(false)

  usePageSeo(
    article
      ? {
          title: `${article.title} | Blackshaws Road Pharmacy`,
          description: article.excerpt,
          canonicalPath: `/learn/${article.slug}`,
          ogTitle: article.title,
          ogDescription: article.excerpt,
        }
      : {
          title: 'Article Not Found | Blackshaws Road Pharmacy',
          description: 'The health article you were looking for could not be found.',
          robots: 'noindex, nofollow',
          canonicalPath: '/learn',
        },
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!shareCopied) return
    const timer = window.setTimeout(() => setShareCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [shareCopied])

  const handleShare = async () => {
    if (!article) return

    const shareUrl = `${window.location.origin}/learn/${article.slug}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        })
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setShareCopied(true)
    } catch {
      // no-op: user cancelled native share or clipboard unavailable
    }
  }

  if (!article) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="py-20 text-center">
            <h1 className="mb-4 text-2xl font-bold text-[var(--color-navy)]">Article Not Found</h1>
            <p className="mb-6 text-[var(--color-text-muted)]">
              The article you're looking for doesn't exist or hasn't been published yet.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-deep)]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Health Library
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="container-custom py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Link to="/" className="hover:text-[var(--color-navy)]">
            Home
          </Link>
          <span>/</span>
          <Link to="/learn" className="hover:text-[var(--color-navy)]">
            Health Library
          </Link>
          <span>/</span>
          <span className="truncate font-medium text-[var(--color-navy)]">{article.title}</span>
        </nav>
      </div>

      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-4xl">
          <span className="inline-block rounded-full bg-[var(--color-red)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]">
            {article.category}
          </span>
          <h1 className="mt-5 text-white">{article.title}</h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />{' '}
              {new Date(article.date).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" /> {article.readTime}
            </span>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{article.excerpt}</p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <article
            className="prose prose-lg max-w-none prose-headings:text-[var(--color-navy)] prose-a:text-[var(--color-red)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--color-navy)]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy-soft)]"
                >
                  {shareCopied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {shareCopied ? 'Link copied' : 'Share this article'}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:0393913257"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-red-hover)]"
                >
                  Call (03) 9391 3257
                </a>
                <Link
                  to="/learn"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy-soft)]"
                >
                  <ArrowLeft className="h-4 w-4" /> More articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
