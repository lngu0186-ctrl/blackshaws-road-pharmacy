import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

// One observer shared by every Reveal on the page. Elements are revealed
// once and then unobserved, so scrolling back up never re-hides content.
let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            sharedObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
  }
  return sharedObserver
}

interface RevealProps {
  children?: ReactNode
  /** Wrapper element, defaults to div */
  as?: ElementType
  className?: string
  /** Transition delay in ms, used for staggering grids */
  delay?: number
  /** 'up' rises into place; 'scale' adds a slight settle */
  variant?: 'up' | 'scale'
  id?: string
}

export function Reveal({ children, as: Tag = 'div', className, delay = 0, variant = 'up', id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-inview')
      return
    }
    const observer = getObserver()
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref} id={id} className={`reveal${variant === 'scale' ? ' reveal-scale' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </Tag>
  )
}
