import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Activity, Baby, Heart, Sparkles, User, Bandage, HeartPulse, Scale, Wind, Shield, Stethoscope, ArrowRight } from 'lucide-react'
import { PHARMACY_CATEGORIES } from '../../utils/productCategories'
import { useInView } from 'framer-motion'

const iconMap: Record<string, any> = {
  pill: Grid,
  activity: Activity,
  baby: Baby,
  sparkles: Sparkles,
  heart: Heart,
  user: User,
  bandage: Bandage,
  'heart-pulse': HeartPulse,
  scale: Scale,
  tooth: Stethoscope,
  wind: Wind,
  shield: Shield,
  stethoscope: Stethoscope,
}

const displayCategories = PHARMACY_CATEGORIES.slice(0, 8)

export function ShopCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-alt">
      <div className="container-custom">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label" style={{ color: 'var(--color-navy)' }}>Shop with confidence</p>
            <h2 className="max-w-3xl text-[var(--color-navy)]">A more considered health and wellness range.</h2>
          </div>
          <p className="max-w-xl text-base text-[var(--color-text-muted)]">Browse everyday pharmacy essentials, practitioner-led health products and family wellness categories in a calmer, more premium storefront experience.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ opacity: isInView ? 1 : 0, transform: `translateY(${isInView ? 0 : '20px'})`, transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          {displayCategories.map((category) => {
            const IconComponent = iconMap[category.icon || 'grid'] || Grid
            return (
              <Link key={category.id} to={`/shop?category=${category.slug}`} className="group rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.2)] transition hover:-translate-y-1 hover:border-[rgba(192,57,43,0.24)] hover:shadow-[0_28px_70px_-40px_rgba(16,24,63,0.25)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-red-soft)] text-[var(--color-red)]"><IconComponent className="h-7 w-7" /></div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)]">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{category.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-[var(--color-navy)]">
                  <span>Browse range</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}