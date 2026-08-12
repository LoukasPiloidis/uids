import type { ReactNode } from 'react'
import {
  Breadcrumb as AriaBreadcrumb,
  type BreadcrumbProps as AriaBreadcrumbProps,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
  Link,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Breadcrumbs.module.css'

export interface BreadcrumbsProps<T extends object>
  extends Omit<AriaBreadcrumbsProps<T>, 'className'> {
  className?: string
}

export const Breadcrumbs = <T extends object>({ className, ...props }: BreadcrumbsProps<T>) => (
  <AriaBreadcrumbs {...props} className={cn(styles.list, className)} />
)

export interface BreadcrumbProps extends Omit<AriaBreadcrumbProps, 'className' | 'children'> {
  href?: string
  children: ReactNode
  className?: string
}

export const Breadcrumb = ({ href, children, className, ...props }: BreadcrumbProps) => (
  <AriaBreadcrumb {...props} className={cn(styles.crumb, className)}>
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  </AriaBreadcrumb>
)
