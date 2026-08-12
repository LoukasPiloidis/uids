import type { ReactNode } from 'react'
import { CheckboxButton, CheckboxField, type CheckboxFieldProps } from 'react-aria-components'
import { CheckIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<CheckboxFieldProps, 'className' | 'children'> {
  children?: ReactNode
  className?: string
}

export const Checkbox = ({ children, className, ...props }: CheckboxProps) => (
  <CheckboxField {...props} className={cn(styles.field, className)}>
    <CheckboxButton className={styles.button}>
      <span className={styles.box} aria-hidden="true">
        <CheckIcon className={styles.check} />
      </span>
      {children}
    </CheckboxButton>
  </CheckboxField>
)
