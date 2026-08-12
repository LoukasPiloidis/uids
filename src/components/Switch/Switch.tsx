import type { ReactNode } from 'react'
import { SwitchButton, SwitchField, type SwitchFieldProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Switch.module.css'

export interface SwitchProps extends Omit<SwitchFieldProps, 'className' | 'children'> {
  children?: ReactNode
  className?: string
}

export const Switch = ({ children, className, ...props }: SwitchProps) => (
  <SwitchField {...props} className={cn(styles.field, className)}>
    <SwitchButton className={styles.button}>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {children}
    </SwitchButton>
  </SwitchField>
)
