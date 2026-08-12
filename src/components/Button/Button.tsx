import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  variant?: Variant
  size?: Size
  className?: string
}

export const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) => (
  <AriaButton {...props} className={cn(styles.button, styles[variant], styles[size], className)} />
)
