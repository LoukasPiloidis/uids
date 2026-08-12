import { ProgressBar, type ProgressBarProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Spinner.module.css'

export interface SpinnerProps extends Omit<ProgressBarProps, 'className' | 'children'> {
  /** Accessible label announced to screen readers. */
  label?: string
  /** Diameter in pixels. */
  size?: number
  className?: string
}

export const Spinner = ({ label = 'Loading', size = 18, className, ...props }: SpinnerProps) => (
  <ProgressBar
    aria-label={label}
    isIndeterminate
    {...props}
    className={cn(styles.spinner, className)}
  >
    <span className={styles.ring} style={{ width: size, height: size }} />
  </ProgressBar>
)
