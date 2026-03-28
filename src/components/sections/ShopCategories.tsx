'use client'

import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Activity, Baby, Heart, Sparkles, User, Bandage, HeartPulse, Scale, Wind, Shield, Stethoscope } from 'lucide-react'
import { PHARMACY_CATEGORIES, getActiveCategories, categorizeProduct } from '../../utils/productCategories'
import { getAllProducts, type Product } from '../../services/shopify'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const iconMap: Record<string, any> = {
  'pill': Grid,
  'activity': Activity,
  'baby': Baby,
  'sparkles': Sparkles,
  'heart': Heart,
  'user': User,
  'bandage': Bandage,
  'heart-pulse': HeartPulse,
  'scale': Scale,
  'tooth': Stethoscope, // Use Stethoscope as fallback for dental
  'wind': Wind,
  'shield': Shield,
  'stethoscope': Stethoscope,
}

export function ShopCategories() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (err) {
        console.error('Failed to load products for categories:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const activeCategories = useMemo(() => {
    if (products.length === 0) return PHARMACY_CATEGORIES.slice(0, 8)
    return getActiveCategories(products)
  }, [products])

  return (
    <section ref={ref} className="section-padding" style={{ backgroundColor: 'var(--color-off-white)' }}>
      <div className="container-custom">
        <div
          className="text-center mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: `translateY(${isInView ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>SHOP BY CATEGORY</p>
          <h2 className="mb-4" style={{ color: 'var(--color-navy)' }}>
            Explore Our Full Range
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            From vitamins to skincare, baby care to medical devices. Browse our comprehensive selection of health and wellness products.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6 border" style={{ borderColor: 'var(--color-gray-200)' }}>
                <div className="w-12 h-12 rounded-xl bg-gray-200 mb-4" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `translateY(${isInView ? 0 : '30px'})`,
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            {activeCategories.map((category) => {
              const IconComponent = iconMap[category.icon || 'grid'] || Grid
              const productCount = products.filter(p => categorizeProduct(p).includes(category.id)).length

              return (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.slug}`}
                  className="group block bg-white rounded-2xl p-6 border transition-all hover:shadow-lg hover:border-red-200"
                  style={{ borderColor: 'var(--color-gray-200)' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors"
                    style={{ backgroundColor: 'var(--color-red)/10', color: 'var(--color-red)' }}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors" style={{ color: 'var(--color-navy)' }}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)] mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  {productCount > 0 && (
                    <p className="text-xs font-medium" style={{ color: 'var(--color-red)' }}>
                      {productCount} product{productCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </Link>
              )
            })}

            {/* View all categories card */}
            <Link
              to="/shop"
              className="group bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-white/10">
                <Grid className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">View All</h3>
              <p className="text-sm text-white/80">Browse complete catalog with filters and search</p>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}