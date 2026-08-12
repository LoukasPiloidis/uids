import type { ReactNode } from 'react'
import {
  Disclosure as AriaDisclosure,
  type DisclosureProps as AriaDisclosureProps,
  Button,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from 'react-aria-components'
import { ChevronRightIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Disclosure.module.css'

export interface DisclosureProps extends Omit<AriaDisclosureProps, 'className' | 'children'> {
  title: ReactNode
  children: ReactNode
  className?: string
}

export const Disclosure = ({ title, children, className, ...props }: DisclosureProps) => (
  <AriaDisclosure {...props} className={cn(styles.disclosure, className)}>
    <Heading className={styles.heading}>
      <Button slot="trigger" className={styles.trigger}>
        <ChevronRightIcon className={styles.chevron} />
        <span className={styles.title}>{title}</span>
      </Button>
    </Heading>
    <DisclosurePanel className={styles.panel}>{children}</DisclosurePanel>
  </AriaDisclosure>
)

export { DisclosureGroup }
