import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  FieldError,
  Group,
  Input,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { ChevronDownIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './NumberField.module.css'

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  /** Hides the increment/decrement buttons for dense layouts such as table cells. */
  hideStepper?: boolean
  className?: string
}

/**
 * Numeric input that hands the call site a real `number` (or `NaN` when cleared),
 * so consumers never parse strings out of change events. Formatting and parsing
 * follow the locale from `I18nProvider`, and `formatOptions` covers currency,
 * percentage and unit display.
 */
export const NumberField = ({
  label,
  description,
  errorMessage,
  placeholder,
  hideStepper = false,
  className,
  ...props
}: NumberFieldProps) => (
  <AriaNumberField {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <Group className={styles.group}>
      <Input className={styles.input} placeholder={placeholder} />
      {hideStepper ? null : (
        <div className={styles.steppers}>
          <Button slot="increment" className={styles.stepper}>
            <ChevronDownIcon className={styles.increment} />
          </Button>
          <Button slot="decrement" className={styles.stepper}>
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </Group>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </AriaNumberField>
)
