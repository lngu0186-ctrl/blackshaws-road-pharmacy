interface ProductCardSkeletonProps {
  count?: number
  variant?: 'shop' | 'search'
}

export function ProductCardSkeleton({ count = 8, variant = 'shop' }: ProductCardSkeletonProps) {
  const items = Array.from({ length: count })

  if (variant === 'search') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" aria-busy="true" aria-label="Loading products">
        {items.map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-white">
            <div className="aspect-square animate-pulse bg-[var(--color-navy-soft)]" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--color-navy-soft)]" />
              <div className="h-4 w-2/5 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="products-grid grid-view mt-8" aria-busy="true" aria-label="Loading products">
      {items.map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-white shadow-[0_24px_60px_-46px_rgba(16,24,63,0.18)]">
          <div className="aspect-square animate-pulse bg-[var(--color-navy-soft)]" />
          <div className="space-y-3 p-5 md:p-6">
            <div className="h-3 w-1/3 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="h-4 w-full animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-[var(--color-navy-soft)]" />
            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <div className="h-6 w-20 animate-pulse rounded bg-[var(--color-navy-soft)]" />
              <div className="h-9 w-20 animate-pulse rounded-full bg-[var(--color-navy-soft)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
