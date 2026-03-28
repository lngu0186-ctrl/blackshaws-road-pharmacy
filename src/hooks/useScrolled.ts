/** useScrolled — returns true when window.scrollY exceeds threshold (default 10px). */
import { useState, useEffect } from 'react'

export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
