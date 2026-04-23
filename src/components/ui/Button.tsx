import { forwardRef, cloneElement, isValidElement } from 'react'
import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'red' | 'sage'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const classes = cn(
      'btn',
      {
        'btn-primary': variant === 'primary',
        'btn-outline': variant === 'outline',
        'btn-ghost': variant === 'ghost',
        'btn-red': variant === 'red',
        'btn-sage': variant === 'sage',
        'min-h-10 px-4 text-sm': size === 'sm',
        'min-h-12 px-6 text-[0.95rem]': size === 'md',
        'min-h-14 px-7 text-base': size === 'lg',
      },
      className,
    )

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string }>
      return cloneElement(child, {
        ...props,
        ...(child.props as object),
        className: cn(classes, child.props.className),
        // @ts-expect-error - forward ref to child
        ref,
      })
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
