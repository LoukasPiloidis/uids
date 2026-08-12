import type { ReactNode } from 'react'
import {
  Cell as AriaCell,
  type CellProps as AriaCellProps,
  Column as AriaColumn,
  type ColumnProps as AriaColumnProps,
  Row as AriaRow,
  type RowProps as AriaRowProps,
  Table as AriaTable,
  TableBody as AriaTableBody,
  type TableBodyProps as AriaTableBodyProps,
  TableHeader as AriaTableHeader,
  type TableHeaderProps as AriaTableHeaderProps,
  type TableProps as AriaTableProps,
} from 'react-aria-components'
import { ChevronDownIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './Table.module.css'

export interface TableProps extends Omit<AriaTableProps, 'className'> {
  /** `compact` tightens the row padding for dense, data-heavy grids. */
  density?: 'comfortable' | 'compact'
  className?: string
}

/**
 * Wraps the table in its own scroll container: a wide table scrolls inside its
 * border instead of pushing the page sideways. `className` lands on the
 * `<table>` itself.
 */
export const Table = ({ density = 'comfortable', className, ...props }: TableProps) => (
  <div className={styles.container}>
    <AriaTable {...props} className={cn(styles.table, styles[density], className)} />
  </div>
)

export interface TableHeaderProps<T extends object>
  extends Omit<AriaTableHeaderProps<T>, 'className'> {
  className?: string
}

const TableHeaderWrapper = <T extends object>({ className, ...props }: TableHeaderProps<T>) => (
  <AriaTableHeader {...props} className={cn(styles.header, className)} />
)

export { TableHeaderWrapper as TableHeader }

export interface ColumnProps extends Omit<AriaColumnProps, 'className' | 'children'> {
  children?: ReactNode
  className?: string
}

/**
 * A column header. Pass `isRowHeader` to the column that names the row — screen
 * readers announce it during row navigation, so without one every row is a bag
 * of anonymous cells. `allowsSorting` adds the sort affordance; the table owns
 * the `sortDescriptor`.
 */
export const Column = ({ children, className, ...props }: ColumnProps) => (
  <AriaColumn {...props} className={cn(styles.column, className)}>
    {({ allowsSorting, sortDirection }) => (
      <span className={styles.columnInner}>
        <span className={styles.columnLabel}>{children}</span>
        {allowsSorting ? (
          // Present but transparent until sorted, so the header does not reflow
          // the first time a column is clicked.
          <span aria-hidden="true" className={styles.sortIndicator} data-direction={sortDirection}>
            <ChevronDownIcon />
          </span>
        ) : null}
      </span>
    )}
  </AriaColumn>
)

export interface TableBodyProps<T extends object> extends Omit<AriaTableBodyProps<T>, 'className'> {
  /** Shown when the collection is empty — a friendlier `renderEmptyState`. */
  emptyState?: ReactNode
  className?: string
}

const TableBodyWrapper = <T extends object>({
  emptyState,
  renderEmptyState,
  className,
  ...props
}: TableBodyProps<T>) => (
  <AriaTableBody
    {...props}
    className={cn(styles.body, className)}
    renderEmptyState={
      emptyState !== undefined
        ? () => <div className={styles.empty}>{emptyState}</div>
        : renderEmptyState
    }
  />
)

export { TableBodyWrapper as TableBody }

export interface RowProps<T extends object> extends Omit<AriaRowProps<T>, 'className'> {
  className?: string
  /** Escape hatch for row state the consumer styles in CSS, e.g. `data-stale`. */
  [dataAttribute: `data-${string}`]: unknown
}

const RowWrapper = <T extends object>({ className, ...props }: RowProps<T>) => (
  <AriaRow {...props} className={cn(styles.row, className)} />
)

export { RowWrapper as Row }

export interface CellProps extends Omit<AriaCellProps, 'className'> {
  className?: string
  /**
   * Escape hatch for cell state the consumer styles in CSS, e.g. `data-invalid`
   * on a cell that failed a domain rule. React Aria forwards it to the `<td>`.
   */
  [dataAttribute: `data-${string}`]: unknown
}

export const Cell = ({ className, ...props }: CellProps) => (
  <AriaCell {...props} className={cn(styles.cell, className)} />
)
