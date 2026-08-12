import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Surface.module.css'

type Elevation = 'flat' | 'raised'
type Padding = 'none' | 'sm' | 'md' | 'lg'

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. `article`, `section`, `li`). */
  as?: ElementType
  elevation?: Elevation
  padding?: Padding
  children?: ReactNode
  className?: string
}

export const Surface = ({
  as: Component = 'div',
  elevation = 'flat',
  padding = 'md',
  className,
  children,
  ...props
}: SurfaceProps) => (
  <Component
    {...props}
    className={cn(styles.surface, styles[elevation], styles[`p-${padding}`], className)}
  >
    {children}
  </Component>
)
