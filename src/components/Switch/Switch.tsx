import type { ReactNode } from 'react'
import {
  FieldError,
  SwitchButton,
  SwitchField,
  type SwitchFieldProps,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Switch.module.css'

export interface SwitchProps extends Omit<SwitchFieldProps, 'className' | 'children'> {
  children?: ReactNode
  /** Helper copy rendered under the control, wired via `aria-describedby`. */
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

export const Switch = ({
  children,
  description,
  errorMessage,
  className,
  ...props
}: SwitchProps) => (
  <SwitchField {...props} className={cn(styles.field, className)}>
    <SwitchButton className={styles.button}>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {children}
    </SwitchButton>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </SwitchField>
)
