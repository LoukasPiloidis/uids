import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Stat.module.css'

type Trend = 'up' | 'down' | 'flat'

export interface StatProps {
  /** What is being counted. Keep it short — it sits above the number. */
  label: string
  value: ReactNode
  /** Qualifier under the value: a comparison, a unit, a time window. */
  hint?: ReactNode
  /**
   * Direction of travel. `up` and `down` are colour-coded, so pass the one that
   * matches the *reading*, not the arithmetic — a fall in errors is `up`.
   */
  trend?: Trend
  /** Change label rendered next to the trend arrow, e.g. `+12%`. */
  change?: ReactNode
  as?: ElementType
  className?: string
}

const ARROW: Record<Trend, string> = { up: '↑', down: '↓', flat: '→' }

/**
 * A single headline number. Reads top-down — label, value, then the qualifier —
 * so a row of them scans as a table without becoming one.
 */
export const Stat = ({
  label,
  value,
  hint,
  trend,
  change,
  as: Component = 'div',
  className,
}: StatProps) => (
  <Component className={cn(styles.stat, className)}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
    {change !== undefined || hint !== undefined ? (
      <span className={styles.meta}>
        {change !== undefined ? (
          <span className={cn(styles.change, trend && styles[trend])}>
            {trend ? (
              <span aria-hidden="true" className={styles.arrow}>
                {ARROW[trend]}
              </span>
            ) : null}
            {change}
          </span>
        ) : null}
        {hint !== undefined ? <span className={styles.hint}>{hint}</span> : null}
      </span>
    ) : null}
  </Component>
)

export interface StatGroupProps {
  children: ReactNode
  /** Narrowest a tile may get before the grid drops a column. */
  minTileWidth?: number
  className?: string
}

/** Responsive grid for a row of `Stat`s. Wraps rather than scrolls. */
export const StatGroup = ({ children, minTileWidth = 180, className }: StatGroupProps) => (
  <div
    className={cn(styles.group, className)}
    style={{ '--stat-min-width': `${minTileWidth}px` } as React.CSSProperties}
  >
    {children}
  </div>
)
