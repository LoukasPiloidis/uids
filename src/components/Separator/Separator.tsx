import {
  Separator as AriaSeparator,
  type SeparatorProps as AriaSeparatorProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Separator.module.css'

export interface SeparatorProps extends Omit<AriaSeparatorProps, 'className'> {
  className?: string
}

export const Separator = ({ className, ...props }: SeparatorProps) => (
  <AriaSeparator {...props} className={cn(styles.separator, className)} />
)
