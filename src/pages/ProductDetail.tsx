import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, Check, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../context/ToastContext'
import { getProductByHandle, type ShopifyProduct as Product } from '../services/shopify'
import {
  formatPrice,
  getProductImageUrl,
  isOnSale,
  getSalePrice,
  categorizeProduct,
  PHARMACY_CATEGORIES,
} from '../utils/productCategories'
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
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const isLoading = useCartStore((s) => s.isLoading)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return
      try {
        setLoading(true)
        const data = await getProductByHandle(handle)
        if (data) {
          setProduct(data)
          const firstAvailable = data.variants.edges.find((edge: any) => edge.node.availableForSale)
          setSelectedVariant(firstAvailable?.node || data.variants.edges[0]?.node || null)
        } else {
          setError('Product not found')
        }
        setError(null)
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

  useEffect(() => {
    if (!product) return

    const title = `${product.title} | Blackshaws Road Pharmacy`
    const description = product.description.replace(/<[^>]*>/g, '').slice(0, 160) || 'Shop online at Blackshaws Road Pharmacy for quality health products.'
    const image = getProductImageUrl(product, 1200, 630)
    const canonical = `https://blackshawsroadpharmacy.lovable.app/shop/${product.handle}`

    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.rel = 'canonical'
      document.head.appendChild(linkCanonical)
    }
    if (linkCanonical) linkCanonical.href = canonical

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
  }, [product])

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
            <p className="text-[var(--color-gray-600)] mb-6">
              {error || 'The product you are looking for does not exist or has been removed.'}
            </p>
            <Button variant="primary" asChild>
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const hasVariants = product.variants.edges.length > 1
  const onSale = isOnSale(product)
  const salePrice = onSale ? getSalePrice(product) : null
  const regularPrice = product.priceRange.minVariantPrice
  const mainImage = getProductImageUrl(product, 800, 800, selectedVariant?.image || undefined)

  const categorySlug = categorizeProduct(product).length > 0 ? categorizeProduct(product)[0] : null
  const categoryName = categorySlug ? PHARMACY_CATEGORIES.find((c) => c.id === categorySlug)?.name : 'Shop'

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link to="/" className="text-gray-500 hover:text-red-600 transition-colors">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link to="/shop" className="text-gray-500 hover:text-red-600 transition-colors">Shop</Link></li>
            {categorySlug && (
              <>
                <li className="text-gray-400">/</li>
                <li>
                  <Link to={`/shop?category=${categorySlug}`} className="text-gray-500 hover:text-red-600 transition-colors">
                    {categoryName}
                  </Link>
                </li>
              </>
            )}
            <li className="text-gray-400">/</li>
            <li className="font-medium truncate max-w-[200px]" style={{ color: 'var(--color-navy)' }}>
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Back to Shop */}
        <Link
          to="/shop"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <img
                src={mainImage}
                alt={selectedVariant?.image?.altText || product.images?.edges[0]?.node?.altText || product.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
              />
              {onSale && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                  On Sale
                </span>
              )}
              {!selectedVariant?.availableForSale && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg bg-red-600 px-6 py-3 rounded-lg">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.edges.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none"
                    style={{ borderColor: 'var(--color-red)' }}
                  >
                    <img
                      src={getProductImageUrl(product, 150, 150, img.node)}
                      alt={img.node.altText || `${product.title} image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm font-medium text-[var(--color-gray-500)] mb-2 uppercase tracking-wide">
              {product.vendor}
            </p>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight" style={{ color: 'var(--color-navy)' }}>
              {product.title}
            </h1>

            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                {onSale && salePrice ? (
                  <>
                    <span className="text-3xl font-bold" style={{ color: 'var(--color-red)' }}>
                      {formatPrice(salePrice.amount, salePrice.currencyCode)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(regularPrice.amount, regularPrice.currencyCode)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-navy)' }}>
                    {formatPrice(regularPrice.amount, regularPrice.currencyCode)}
                  </span>
                )}
              </div>
              {product.variants.edges.length > 1 && (
                <p className="text-sm text-[var(--color-gray-500)] mt-2">Price may vary by variant</p>
              )}
            </div>

            <div
              className="prose prose-sm max-w-none mb-8 text-[var(--color-gray-700)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
            />

            {hasVariants && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-navy)' }}>Options</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedVariant(node)}
                      className={`px-5 py-3 rounded-xl text-sm border transition-all ${
                        selectedVariant?.id === node.id
                          ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                      disabled={!node.availableForSale}
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
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold"
                    disabled={quantity <= 1}
                    style={{ color: quantity <= 1 ? 'var(--color-gray-300)' : 'var(--color-gray-700)' }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 text-center font-semibold border-none bg-transparent focus:ring-0"
                    style={{ color: 'var(--color-navy)' }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <span className="text-red-600 font-medium">This item is out of stock</span>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isLoading}
              className="w-full md:w-auto text-lg py-4 px-8"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              {isLoading ? 'Adding...' : selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            <div className="mt-10 p-6 rounded-2xl bg-gray-50 border" style={{ borderColor: 'var(--color-gray-200)' }}>
              <h4 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-navy)' }}>Product Details</h4>
              <dl className="space-y-3 text-sm">
                {product.vendor && (
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-600">Brand</dt>
                    <dd className="flex-1 text-gray-900">{product.vendor}</dd>
                  </div>
                )}
                {product.productType && (
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-600">Category</dt>
                    <dd className="flex-1 text-gray-900">{product.productType}</dd>
                  </div>
                )}
                {selectedVariant?.sku && (
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-600">SKU</dt>
                    <dd className="flex-1 text-gray-900 font-mono text-xs">{selectedVariant.sku}</dd>
                  </div>
                )}
                {selectedVariant?.availableForSale !== undefined && (
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-600">Availability</dt>
                    <dd className="flex-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${selectedVariant.availableForSale ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedVariant.availableForSale ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-red-50 border border-red-100">
              <h4 className="font-semibold mb-3" style={{ color: 'var(--color-red)' }}>Pharmacy Information</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  <span>This is a genuine product sourced from authorised distributors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  <span>Speak to our pharmacists for advice on this product</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  <span>Free click &amp; collect available from our Altona North store</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
