import type { ReactNode } from 'react'
import {
  CheckboxButton,
  CheckboxField,
  type CheckboxFieldProps,
  FieldError,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { CheckIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<CheckboxFieldProps, 'className' | 'children'> {
  children?: ReactNode
  /** Helper copy rendered under the control, wired via `aria-describedby`. */
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

export const Checkbox = ({
  children,
  description,
  errorMessage,
  className,
  ...props
}: CheckboxProps) => (
  <CheckboxField {...props} className={cn(styles.field, className)}>
    <CheckboxButton className={styles.button}>
      <span className={styles.box} aria-hidden="true">
        <CheckIcon className={styles.check} />
      </span>
      {children}
    </CheckboxButton>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </CheckboxField>
)
