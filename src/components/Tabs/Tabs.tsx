import {
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  Tabs as AriaTabs,
  type TabsProps as AriaTabsProps,
  TabList,
  type TabListProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Tabs.module.css'

export interface TabsProps extends Omit<AriaTabsProps, 'className'> {
  className?: string
}

export const Tabs = ({ className, ...props }: TabsProps) => (
  <AriaTabs {...props} className={cn(styles.tabs, className)} />
)

export interface TabListItemsProps<T extends object> extends Omit<TabListProps<T>, 'className'> {
  className?: string
}

const TabListWrapper = <T extends object>({ className, ...props }: TabListItemsProps<T>) => (
  <TabList {...props} className={cn(styles.list, className)} />
)

export { TabListWrapper as TabList }

export interface TabProps extends Omit<AriaTabProps, 'className'> {
  className?: string
}

export const Tab = ({ className, ...props }: TabProps) => (
  <AriaTab {...props} className={cn(styles.tab, className)} />
)

export interface TabPanelProps extends Omit<AriaTabPanelProps, 'className'> {
  className?: string
}

export const TabPanel = ({ className, ...props }: TabPanelProps) => (
  <AriaTabPanel {...props} className={cn(styles.panel, className)} />
)
