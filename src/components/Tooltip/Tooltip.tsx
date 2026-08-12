import type { ReactNode } from 'react'
import {
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  OverlayArrow,
  TooltipTrigger,
} from 'react-aria-components'
import { OverlayArrowTip } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Tooltip.module.css'

export interface TooltipProps extends Omit<AriaTooltipProps, 'className' | 'children'> {
  children: ReactNode
  className?: string
}

export const Tooltip = ({ children, className, offset = 6, ...props }: TooltipProps) => (
  <AriaTooltip {...props} offset={offset} className={cn(styles.tooltip, className)}>
    <OverlayArrow className={styles.arrow}>
      <OverlayArrowTip width={10} height={10} />
    </OverlayArrow>
    {children}
  </AriaTooltip>
)

export { TooltipTrigger }
