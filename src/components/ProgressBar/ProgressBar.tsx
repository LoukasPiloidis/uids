import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  Label,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './ProgressBar.module.css'

type Tone = 'accent' | 'success' | 'warning' | 'danger'
type Size = 'sm' | 'md'

export interface ProgressBarProps extends Omit<AriaProgressBarProps, 'className' | 'children'> {
  label?: string
  /** Overrides the formatted value React Aria derives from `value`. */
  valueLabel?: string
  tone?: Tone
  size?: Size
  className?: string
}

export const ProgressBar = ({
  label,
  valueLabel,
  tone = 'accent',
  size = 'md',
  className,
  ...props
}: ProgressBarProps) => (
  <AriaProgressBar {...props} className={cn(styles.progress, styles[tone], className)}>
    {({ percentage, valueText, isIndeterminate }) => (
      <>
        {label || valueLabel ? (
          <div className={styles.header}>
            {label ? <Label className={styles.label}>{label}</Label> : null}
            <span className={styles.value}>{valueLabel ?? valueText}</span>
          </div>
        ) : null}
        <div className={cn(styles.track, styles[size])}>
          {/* Indeterminate leaves the width to CSS so the slide animation owns it. */}
          <div
            className={styles.fill}
            style={isIndeterminate ? undefined : { width: `${percentage ?? 0}%` }}
          />
        </div>
      </>
    )}
  </AriaProgressBar>
)
