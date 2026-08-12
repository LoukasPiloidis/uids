import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Link.module.css'

export interface LinkProps extends Omit<AriaLinkProps, 'className'> {
  className?: string
}

export const Link = ({ className, ...props }: LinkProps) => (
  <AriaLink {...props} className={cn(styles.link, className)} />
)
