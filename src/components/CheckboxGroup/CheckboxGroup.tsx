import type { ReactNode } from 'react'
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './CheckboxGroup.module.css'

type Orientation = 'vertical' | 'horizontal'

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  /** How the checkboxes stack. `horizontal` wraps. */
  orientation?: Orientation
  /** Rendered in place of the options when there are none to show. */
  renderEmptyState?: () => ReactNode
  children?: ReactNode
  className?: string
}

const hasChildren = (children: ReactNode) =>
  Array.isArray(children) ? children.some(Boolean) : Boolean(children)

export const CheckboxGroup = ({
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  renderEmptyState,
  children,
  className,
  ...props
}: CheckboxGroupProps) => (
  <AriaCheckboxGroup {...props} className={cn(styles.group, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    {hasChildren(children) || !renderEmptyState ? (
      <div className={cn(styles.options, styles[orientation])}>{children}</div>
    ) : (
      <div className={styles.empty}>{renderEmptyState()}</div>
    )}
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
  </AriaCheckboxGroup>
)
