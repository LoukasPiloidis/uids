import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Centered.module.css'

export interface CenteredProps extends HTMLAttributes<HTMLElement> {
  /** Defaults to `main`, since this usually is the page. */
  as?: ElementType
  /** Fill the viewport height. Turn off when nesting inside an existing layout. */
  isFullHeight?: boolean
  children?: ReactNode
  className?: string
}

export const Centered = ({
  as: Component = 'main',
  isFullHeight = true,
  className,
  children,
  ...props
}: CenteredProps) => (
  <Component
    {...props}
    className={cn(styles.centered, isFullHeight && styles.fullHeight, className)}
  >
    {children}
  </Component>
)
