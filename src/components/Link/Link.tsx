import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Link.module.css'

type Variant = 'default' | 'muted'

export interface LinkProps extends Omit<AriaLinkProps, 'className'> {
  /**
   * `muted` inherits the surrounding text colour and only reveals itself on hover —
   * for links in dense navigation and metadata, where a page of accent-coloured
   * text would be noisier than it is useful.
   */
  variant?: Variant
  className?: string
}

export const Link = ({ variant = 'default', className, ...props }: LinkProps) => (
  <AriaLink {...props} className={cn(styles.link, styles[variant], className)} />
)
