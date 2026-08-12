import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn(styles.root, className)}>
    {icon ? (
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
    ) : null}
    <p className={styles.title}>{title}</p>
    {description ? <p className={styles.description}>{description}</p> : null}
    {action ? <div className={styles.action}>{action}</div> : null}
  </div>
)
