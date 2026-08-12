import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Input,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className' | 'children'> {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

export const TextField = ({
  label,
  description,
  placeholder,
  errorMessage,
  className,
  ...props
}: TextFieldProps) => (
  <AriaTextField {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <Input className={styles.input} placeholder={placeholder} />
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </AriaTextField>
)
