/** MobileDrawer — left slide-in navigation drawer with focus trap for mobile. */
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const CLOSE_DURATION_MS = 220

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const [closing, setClosing] = useState(false)

  // Play the exit animation before telling the parent to unmount us.
  // Direct parent-driven closes (e.g. after tapping a nav link) skip the
  // animation, which is fine because navigation happens immediately anyway.
  const startClose = () => {
    if (closing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose()
      return
    }
    setClosing(true)
    closeTimer.current = window.setTimeout(() => {
      setClosing(false)
      onClose()
    }, CLOSE_DURATION_MS)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (!isOpen) return
    triggerRef.current = document.activeElement as HTMLElement | null
    const drawer = drawerRef.current
    if (!drawer) return
    const focusableElements = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusableElements[0] as HTMLElement
    const last = focusableElements[focusableElements.length - 1] as HTMLElement
    first?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
      if (e.key === 'Escape') startClose()
    }

    drawer.addEventListener('keydown', handleTab)
    return () => drawer.removeEventListener('keydown', handleTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 xl:hidden" data-closing={closing || undefined}>
      <div className="drawer-backdrop absolute inset-0 bg-black/50" onClick={startClose} aria-hidden="true" />
      <div
        ref={drawerRef}
        className="drawer-panel absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <div className="flex justify-end p-4">
          <button onClick={startClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <X className="w-6 h-6" style={{ color: 'var(--color-navy)' }} />
          </button>
        </div>
        <div className="drawer-stagger flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}
