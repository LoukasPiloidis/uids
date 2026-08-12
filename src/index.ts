// React Aria Components (behavior/a11y) + CSS Modules (styling), driven by a
// single token layer. Every component: `components/<Name>/<Name>.tsx` plus a
// co-located `<Name>.module.css` that reads only `var(--token)`; interaction
// state arrives as `data-*` attributes from RAC and is styled in CSS.
//
// Requires the token layer to be loaded once globally, in the app entry:
//   import '@repo/ui/styles/global.css'

// Re-exported React Aria types consumers need when typing collection/selection state.
export type { Key, Selection } from 'react-aria-components'
export { Avatar, type AvatarProps } from './components/Avatar/Avatar'
export { Badge, type BadgeProps } from './components/Badge/Badge'
export {
  Breadcrumb,
  type BreadcrumbProps,
  Breadcrumbs,
  type BreadcrumbsProps,
} from './components/Breadcrumbs/Breadcrumbs'
export { Button, type ButtonProps } from './components/Button/Button'
export { Checkbox, type CheckboxProps } from './components/Checkbox/Checkbox'
export {
  ComboBox,
  ComboBoxItem,
  type ComboBoxItemProps,
  type ComboBoxProps,
} from './components/ComboBox/ComboBox'
export { Dialog, type DialogProps } from './components/Dialog/Dialog'
export {
  Disclosure,
  DisclosureGroup,
  type DisclosureProps,
} from './components/Disclosure/Disclosure'
export { EmptyState, type EmptyStateProps } from './components/EmptyState/EmptyState'
export { Link, type LinkProps } from './components/Link/Link'
export {
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
} from './components/ListBox/ListBox'
export {
  Menu,
  MenuGroup,
  type MenuGroupProps,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuSeparator,
  MenuTrigger,
} from './components/Menu/Menu'
export { DialogTrigger, Popover, type PopoverProps } from './components/Popover/Popover'
export { SearchField, type SearchFieldProps } from './components/SearchField/SearchField'
export {
  Select,
  SelectItem,
  type SelectItemProps,
  type SelectProps,
} from './components/Select/Select'
export { Separator, type SeparatorProps } from './components/Separator/Separator'
export { Spinner, type SpinnerProps } from './components/Spinner/Spinner'
export { Surface, type SurfaceProps } from './components/Surface/Surface'
export { Switch, type SwitchProps } from './components/Switch/Switch'
export {
  Tab,
  TabList,
  type TabListItemsProps,
  TabPanel,
  type TabPanelProps,
  type TabProps,
  Tabs,
  type TabsProps,
} from './components/Tabs/Tabs'
export {
  Tag,
  TagGroup,
  type TagGroupProps,
  type TagProps,
} from './components/TagGroup/TagGroup'
export { TextArea, type TextAreaProps } from './components/TextArea/TextArea'
export { TextField, type TextFieldProps } from './components/TextField/TextField'
export {
  type ToastContentValue,
  Toaster,
  type ToasterProps,
  type ToastOptions,
  type ToastTone,
  toast,
  toastQueue,
} from './components/Toast/Toast'
export {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonProps,
} from './components/ToggleButton/ToggleButton'
export { Tooltip, type TooltipProps, TooltipTrigger } from './components/Tooltip/Tooltip'
export {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OverlayArrowTip,
  SearchIcon,
} from './icons'
export { cn } from './lib/cn'
