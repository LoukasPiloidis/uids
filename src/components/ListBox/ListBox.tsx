import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  type ListBoxProps as AriaListBoxProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './ListBox.module.css'

export interface ListBoxProps<T extends object> extends Omit<AriaListBoxProps<T>, 'className'> {
  className?: string
}

export const ListBox = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
  <AriaListBox {...props} className={cn(styles.listbox, className)} />
)

export interface ListBoxItemProps extends Omit<AriaListBoxItemProps, 'className'> {
  className?: string
}

export const ListBoxItem = ({ className, ...props }: ListBoxItemProps) => (
  <AriaListBoxItem {...props} className={cn(styles.item, className)} />
)
