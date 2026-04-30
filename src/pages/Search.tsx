import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, ArrowRight, BookOpen, Stethoscope, ShoppingBag } from 'lucide-react'
import { learnArticles } from '../data/learnArticles'
import { healthServiceGroups } from '../data/healthServicesNav'
import { getAllProducts, type Product } from '../services/shopify'
import { useProductStore } from '../stores/productStore'
import { formatPrice, getProductImageUrl } from '../utils/categoryMapping'
import { usePageSeo } from '../lib/seo'

interface ServiceResult {
  title: string
  href: string
  group: string
}

const allServices: ServiceResult[] = healthServiceGroups.flatMap((g) =>
  g.items.map((i) => ({ title: i.title, href: i.href, group: g.heading }))
)

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = searchParams.get('q') || ''
  const [query, setQuery] = useState(initial)
  const [committed, setCommitted] = useState(initial)
  const cachedProducts = useProductStore((s) => s.products)
  const setGlobalProducts = useProductStore((s) => s.setProducts)
  const [products, setProducts] = useState<Product[]>(cachedProducts)
  const [loadingProducts, setLoadingProducts] = useState(cachedProducts.length === 0)

  usePageSeo({
    title: committed ? `Search: ${committed} | Blackshaws Road Pharmacy` : 'Search | Blackshaws Road Pharmacy',
    description: 'Search articles, health services, and products from Blackshaws Road Pharmacy.',
    canonicalPath: '/search',
  })

  useEffect(() => {
    setQuery(initial)
    setCommitted(initial)
  }, [initial])

  useEffect(() => {
    if (cachedProducts.length > 0) {
      setProducts(cachedProducts)
      setLoadingProducts(false)
      return
    }
    let active = true
    getAllProducts()
      .then((data) => {
        if (!active) return
        setProducts(data)
        setGlobalProducts(data)
      })
      .catch((err) => console.error('Search: product load failed', err))
      .finally(() => {
        if (active) setLoadingProducts(false)
      })
    return () => {
      active = false
    }
  }, [cachedProducts, setGlobalProducts])

  const q = committed.trim().toLowerCase()

  const articleResults = useMemo(() => {
    if (!q) return []
    return learnArticles.filter((a) => {
      const haystack = `${a.title} ${a.excerpt} ${a.category} ${stripHtml(a.content)}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [q])

  const serviceResults = useMemo(() => {
    if (!q) return []
    return allServices.filter((s) => `${s.title} ${s.group}`.toLowerCase().includes(q))
  }, [q])

  const productResults = useMemo(() => {
    if (!q) return []
    return products.filter((p) =>
      `${p.title} ${p.description} ${p.vendor} ${p.productType} ${p.tags.join(' ')}`.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [products, q])

  const totalResults = articleResults.length + serviceResults.length + productResults.length

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    setCommitted(trimmed)
    setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true })
  }

  return (
    <div className="bg-[var(--color-cream)] min-h-screen">
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-4xl">
          <p className="section-label !text-white/70">Search</p>
          <h1 className="text-white">Find what you need</h1>
          <p className="mt-4 text-white/75">Search articles, health services, and shop products.</p>
          <form onSubmit={handleSubmit} className="mt-8 flex items-center gap-2 rounded-full bg-white p-2 shadow-lg">
            <SearchIcon className="ml-3 h-5 w-5 text-[var(--color-navy)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. vitamin D, vaccinations, UTI…"
              autoFocus
              aria-label="Search the site"
              className="flex-1 bg-transparent px-2 py-2 text-base text-[var(--color-navy)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--color-red)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-red-hover)]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          {!committed ? (
            <p className="text-[var(--color-text-muted)]">Type a term above to begin.</p>
          ) : (
            <>
              <p className="mb-8 text-sm text-[var(--color-text-muted)]">
                {loadingProducts && productResults.length === 0
                  ? 'Searching…'
                  : `${totalResults} result${totalResults === 1 ? '' : 's'} for `}
                {!loadingProducts || productResults.length > 0 ? <strong className="text-[var(--color-navy)]">"{committed}"</strong> : null}
              </p>

              {totalResults === 0 && !loadingProducts && (
                <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-8 text-center">
                  <p className="text-[var(--color-navy)] font-semibold">No matches found.</p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Try a different keyword, or <Link to="/contact" className="text-[var(--color-red)] underline">contact us</Link> for help.
                  </p>
                </div>
              )}

              {serviceResults.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--color-navy)]">
                    <Stethoscope className="h-5 w-5 text-[var(--color-red)]" /> Health Services ({serviceResults.length})
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceResults.map((s) => (
                      <Link
                        key={s.href + s.title}
                        to={s.href}
                        className="group flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 transition-colors hover:bg-[var(--color-navy-soft)]"
                      >
                        <div>
                          <p className="font-semibold text-[var(--color-navy)]">{s.title}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{s.group}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[var(--color-navy)] opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {articleResults.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--color-navy)]">
                    <BookOpen className="h-5 w-5 text-[var(--color-red)]" /> Health Library ({articleResults.length})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {articleResults.map((a) => (
                      <Link
                        key={a.slug}
                        to={`/learn/${a.slug}`}
                        className="group block rounded-[24px] border border-[var(--color-border)] bg-white p-5 transition-shadow hover:shadow-lg"
                      >
                        <span className="inline-block rounded-full bg-[var(--color-red-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-red)]">
                          {a.category}
                        </span>
                        <h3 className="mt-3 font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)]">{a.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">{a.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {productResults.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--color-navy)]">
                    <ShoppingBag className="h-5 w-5 text-[var(--color-red)]" /> Shop ({productResults.length}
                    {productResults.length === 12 ? '+' : ''})
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {productResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/shop/${p.handle}`}
                        className="group block overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-white transition-shadow hover:shadow-lg"
                      >
                        <div className="aspect-square overflow-hidden bg-[var(--color-navy-soft)]">
                          <img
                            src={getProductImageUrl(p)}
                            alt={p.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="line-clamp-2 text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)]">{p.title}</p>
                          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {productResults.length === 12 && (
                    <div className="mt-4">
                      <Link
                        to={`/shop?q=${encodeURIComponent(committed)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-red)] hover:underline"
                      >
                        See all matching products in the shop <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
