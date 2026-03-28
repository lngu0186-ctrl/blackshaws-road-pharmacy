import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, style, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('card', className)} style={style} {...props}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export { Card }
