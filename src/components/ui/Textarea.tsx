import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
