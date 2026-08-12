import type { ReactNode } from 'react'
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  Header,
  MenuSection,
  type MenuSectionProps,
  MenuTrigger,
  Popover,
  type PopoverProps,
  Separator,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Menu.module.css'

export interface MenuProps<T extends object>
  extends Omit<AriaMenuProps<T>, 'className'>,
    Pick<PopoverProps, 'placement'> {
  className?: string
}

export const Menu = <T extends object>({ className, placement, ...props }: MenuProps<T>) => (
  <Popover placement={placement} className={styles.popover}>
    <AriaMenu {...props} className={cn(styles.menu, className)} />
  </Popover>
)

type Variant = 'default' | 'danger'

export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className'> {
  variant?: Variant
  className?: string
}

export const MenuItem = ({ variant = 'default', className, ...props }: MenuItemProps) => (
  <AriaMenuItem {...props} className={cn(styles.item, styles[variant], className)} />
)

export const MenuSeparator = () => <Separator className={styles.separator} />

export interface MenuGroupProps<T extends object>
  extends Omit<MenuSectionProps<T>, 'className' | 'children'> {
  label?: string
  children: ReactNode
  className?: string
}

export const MenuGroup = <T extends object>({
  label,
  className,
  children,
  ...props
}: MenuGroupProps<T>) => (
  <MenuSection {...props} className={cn(styles.section, className)}>
    {label ? <Header className={styles.sectionHeader}>{label}</Header> : null}
    {children}
  </MenuSection>
)

export { MenuTrigger }
