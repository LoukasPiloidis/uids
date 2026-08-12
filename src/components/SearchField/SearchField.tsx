import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  Button,
  Input,
  Label,
} from 'react-aria-components'
import { SearchIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './SearchField.module.css'

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, 'className' | 'children'> {
  label?: string
  placeholder?: string
  className?: string
}

export const SearchField = ({ label, placeholder, className, ...props }: SearchFieldProps) => (
  <AriaSearchField {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <div className={styles.group}>
      <SearchIcon className={styles.icon} />
      <Input className={styles.input} placeholder={placeholder} />
      <Button className={styles.clear} aria-label="Clear search">
        ✕
      </Button>
    </div>
  </AriaSearchField>
)
