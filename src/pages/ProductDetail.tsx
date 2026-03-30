import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, Check, ArrowLeft, Lock, ShieldCheck } from 'lucide-react'
import { useProductStore } from '../stores/productStore'
import { formatPrice, getProductImageUrl, isOnSale, getSalePrice } from '../utils/categoryMapping'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../context/ToastContext'
import { getProductByHandle, type ShopifyProduct as Product } from '../services/shopify'
import { categorizeProduct, PHARMACY_CATEGORIES } from '../utils/productCategories'
import { Button } from '../components/ui/Button'

interface ProductVariant {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
  sku: string
  selectedOptions: { name: string; value: string }[]
  image?: {
    url: string
    altText: string
    width: number
    height: number
  }
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [imageVisible, setImageVisible] = useState(true)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const isLoading = useCartStore((s) => s.isLoading)
  const { showToast } = useToast()
  const allProducts = useProductStore((s) => s.products)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return
      try {
        setLoading(true)
        const data = await getProductByHandle(handle)
        if (data) {
          setProduct(data)
          const firstAvailable = data.variants.edges.find((edge: { node: ProductVariant }) => edge.node.availableForSale)
          const resolvedVariant = firstAvailable?.node || data.variants.edges[0]?.node || null
          setSelectedVariant(resolvedVariant)
          setSelectedImageUrl(getProductImageUrl(data, 800, 800, resolvedVariant?.image?.url || data.images.edges[0]?.node?.url))
          setError(null)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError('Unable to load product details.')
        showToast('Failed to load product details', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [handle, showToast])

  const productCategories = useMemo(() => (product ? categorizeProduct(product) : []), [product])

  const relatedProducts = useMemo(() => {
    if (!product || allProducts.length === 0) return []

    return allProducts
      .filter((p) => p.id !== product.id)
      .map((p) => {
        const categories = categorizeProduct(p)
        const sameCategory = categories.some((cat) => productCategories.includes(cat))
        return { product: p, sameCategory }
      })
      .filter((item) => item.sameCategory)
      .sort((a, b) => {
        if (a.sameCategory !== b.sameCategory) return a.sameCategory ? -1 : 1
        return a.product.title.localeCompare(b.product.title)
      })
      .slice(0, 4)
      .map((item) => item.product)
  }, [allProducts, product, productCategories])

  useEffect(() => {
    if (!product) return

    const title = `${product.title} | Blackshaws Road Pharmacy`
    const description = product.description.replace(/<[^>]*>/g, '').slice(0, 160) || 'Shop online at Blackshaws Road Pharmacy for quality health products.'
    const image = selectedImageUrl || getProductImageUrl(product, 1200, 630)
    const canonical = `https://blackshawsroadpharmacy.lovable.app/shop/${product.handle}`

    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      document.head.appendChild(metaRobots)
    }
    metaRobots.content = 'index, follow'

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.rel = 'canonical'
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.href = canonical

    const setOgTag = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setOgTag('og:title', product.title)
    setOgTag('og:description', description)
    setOgTag('og:image', image)
    setOgTag('og:url', canonical)
    setOgTag('og:type', 'product')

    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      description: product.description.replace(/<[^>]*>/g, ''),
      image: product.images.edges.map((e) => e.node.url.replace(/^\/\//, 'https://')),
      sku: product.variants.edges[0]?.node.sku || product.handle,
      brand: { '@type': 'Brand', name: product.vendor },
      offers: {
        '@type': 'Offer',
        availability: product.variants.edges[0]?.node.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        price: parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2),
        url: canonical,
      },
    }

    const existingScript = document.getElementById('product-schema')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.id = 'product-schema'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }, [product, selectedImageUrl])

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) return
    try {
      await addItem({
        product,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity,
        selectedOptions: selectedVariant.selectedOptions || [],
      })
      showToast('Item added to cart', 'success')
      openCart()
    } catch (err) {
      console.error('Add to cart failed:', err)
      showToast('Failed to add item to cart. Please try again.', 'error')
    }
  }

  const handleThumbnailSelect = (imageUrl: string) => {
    setImageVisible(false)
    window.setTimeout(() => {
      setSelectedImageUrl(imageUrl)
      setImageVisible(true)
    }, 150)
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <p className="text-[var(--color-gray-600)]">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-navy)' }}>Product Not Found</h1>
            <p className="text-[var(--color-gray-600)] mb-6">{error || 'The product you are looking for does not exist or has been removed.'}</p>
            <Link to="/shop"><Button variant="primary">Browse All Products</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  const hasVariants = product.variants.edges.length > 1
  const onSale = isOnSale(product)
  const salePrice = onSale ? getSalePrice(product) : null
  const regularPrice = product.priceRange.minVariantPrice
  const mainImage = selectedImageUrl || getProductImageUrl(product, 800, 800, selectedVariant?.image?.url || undefined)

  const categorySlug = productCategories.length > 0 ? productCategories[0] : null
  const categoryName = categorySlug ? PHARMACY_CATEGORIES.find((c) => c.id === categorySlug)?.name : 'Shop'

  const galleryImages = product.images.edges.slice(0, 4).map((img) => ({
    url: getProductImageUrl(product, 150, 150, img.node.url),
    fullUrl: getProductImageUrl(product, 800, 800, img.node.url),
    alt: img.node.altText || product.title,
  }))

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link to="/" className="text-gray-500 hover:text-red-600 transition-colors">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link to="/shop" className="text-gray-500 hover:text-red-600 transition-colors">Shop</Link></li>
            {categorySlug && (
              <>
                <li className="text-gray-400">/</li>
                <li><Link to={`/shop?category=${categorySlug}`} className="text-gray-500 hover:text-red-600 transition-colors">{categoryName}</Link></li>
              </>
            )}
            <li className="text-gray-400">/</li>
            <li className="font-medium truncate max-w-[200px]" style={{ color: 'var(--color-navy)' }}>{product.title}</li>
          </ol>
        </nav>

        <Link to="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <img
                src={mainImage}
                alt={selectedVariant?.image?.altText || product.images?.edges[0]?.node?.altText || product.title}
                className="w-full h-full object-cover transition-opacity duration-150"
                style={{ opacity: imageVisible ? 1 : 0 }}
                loading="eager"
                decoding="sync"
              />
              {onSale && <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">On Sale</span>}
              {!selectedVariant?.availableForSale && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg bg-red-600 px-6 py-3 rounded-lg">Out of Stock</span>
                </div>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => {
                  const isActive = mainImage === img.fullUrl
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleThumbnailSelect(img.fullUrl)}
                      className="aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none"
                      style={{ borderColor: isActive ? '#c0392b' : 'var(--color-gray-200)' }}
                      aria-label={`View ${product.title} image ${idx + 1}`}
                    >
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-gray-500)] mb-2 uppercase tracking-wide">{product.vendor}</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight" style={{ color: 'var(--color-navy)' }}>{product.title}</h1>

            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                {onSale && salePrice ? (
                  <>
                    <span className="text-3xl font-bold" style={{ color: 'var(--color-red)' }}>{formatPrice(salePrice.amount, salePrice.currencyCode)}</span>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(regularPrice.amount, regularPrice.currencyCode)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-navy)' }}>{formatPrice(regularPrice.amount, regularPrice.currencyCode)}</span>
                )}
              </div>
              {product.variants.edges.length > 1 && <p className="text-sm text-[var(--color-gray-500)] mt-2">Price may vary by variant</p>}
            </div>

            <div className="prose prose-sm max-w-none mb-8 text-[var(--color-gray-700)] leading-relaxed" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />

            {hasVariants && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-navy)' }}>Options</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => {
                        setSelectedVariant(node)
                        if (node.image?.url) handleThumbnailSelect(getProductImageUrl(product, 800, 800, node.image.url))
                      }}
                      className={`px-5 py-3 rounded-xl text-sm border transition-all ${selectedVariant?.id === node.id ? 'border-red-600 bg-red-50 text-red-700 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                      disabled={!node.availableForSale}
                      aria-label={`Select ${node.title}`}
                    >
                      {node.title}
                      {!node.availableForSale && ' (Out of Stock)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-navy)' }}>Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 rounded-xl overflow-hidden" style={{ borderColor: 'var(--color-gray-200)' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold" disabled={quantity <= 1} style={{ color: quantity <= 1 ? 'var(--color-gray-300)' : 'var(--color-gray-700)' }} aria-label="Decrease quantity">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input type="text" value={quantity} readOnly className="w-16 text-center font-semibold border-none bg-transparent focus:ring-0" style={{ color: 'var(--color-navy)' }} aria-label="Quantity" />
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold" style={{ color: 'var(--color-gray-700)' }} aria-label="Increase quantity">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {selectedVariant && !selectedVariant.availableForSale && <span className="text-red-600 font-medium">This item is out of stock</span>}
              </div>
            </div>

            <Button variant="primary" size="lg" onClick={handleAddToCart} disabled={!selectedVariant?.availableForSale || isLoading} className="w-full md:w-auto text-lg py-4 px-8">
              <ShoppingBag className="w-5 h-5 mr-3" />
              {isLoading ? 'Adding...' : selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            <p className="text-xs text-gray-500 mt-4 max-w-md leading-relaxed">
              <strong>Therapeutic Goods:</strong> Always read the label. Follow directions for use. If symptoms persist, consult your healthcare practitioner. This product may not be suitable for everyone.
            </p>

            <div className="flex items-center gap-6 mt-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5"><Lock className="w-4 h-4" style={{ color: 'var(--color-navy)' }} /><span>Secure Checkout</span></div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-navy)' }} /><span>AACP Accredited</span></div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gray-50 border" style={{ borderColor: 'var(--color-gray-200)' }}>
              <h4 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-navy)' }}>Product Details</h4>
              <dl className="space-y-3 text-sm">
                {product.vendor && <div className="flex"><dt className="w-32 font-medium text-gray-600">Brand</dt><dd className="flex-1 text-gray-900">{product.vendor}</dd></div>}
                {product.productType && <div className="flex"><dt className="w-32 font-medium text-gray-600">Category</dt><dd className="flex-1 text-gray-900">{product.productType}</dd></div>}
                {selectedVariant?.sku && <div className="flex"><dt className="w-32 font-medium text-gray-600">SKU</dt><dd className="flex-1 text-gray-900 font-mono text-xs">{selectedVariant.sku}</dd></div>}
                {selectedVariant?.availableForSale !== undefined && (
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-600">Availability</dt>
                    <dd className="flex-1"><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${selectedVariant.availableForSale ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedVariant.availableForSale ? 'In Stock' : 'Out of Stock'}</span></dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-red-50 border border-red-100">
              <h4 className="font-semibold mb-3" style={{ color: 'var(--color-red)' }}>Pharmacy Information</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" /><span>This is a genuine product sourced from authorised distributors</span></li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" /><span>Speak to our pharmacists for advice on this product</span></li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" /><span>Free click & collect available from our Altona North store</span></li>
              </ul>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-navy)' }}>You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/shop/${related.handle}`} className="product-card group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img src={getProductImageUrl(related, 300, 300)} alt={related.images?.edges[0]?.node?.altText || related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 mb-2">{related.title}</h3>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-navy)' }}>{formatPrice(related.priceRange.minVariantPrice.amount, related.priceRange.minVariantPrice.currencyCode)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
