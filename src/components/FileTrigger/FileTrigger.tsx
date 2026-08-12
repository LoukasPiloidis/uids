import type { ReactNode } from 'react'
import {
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps as AriaFileTriggerProps,
} from 'react-aria-components'
import { Button, type ButtonProps } from '../Button/Button'

export interface FileTriggerProps extends Omit<AriaFileTriggerProps, 'children'> {
  /** Button label. */
  children?: ReactNode
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  isDisabled?: boolean
  className?: string
}

/**
 * A styled file picker. The `<input type="file">` stays in the DOM but hidden,
 * so the OS dialog, drag-and-drop targets and form submission all keep working
 * while the visible control is a normal `Button`.
 *
 * `onSelect` hands back a `FileList`; the caller owns the chosen file and any
 * name it wants to display.
 */
export const FileTrigger = ({
  children = 'Choose file',
  variant = 'secondary',
  size,
  isDisabled,
  className,
  ...props
}: FileTriggerProps) => (
  <AriaFileTrigger {...props}>
    <Button variant={variant} size={size} isDisabled={isDisabled} className={className}>
      {children}
    </Button>
  </AriaFileTrigger>
)
