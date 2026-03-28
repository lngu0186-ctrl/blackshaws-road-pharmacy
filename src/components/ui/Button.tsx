import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'red' | 'sage'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          {
            'btn-primary': variant === 'primary',
            'btn-outline': variant === 'outline',
            'btn-ghost': variant === 'ghost',
            'btn-red': variant === 'red',
            'btn-sage': variant === 'sage',
            'px-4 py-2 text-sm': size === 'sm',
            'px-8 py-3': size === 'md',
            'px-10 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
