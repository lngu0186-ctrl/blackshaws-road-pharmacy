import { useEffect, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

type SelectContextValue = {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

let selectContext: SelectContextValue | null = null

export function Select({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  selectContext = { value, onValueChange, open, setOpen }
  return <div className="relative">{children}</div>
}

export function SelectTrigger({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  if (!selectContext) {
    throw new Error('Select components must be used within Select')
  }

  return (
    <button
      type="button"
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm transition-all duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200',
        className,
      )}
      aria-haspopup="listbox"
      aria-expanded={selectContext.open}
      onClick={() => selectContext?.setOpen(!selectContext.open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  if (!selectContext) {
    throw new Error('Select components must be used within Select')
  }

  return <span>{selectContext.value || placeholder}</span>
}

export function SelectContent({ className, children }: HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        selectContext?.setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!selectContext?.open) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-1 shadow-xl',
        className,
      )}
      role="listbox"
    >
      {children}
    </div>
  )
}

export function SelectItem({ className, children, value }: HTMLAttributes<HTMLDivElement> & { value: string }) {
  if (!selectContext) {
    throw new Error('Select components must be used within Select')
  }

  const isSelected = selectContext.value === value

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50',
        className,
      )}
      role="option"
      aria-selected={isSelected}
      onClick={() => {
        selectContext?.onValueChange(value)
        selectContext?.setOpen(false)
      }}
    >
      <span>{children}</span>
      {isSelected ? <Check className="h-4 w-4 text-blue-600" aria-hidden="true" /> : null}
    </div>
  )
}
