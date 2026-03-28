import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, Search, X, Home, Grid, List } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../context/ToastContext'
import { getAllProducts, type Product } from '../services/shopify'
import {
  getAllCategories,
  classifyProduct,
  formatPrice,
  getProductImageUrl,
  isOnSale,
  getSalePrice,
  buildCategoryIndex,
} from '../utils/categoryMapping'
import { Button } from '../components/ui/Button'
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        console.log(`Fetched ${data.length} products from Shopify`)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Unable to load products. Please try again later.')
        showToast('Failed to load products', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [showToast])

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

    if (selectedCategoryPath) {
      result = result.filter(p => classifyProduct(p).includes(selectedCategoryPath))
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.vendor.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query)) ||
          p.productType.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount))
        break
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
        break
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      default:
        break
    }

    return result
  }, [products, selectedCategoryPath, searchQuery, sortBy])

  const totalFiltered = filteredProducts.length
  const paginatedProducts = useMemo(() => {
    const end = currentPage * PRODUCTS_PER_PAGE
    return filteredProducts.slice(0, end)
  }, [filteredProducts, currentPage])

  const allCategories = useMemo(() => getAllCategories(), [])
  const categoryIndex = useMemo(() => buildCategoryIndex(products), [products])

  const getCategoryCount = (categoryId: string): number => {
    const entry = categoryIndex.get(categoryId)
    return entry ? entry.count : 0
  }

  const handleCategoryClick = (path: string) => {
    setSelectedCategoryPath(path)
    setCurrentPage(1)
  }
  const handleClearCategory = () => {
    setSelectedCategoryPath('')
    setCurrentPage(1)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handleAddToCart = async (product: Product) => {
    const firstVariant = product.variants.edges[0]?.node
    if (!firstVariant) return
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    })
    openCart()
  }

  if (loading) {
    return (
      <div className="shop-page bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="text-center py-20">
            <p className="text-[var(--color-gray-600)]">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="shop-page bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="shop-page bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--color-gray-200)' }}>
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="section-label mb-2" style={{ color: 'var(--color-navy)' }}>ONLINE PHARMACY</p>
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-navy)' }}>
                Shop Online
              </h1>
              <p className="text-[var(--color-gray-600)] mt-2">
                {products.length} products • Sorted by: {sortBy === 'featured' ? 'Featured' : sortBy.replace('-', ' ')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border sticky top-24" style={{ borderColor: 'var(--color-gray-200)' }}>
              <div className="mb-4">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleClearCategory}>
                  All Products ({products.length})
                </Button>
              </div>
              <nav className="space-y-1">
                {allCategories.map(category => {
                  const count = getCategoryCount(category.id)
                  const hasSubs = category.subcategories.length > 0
                  const isSelected = selectedCategoryPath === category.id

                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => !hasSubs && handleCategoryClick(category.id)}
                        className={`category-btn ${isSelected ? 'active' : ''}`}
                      >
                        <span className="truncate">{category.label}</span>
                        <span className="count">({count})</span>
                      </button>
                      {hasSubs && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map(sub => {
                            const subPath = `${category.id}/${sub.id}`
                            const subEntry = categoryIndex.get(subPath)
                            const subCount = subEntry ? subEntry.count : 0
                            const subSelected = selectedCategoryPath === subPath
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleCategoryClick(subPath)}
                                className={`category-btn subcategory-btn ${subSelected ? 'active' : ''}`}
                              >
                                <span className="truncate">{sub.label}</span>
                                <span className="count">({subCount})</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile controls */}
            <div className="md:hidden mb-6 space-y-4">
              <div className="mobile-category-pills">
                <button
                  onClick={handleClearCategory}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${!selectedCategoryPath ? 'bg-red-600 text-white' : 'bg-white border'}`}
                  style={{ borderColor: 'var(--color-gray-200)' }}
                >
                  All ({products.length})
                </button>
                {allCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategoryPath === cat.id ? 'bg-red-600 text-white' : 'bg-white border'}`}
                    style={{ borderColor: 'var(--color-gray-200)' }}
                  >
                    {cat.label} ({getCategoryCount(cat.id)})
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--color-gray-200)' }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none"
                  style={{ borderColor: 'var(--color-gray-200)' }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price Low→High</option>
                  <option value="price-desc">Price High→Low</option>
                  <option value="title-asc">A-Z</option>
                  <option value="title-desc">Z-A</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(true)}>
                  Filters
                </Button>
              </div>
            </div>

            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--color-gray-200)' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2.5 rounded-xl border focus:outline-none bg-white"
                  style={{ borderColor: 'var(--color-gray-200)' }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="title-asc">A-Z</option>
                  <option value="title-desc">Z-A</option>
                </select>
                <div className="flex items-center border rounded-xl" style={{ borderColor: 'var(--color-gray-200)' }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 ${viewMode === 'grid' ? 'bg-red-50 text-red-600' : 'text-gray-500'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 ${viewMode === 'list' ? 'bg-red-50 text-red-600' : 'text-gray-500'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(searchQuery || selectedCategoryPath) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategoryPath && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-red-50 text-red-700">
                    {(() => {
                      const [catId, subId] = selectedCategoryPath.split('/')
                      const cat = allCategories.find(c => c.id === catId)
                      const sub = cat?.subcategories.find(s => s.id === subId)
                      return sub ? `${cat?.label} > ${sub.label}` : cat?.label
                    })()}
                    <button onClick={handleClearCategory}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-red-50 text-red-700">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-[var(--color-gray-600)]">
                Showing <strong>{paginatedProducts.length}</strong> of <strong>{totalFiltered}</strong> products
              </p>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border" style={{ borderColor: 'var(--color-gray-200)' }}>
                <p className="text-[var(--color-gray-600)] mb-4">No products match your criteria.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategoryPath(''); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={`products-grid ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                  {paginatedProducts.map(product => {
                    const firstVariant = product.variants.edges[0]?.node
                    const imageUrl = getProductImageUrl(product, 600, 600)
                    const isAvailable = firstVariant?.availableForSale ?? true
                    const onSale = isOnSale(product)
                    const salePrice = onSale ? getSalePrice(product) : null
                    const regularPrice = product.priceRange.minVariantPrice

                    return (
                      <Link
                        key={product.id}
                        to={`/shop/${product.handle}`}
                        className="product-card group"
                      >
                        <div className={`product-image-container ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}`}>
                          <img
                            src={imageUrl}
                            alt={product.images?.edges[0]?.node?.altText || product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {onSale && <span className="sale-badge">Sale</span>}
                          {!isAvailable && (
                            <div className="out-of-stock">
                              <span className="text-white font-semibold text-sm bg-red-600 px-3 py-1 rounded">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        <div className={`p-5 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div className="flex-1">
                            <p className="text-xs text-[var(--color-gray-500)] mb-1 uppercase tracking-wide">{product.vendor}</p>
                            <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-red-600 transition-colors product-title">
                              {product.title}
                            </h3>
                            <p className="text-sm text-[var(--color-gray-600)] line-clamp-2 mb-4">
                              {product.description.replace(/<[^>]*>/g, '').slice(0, 100)}...
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-4 mt-auto">
                            <div>
                              {onSale && salePrice ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold" style={{ color: 'var(--color-red)' }}>
                                    {formatPrice(salePrice.amount, salePrice.currencyCode)}
                                  </span>
                                  <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(regularPrice.amount, regularPrice.currencyCode)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold" style={{ color: 'var(--color-navy)' }}>
                                  {formatPrice(regularPrice.amount, regularPrice.currencyCode)}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault()
                                handleAddToCart(product)
                              }}
                              disabled={!isAvailable}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Load More */}
                {paginatedProducts.length < totalFiltered && (
                  <div className="mt-10 text-center">
                    <Button variant="outline" size="lg" onClick={handleLoadMore}>
                      Load More Products
                    </Button>
                    <p className="text-sm text-[var(--color-gray-500)] mt-2">
                      Showing {paginatedProducts.length} of {totalFiltered}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>Categories</h2>
                <button onClick={() => setShowMobileFilters(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => { handleClearCategory(); setShowMobileFilters(false); }}
                  className={`category-btn w-full ${!selectedCategoryPath ? 'active' : ''}`}
                >
                  All Products ({products.length})
                </button>
                {allCategories.map(cat => {
                  const count = getCategoryCount(cat.id)
                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => { handleCategoryClick(cat.id); setShowMobileFilters(false); }}
                        className={`category-btn ${selectedCategoryPath === cat.id ? 'active' : ''} `}
                      >
                        <span>{cat.label}</span>
                        <span className="count">({count})</span>
                      </button>
                      {cat.subcategories.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {cat.subcategories.map(sub => {
                            const subPath = `${cat.id}/${sub.id}`
                            const subEntry = categoryIndex.get(subPath)
                            const subCount = subEntry ? subEntry.count : 0
                            return (
                              <button
                                key={sub.id}
                                onClick={() => { handleCategoryClick(subPath); setShowMobileFilters(false); }}
                                className={`category-btn subcategory-btn ${selectedCategoryPath === subPath ? 'active' : ''}`}
                              >
                                <span>{sub.label}</span>
                                <span className="count">({subCount})</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
