import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
  ToggleButtonGroup,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './ToggleButton.module.css'

export interface ToggleButtonProps extends Omit<AriaToggleButtonProps, 'className'> {
  className?: string
}

export const ToggleButton = ({ className, ...props }: ToggleButtonProps) => (
  <AriaToggleButton {...props} className={cn(styles.toggle, className)} />
)

// Group is a pure layout/behavior wrapper — consumers style the container.
export { ToggleButtonGroup }
