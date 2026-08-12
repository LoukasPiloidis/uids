import type { ReactNode } from 'react'
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { ChevronDownIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './ComboBox.module.css'

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: ReactNode
  placeholder?: string
  className?: string
}

export const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  className,
  ...props
}: ComboBoxProps<T>) => (
  <AriaComboBox {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <div className={styles.group}>
      <Input className={styles.input} placeholder={placeholder} />
      <Button className={styles.trigger} aria-label="Show suggestions">
        <ChevronDownIcon className={styles.chevron} />
      </Button>
    </div>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
    <Popover className={styles.popover}>
      <ListBox className={styles.listbox}>{children}</ListBox>
    </Popover>
  </AriaComboBox>
)

export interface ComboBoxItemProps extends Omit<ListBoxItemProps, 'className'> {
  className?: string
}

export const ComboBoxItem = ({ className, ...props }: ComboBoxItemProps) => (
  <ListBoxItem {...props} className={cn(styles.option, className)} />
)
