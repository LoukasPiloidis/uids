import { Children, isValidElement, type ReactNode, useMemo, useState } from 'react'
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  Button,
  FieldError,
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { ChevronDownIcon, PlusIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './ComboBox.module.css'

export const CREATE_KEY = '__uids-create__'

export interface ComboBoxProps<T extends object>
  extends Omit<
    AriaComboBoxProps<T>,
    'className' | 'children' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'
  > {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: ReactNode
  placeholder?: string
  onCreate?: (value: string) => void
  createLabel?: (value: string) => ReactNode
  emptyState?: ReactNode
  className?: string
}

const itemText = (node: ReactNode): string | null => {
  if (!isValidElement<ComboBoxItemProps>(node)) {
    return null
  }
  const { textValue, children } = node.props
  if (typeof textValue === 'string') {
    return textValue
  }
  return typeof children === 'string' ? children : null
}

export const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  onCreate,
  createLabel,
  emptyState,
  inputValue,
  defaultInputValue,
  onInputChange,
  onChange,
  allowsEmptyCollection,
  menuTrigger,
  className,
  ...props
}: ComboBoxProps<T>) => {
  const [typedValue, setTypedValue] = useState(defaultInputValue ?? '')
  const currentValue = inputValue ?? typedValue
  const trimmed = currentValue.trim()

  const existingText = useMemo(
    () =>
      Children.toArray(children)
        .map(itemText)
        .filter((text): text is string => text !== null)
        .map((text) => text.toLowerCase()),
    [children],
  )

  const canCreate =
    Boolean(onCreate) && trimmed.length > 0 && !existingText.includes(trimmed.toLowerCase())

  const handleInputChange = (value: string) => {
    setTypedValue(value)
    onInputChange?.(value)
  }

  const handleChange = (key: Key | null) => {
    if (key === CREATE_KEY) {
      onCreate?.(trimmed)
      return
    }
    onChange?.(key)
  }

  return (
    <AriaComboBox
      {...props}
      inputValue={inputValue}
      defaultInputValue={defaultInputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      allowsEmptyCollection={allowsEmptyCollection ?? Boolean(emptyState)}
      menuTrigger={menuTrigger ?? 'focus'}
      className={cn(styles.field, className)}
    >
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
        <ListBox
          className={styles.listbox}
          renderEmptyState={emptyState ? () => emptyState : undefined}
        >
          {children}
          {canCreate ? (
            <ComboBoxItem id={CREATE_KEY} textValue={`Create ${trimmed}`} className={styles.create}>
              <PlusIcon className={styles.createIcon} />
              <span className={styles.createText}>
                {createLabel ? createLabel(trimmed) : `Create “${trimmed}”`}
              </span>
            </ComboBoxItem>
          ) : null}
        </ListBox>
      </Popover>
    </AriaComboBox>
  )
}

export interface ComboBoxItemProps extends Omit<ListBoxItemProps, 'className'> {
  className?: string
}

export const ComboBoxItem = ({ className, ...props }: ComboBoxItemProps) => (
  <ListBoxItem {...props} className={cn(styles.option, className)} />
)
