import type { ReactNode } from 'react'
import {
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './TextArea.module.css'

export interface TextAreaProps extends Omit<AriaTextFieldProps, 'className' | 'children' | 'type'> {
  label?: ReactNode
  description?: string
  placeholder?: string
  rows?: number
  mono?: boolean
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

export const TextArea = ({
  label,
  description,
  placeholder,
  rows = 4,
  mono = false,
  errorMessage,
  className,
  ...props
}: TextAreaProps) => (
  <AriaTextField {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <AriaTextArea
      className={cn(styles.textarea, mono && styles.mono)}
      placeholder={placeholder}
      rows={rows}
    />
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </AriaTextField>
)
