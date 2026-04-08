import { useState, useEffect, useRef, useMemo } from 'react'
import type { RefObject } from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observerOptions = useMemo(
    () => ({
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? '0px',
      threshold: options.threshold ?? 0,
    }),
    [options.root, options.rootMargin, options.threshold]
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, observerOptions)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [observerOptions])

  return [ref, isIntersecting]
}

export function useCountUp(endValue: number, duration: number = 2000): { ref: RefObject<HTMLDivElement | null>; count: number } {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTime: number
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * endValue))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [endValue, duration])

  return { ref, count }
}
