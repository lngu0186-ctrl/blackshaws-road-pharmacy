import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, Search, X, Grid, List, SlidersHorizontal } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../context/ToastContext'
import { getAllProducts, type Product } from '../services/shopify'
import { getAllCategories, classifyProduct, formatPrice, getProductImageUrl, isOnSale, getSalePrice, buildCategoryIndex } from '../utils/categoryMapping'
import { useProductStore } from '../stores/productStore'
import { Button } from '../components/ui/Button'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { BrandSignature } from '../components/layout/BrandSignature'
import './Shop.css'

const PRODUCTS_PER_PAGE = 48

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string>(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const { showToast } = useToast()
  const { setProducts: setGlobalProducts } = useProductStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        setGlobalProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Unable to load products. Please try again later.')
        showToast('Failed to load products', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [showToast, setGlobalProducts])

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategoryPath) params.set('category', selectedCategoryPath)
    if (sortBy !== 'featured') params.set('sort', sortBy)
    if (currentPage > 1) params.set('page', currentPage.toString())
    setSearchParams(params, { replace: true })
  }, [searchQuery, selectedCategoryPath, sortBy, currentPage, setSearchParams])

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10)
    if (pageParam >= 1) setCurrentPage(pageParam)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (selectedCategoryPath) result = result.filter((p) => classifyProduct(p).includes(selectedCategoryPath))
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.vendor.toLowerCase().includes(query) || p.tags.some((t) => t.toLowerCase().includes(query)) || p.productType.toLowerCase().includes(query))
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)); break
      case 'price-desc': result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)); break
      case 'title-asc': result.sort((a, b) => a.title.localeCompare(b.title)); break
      case 'title-desc': result.sort((a, b) => b.title.localeCompare(a.title)); break
      case 'newest': result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); break
    }
    return result
  }, [products, selectedCategoryPath, searchQuery, sortBy])

  const totalFiltered = filteredProducts.length
  const paginatedProducts = useMemo(() => filteredProducts.slice(0, currentPage * PRODUCTS_PER_PAGE), [filteredProducts, currentPage])
  const allCategories = useMemo(() => getAllCategories(), [])
  const categoryIndex = useMemo(() => buildCategoryIndex(products), [products])
  const getCategoryCount = (categoryId: string): number => categoryIndex.get(categoryId)?.count ?? 0

  const handleCategoryClick = (path: string) => { setSelectedCategoryPath(path); setCurrentPage(1) }
  const handleClearCategory = () => { setSelectedCategoryPath(''); setCurrentPage(1) }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage(1) }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1) }
  const handleLoadMore = () => setCurrentPage((prev) => prev + 1)

  const handleAddToCart = async (product: Product) => {
    const availableVariant = product.variants.edges.find((edge) => edge.node.availableForSale)?.node
    const firstVariant = product.variants.edges[0]?.node
    const variant = availableVariant || firstVariant
    if (!variant) return

    if (product.variants.edges.length > 1) {
      window.location.href = `/shop/${product.handle}`
      return
    }

    if (!variant.availableForSale) {
      showToast('This product is currently out of stock', 'error')
      return
    }

    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions || [] })
    openCart()
  }

  if (loading) return <div className="shop-page min-h-screen bg-[var(--color-cream)]"><div className="container-custom py-20 text-center text-[var(--color-text-muted)]">Loading products…</div></div>
  if (error) return <div className="shop-page min-h-screen bg-[var(--color-cream)]"><div className="container-custom py-20 text-center"><p className="mb-4 text-red-600">{error}</p><Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button></div></div>

  return (
    <div className="shop-page min-h-screen bg-[var(--color-cream)]">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} className="bg-transparent border-b-0" />

      <section className="container-custom pb-8 pt-4">
        <div className="rounded-[34px] bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] px-6 py-8 text-white shadow-[0_30px_90px_-50px_rgba(16,24,63,0.55)] md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-label !text-white/70">Online pharmacy</p>
              <h1 className="text-white">Shop your health essentials.</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/76">Browse a curated selection of pharmacy and wellness products with clearer filters, better search and the reassurance of a trusted local pharmacy behind every order.</p>
              <div className="mt-6">
                <BrandSignature tone="dark" className="max-w-xl" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[`${products.length} total products`, `${totalFiltered} matching now`, 'Pickup and local pharmacy support'].map((item) => <div key={item} className="rounded-[24px] bg-white/10 px-5 py-4 text-sm font-semibold text-white/85">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom pb-16">
        <div className="flex gap-8">
          <aside className="hidden w-72 shrink-0 xl:block">
            <div className="sticky top-28 rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_28px_70px_-48px_rgba(16,24,63,0.25)]">
              <h2 className="text-lg font-semibold text-[var(--color-navy)]">Browse categories</h2>
              <button onClick={handleClearCategory} className={`category-btn ${!selectedCategoryPath ? 'active' : ''}`}>All products <span className="count">({products.length})</span></button>
              <nav className="mt-3 space-y-1">
                {allCategories.map((category) => {
                  const count = getCategoryCount(category.id)
                  const hasSubs = category.subcategories.length > 0
                  const isSelected = selectedCategoryPath === category.id
                  return (
                    <div key={category.id}>
                      <button onClick={() => !hasSubs && handleCategoryClick(category.id)} className={`category-btn ${isSelected ? 'active' : ''}`}>
                        <span className="truncate">{category.label}</span><span className="count">({count})</span>
                      </button>
                      {hasSubs && <div className="ml-4 mt-1 space-y-1">{category.subcategories.map((sub) => {
                        const subPath = `${category.id}/${sub.id}`
                        const subCount = categoryIndex.get(subPath)?.count ?? 0
                        return <button key={sub.id} onClick={() => handleCategoryClick(subPath)} className={`category-btn subcategory-btn ${selectedCategoryPath === subPath ? 'active' : ''}`}><span className="truncate">{sub.label}</span><span className="count">({subCount})</span></button>
                      })}</div>}
                    </div>
                  )
                })}
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            <div className="rounded-[30px] border border-[var(--color-border)] bg-white p-5 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)] md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1 lg:max-w-xl">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search products, brands or concerns" value={searchQuery} onChange={handleSearchChange} className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] py-3 pl-11 pr-10" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-4 w-4" /></button>}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select value={sortBy} onChange={handleSortChange} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm">
                    <option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="title-asc">A-Z</option><option value="title-desc">Z-A</option>
                  </select>
                  <div className="hidden items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-1 md:flex">
                    <button onClick={() => setViewMode('grid')} className={`rounded-full p-2 ${viewMode === 'grid' ? 'bg-white text-[var(--color-red)]' : 'text-gray-500'}`}><Grid className="h-4 w-4" /></button>
                    <button onClick={() => setViewMode('list')} className={`rounded-full p-2 ${viewMode === 'list' ? 'bg-white text-[var(--color-red)]' : 'text-gray-500'}`}><List className="h-4 w-4" /></button>
                  </div>
                  <Button variant="outline" size="sm" className="xl:hidden" onClick={() => setShowMobileFilters(true)}><SlidersHorizontal className="mr-2 h-4 w-4" /> Filters</Button>
                  {selectedCategoryPath && <button onClick={handleClearCategory} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-2 text-sm font-semibold text-[var(--color-red)]">Clear</button>}
                </div>
              </div>

              {(searchQuery || selectedCategoryPath) && <div className="mt-4 flex flex-wrap gap-2">{selectedCategoryPath && <span className="filter-chip">{selectedCategoryPath.replace('/', ' · ')} <button onClick={handleClearCategory}><X className="h-3 w-3" /></button></span>}{searchQuery && <span className="filter-chip">Search: {searchQuery} <button onClick={() => setSearchQuery('')}><X className="h-3 w-3" /></button></span>}</div>}
              <div className="mt-4 text-sm text-[var(--color-text-muted)]">Showing <strong>{paginatedProducts.length}</strong> of <strong>{totalFiltered}</strong> products</div>
            </div>

            <div className={`products-grid mt-8 ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
              {paginatedProducts.map((product) => {
                const imageUrl = getProductImageUrl(product, 600, 600)
                const isAvailable = product.variants.edges.some((edge) => edge.node.availableForSale)
                const onSale = isOnSale(product)
                const salePrice = onSale ? getSalePrice(product) : null
                const regularPrice = product.priceRange.minVariantPrice
                return (
                  <Link key={product.id} to={`/shop/${product.handle}`} className="product-card group overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-white shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
                    <div className={`product-image-container ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}`}>
                      <img src={imageUrl} alt={product.images?.edges[0]?.node?.altText || product.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
                      {onSale && <span className="sale-badge">Sale</span>}
                      {!isAvailable && <div className="out-of-stock"><span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">Out of stock</span></div>}
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex-1">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-red)]">{product.vendor}</p>
                        <h3 className="product-title text-xl font-semibold text-[var(--color-navy)]">{product.title}</h3>
                        <p className="mt-3 line-clamp-2 text-sm text-[var(--color-text-muted)]">{product.description.replace(/<[^>]*>/g, '').slice(0, 120)}...</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
                        <div>
                          {onSale && salePrice ? <div className="flex items-center gap-2"><span className="text-xl font-bold text-[var(--color-red)]">{formatPrice(salePrice.amount, salePrice.currencyCode)}</span><span className="text-sm text-gray-400 line-through">{formatPrice(regularPrice.amount, regularPrice.currencyCode)}</span></div> : <span className="text-xl font-bold text-[var(--color-navy)]">{formatPrice(regularPrice.amount, regularPrice.currencyCode)}</span>}
                        </div>
                        <Button variant="primary" size="sm" className="min-h-11" onClick={(e) => { e.preventDefault(); handleAddToCart(product) }} disabled={!isAvailable}><ShoppingBag className="mr-2 h-4 w-4" /> {product.variants.edges.length > 1 ? 'Choose options' : 'Add'}</Button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {paginatedProducts.length === 0 && <div className="empty-state mt-8"><p className="mb-4 text-[var(--color-text-muted)]">No products match your current filters.</p><Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategoryPath('') }}>Clear filters</Button></div>}
            {paginatedProducts.length < totalFiltered && <div className="mt-10 text-center"><Button variant="outline" size="lg" onClick={handleLoadMore}>Load more products</Button></div>}
          </div>
        </div>
      </div>

      {showMobileFilters && <div className="fixed inset-0 z-50 xl:hidden"><div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} /><div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-semibold text-[var(--color-navy)]">Filters</h2><button onClick={() => setShowMobileFilters(false)}><X className="h-6 w-6" /></button></div><button onClick={() => { handleClearCategory(); setShowMobileFilters(false) }} className={`category-btn ${!selectedCategoryPath ? 'active' : ''}`}>All products <span className="count">({products.length})</span></button><nav className="mt-3 space-y-1">{allCategories.map((cat) => <div key={cat.id}><button onClick={() => { handleCategoryClick(cat.id); setShowMobileFilters(false) }} className={`category-btn ${selectedCategoryPath === cat.id ? 'active' : ''}`}>{cat.label}<span className="count">({getCategoryCount(cat.id)})</span></button></div>)}</nav></div></div>}
    </div>
  )
}
