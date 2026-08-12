import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
  Button,
  Label,
  TagList,
  type TagListProps,
  Text,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './TagGroup.module.css'

export interface TagGroupProps<T extends object>
  extends Omit<AriaTagGroupProps, 'className' | 'children'> {
  label?: string
  description?: string
  items?: TagListProps<T>['items']
  children: TagListProps<T>['children']
  className?: string
}

export const TagGroup = <T extends object>({
  label,
  description,
  items,
  children,
  className,
  ...props
}: TagGroupProps<T>) => (
  <AriaTagGroup {...props} className={cn(styles.group, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <TagList items={items} className={styles.list}>
      {children}
    </TagList>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
  </AriaTagGroup>
)

export interface TagProps extends Omit<AriaTagProps, 'className'> {
  className?: string
}

export const Tag = ({ className, children, ...props }: TagProps) => (
  <AriaTag {...props} className={cn(styles.tag, className)}>
    {(renderProps) => (
      <>
        {typeof children === 'function' ? children(renderProps) : children}
        {renderProps.allowsRemoving ? (
          <Button slot="remove" className={styles.remove} aria-label="Remove">
            ✕
          </Button>
        ) : null}
      </>
    )}
  </AriaTag>
)
