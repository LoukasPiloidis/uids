import type { ComponentProps } from 'react'
import { DateSegment } from 'react-aria-components'
import styles from './DatePicker.module.css'

// Derived from the component rather than imported from `react-stately`, which
// is React Aria's internal dependency and not one this package declares.
type Segment = ComponentProps<typeof DateSegment>['segment']

/**
 * `DateInput`'s render function, shared by `DatePicker` and both halves of
 * `DateRangePicker`. Passed by reference rather than inlined so the three call
 * sites cannot drift apart.
 */
export const DateSegments = (segment: Segment) => (
  <DateSegment segment={segment} className={styles.segment} />
)
