import { Star, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

interface GoogleReviewsWidgetProps {
  placeId?: string
  apiKey?: string
}

/**
 * Google Reviews Widget
 * Displays a summary of Google reviews with a link to the full reviews page.
 * Uses a simple card-based layout with star ratings and a CTA to view all reviews.
 *
 * For a live widget with real-time data, you'd need a Google Places API key and placeId.
 * This component provides a fallback static display that can be enhanced later.
 */
export function GoogleReviewsWidget(_: GoogleReviewsWidgetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = true

  // Placeholder review data — replace with real API fetch when keys are available
  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Always friendly and helpful staff. The pharmacists take time to explain medications clearly. Best pharmacy in Altona North!',
      date: '2 weeks ago',
    },
    {
      name: 'James T.',
      rating: 5,
      text: 'Great service, fast prescription processing. The online shop is convenient and the click & collect option saves me time.',
      date: '1 month ago',
    },
    {
      name: 'Priya K.',
      rating: 5,
      text: 'Professional and knowledgeable team. They helped me with my travel vaccinations and provided excellent advice. Highly recommend!',
      date: '3 weeks ago',
    },
  ]

  const averageRating = 4.9
  const totalReviews = 127

  return (
    <section
      ref={ref}
      className="section-padding bg-white"
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : '24px'})`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="container-custom">
        <div className="mb-10 text-center">
          <p className="section-label" style={{ color: 'var(--color-navy)' }}>What our customers say</p>
          <h2 className="text-[var(--color-navy)]">Trusted by the Altona North community.</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-[var(--color-navy)]">{averageRating}</span>
            <span className="text-sm text-[var(--color-text-muted)]">({totalReviews} Google reviews)</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-4">"{review.text}"</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span className="font-semibold text-[var(--color-navy)]">{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/place/Blackshaws+Road+Pharmacy/@-37.8732479,144.8235793,17z/data=!4m8!3m7!1s0x6ad64e7c4ab2b3b5:0x504567521000ce1!8m2!3d-37.8732479!4d144.825768!9m1!1b1!16s%2Fg%2F11c5lqwz8y?entry=ttu&g_ep=EgoyMDI1MDMxOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)] transition-colors"
          >
            View all reviews on Google <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
