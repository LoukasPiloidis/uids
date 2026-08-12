import type { ReactNode } from 'react'
import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  Dialog,
  DialogTrigger,
  OverlayArrow,
} from 'react-aria-components'
import { OverlayArrowTip } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Popover.module.css'

export interface PopoverProps extends Omit<AriaPopoverProps, 'className' | 'children'> {
  showArrow?: boolean
  children: ReactNode
  className?: string
}

export const Popover = ({ showArrow = true, children, className, ...props }: PopoverProps) => (
  <AriaPopover {...props} className={cn(styles.popover, className)}>
    {showArrow ? (
      <OverlayArrow className={styles.arrow}>
        <OverlayArrowTip />
      </OverlayArrow>
    ) : null}
    <Dialog className={styles.dialog}>{children}</Dialog>
  </AriaPopover>
)

export { DialogTrigger }
