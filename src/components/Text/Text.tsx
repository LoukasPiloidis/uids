import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Text.module.css'

type Size = 'xs' | 'sm' | 'base' | 'md' | 'lg'
type Tone = 'default' | 'muted' | 'subtle' | 'accent' | 'danger'
type Weight = 'normal' | 'medium' | 'semi' | 'bold'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. `span`, `div`, `legend`). Defaults to `p`. */
  as?: ElementType
  size?: Size
  tone?: Tone
  weight?: Weight
  /** Constrain to `--measure` for long-form copy. */
  isReading?: boolean
  children?: ReactNode
  className?: string
}

export const Text = ({
  as: Component = 'p',
  size = 'base',
  tone = 'default',
  weight = 'normal',
  isReading = false,
  className,
  children,
  ...props
}: TextProps) => (
  <Component
    {...props}
    className={cn(
      styles.text,
      styles[size],
      styles[tone],
      styles[weight],
      isReading && styles.reading,
      className,
    )}
  >
    {children}
  </Component>
)
