/** MobileDrawer — left slide-in navigation drawer with focus trap for mobile. */
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
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
      if (e.key === 'Escape') onClose()
    }

    drawer.addEventListener('keydown', handleTab)
    return () => drawer.removeEventListener('keydown', handleTab)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={drawerRef}
        className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col"
        style={{ transform: 'translateX(0)', transition: 'transform 0.3s ease-out' }}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <X className="w-6 h-6" style={{ color: 'var(--color-navy)' }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}
