import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Badge.module.css'

type Tone = 'accent' | 'info' | 'neutral' | 'warning' | 'danger'

export interface BadgeProps {
  tone?: Tone
  children: ReactNode
  className?: string
}

export const Badge = ({ tone = 'neutral', children, className }: BadgeProps) => (
  <span className={cn(styles.badge, styles[tone], className)}>{children}</span>
)
