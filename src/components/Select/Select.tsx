import type { ReactNode } from 'react'
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  SelectValue,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { ChevronDownIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Select.module.css'

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: ReactNode
  placeholder?: string
  className?: string
}

export const Select = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder = 'Select…',
  className,
  ...props
}: SelectProps<T>) => (
  <AriaSelect {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <Button className={styles.trigger}>
      <SelectValue className={styles.value}>
        {({ isPlaceholder, selectedText }) => (isPlaceholder ? placeholder : selectedText)}
      </SelectValue>
      <ChevronDownIcon className={styles.chevron} />
    </Button>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
    <Popover className={styles.popover}>
      <ListBox className={styles.listbox}>{children}</ListBox>
    </Popover>
  </AriaSelect>
)

export interface SelectItemProps extends Omit<ListBoxItemProps, 'className'> {
  className?: string
}

export const SelectItem = ({ className, ...props }: SelectItemProps) => (
  <ListBoxItem {...props} className={cn(styles.option, className)} />
)
