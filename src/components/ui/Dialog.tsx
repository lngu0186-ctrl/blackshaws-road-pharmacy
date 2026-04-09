import { useEffect, useRef } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

type DialogContentProps = {
  children: ReactNode
  className?: string
}

type DialogHeaderProps = {
  children: ReactNode
  className?: string
}

type DialogFooterProps = {
  children: ReactNode
  className?: string
}

type DialogTitleProps = {
  children: ReactNode
  className?: string
}

type DialogDescriptionProps = {
  children: ReactNode
  className?: string
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [open, onOpenChange])

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">{children}</div>,
    document.body,
  )
}

export function DialogOverlay({ className }: { className?: string }) {
  return <div className={cn('absolute inset-0 bg-slate-900/50 backdrop-blur-sm', className)} />
}

export function DialogContent({ children, className }: DialogContentProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = contentRef.current
    if (!element) {
      return
    }

    const selectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ]

    const focusable = Array.from(element.querySelectorAll<HTMLElement>(selectors.join(',')))
    focusable[0]?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Tab' || focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    return () => element.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="true"
      className={cn(
        'relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn('mb-4 space-y-2', className)}>{children}</div>
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}>{children}</div>
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={cn('text-xl font-semibold text-slate-800', className)}>{children}</h2>
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <p className={cn('text-sm text-slate-500', className)}>{children}</p>
}
