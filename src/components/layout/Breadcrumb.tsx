import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation()

  // If no items provided, generate default based on route
  if (!items || items.length === 0) {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const defaultItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      ...pathSegments.map((seg, idx) => ({
        label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
        href: '/' + pathSegments.slice(0, idx + 1).join('/')
      }))
    ]
    items = defaultItems
  }

  return (
    <nav aria-label="Breadcrumb" className={cn('border-b border-gray-100 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-8 py-3">
        <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
              {item.href && idx < items.length - 1 ? (
                <Link
                  to={item.href}
                  className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-navy)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
