import type { ReactNode } from 'react'
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  variant?: Variant
  size?: Size
  /**
   * Swapped in for `children` while `isPending`, so a slow save reads as progress
   * rather than an unresponsive button. Without it the label stays put and only
   * the cursor changes.
   */
  pendingLabel?: ReactNode
  className?: string
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  pendingLabel,
  children,
  className,
  ...props
}: ButtonProps) => (
  // React Aria's `isPending` blocks press, announces the state and emits
  // `data-pending` — all while keeping the button focusable, which a plain
  // `isDisabled` would not.
  <AriaButton {...props} className={cn(styles.button, styles[variant], styles[size], className)}>
    {props.isPending === true && pendingLabel !== undefined ? pendingLabel : children}
  </AriaButton>
)
