import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  DateRangePicker as AriaDateRangePicker,
  type DateRangePickerProps as AriaDateRangePickerProps,
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  type DateValue,
  Dialog,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  Text,
  type ValidationResult,
} from 'react-aria-components'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '../../icons'
import { cn } from '../../lib/cn'
import styles from './DatePicker.module.css'
import { DateSegments } from './DateSegments'

// The calendar popover is styled here rather than reusing the `Popover`
// component: a two-month range calendar is wider than the 320px that popover
// caps at, and it brings its own padding.
const CalendarHeader = () => (
  <header className={styles.calendarHeader}>
    <Button slot="previous" className={styles.navButton}>
      <ChevronLeftIcon />
    </Button>
    <Heading className={styles.calendarHeading} />
    <Button slot="next" className={styles.navButton}>
      <ChevronRightIcon />
    </Button>
  </header>
)

export interface DatePickerProps<T extends DateValue>
  extends Omit<AriaDatePickerProps<T>, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  className?: string
}

/**
 * A date field with a calendar. The value is a `@internationalized/date` object,
 * not a string or a `Date` — it carries no time or timezone, so "the 8th" stays
 * the 8th no matter where the user is. Segments are ordered and formatted from
 * the `I18nProvider` locale, so entry follows local convention rather than ISO.
 */
export const DatePicker = <T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: DatePickerProps<T>) => (
  <AriaDatePicker {...props} className={cn(styles.field, className)}>
    {label ? <Label className={styles.label}>{label}</Label> : null}
    <Group className={styles.group}>
      <DateInput className={styles.input}>{DateSegments}</DateInput>
      <Button className={styles.trigger}>
        <CalendarIcon />
      </Button>
    </Group>
    {description ? (
      <Text slot="description" className={styles.description}>
        {description}
      </Text>
    ) : null}
    <FieldError className={styles.error}>{errorMessage}</FieldError>
    <Popover className={styles.popover}>
      <Dialog className={styles.dialog}>
        <Calendar className={styles.calendar}>
          <CalendarHeader />
          <CalendarGrid className={styles.grid}>
            {(date) => <CalendarCell date={date} className={styles.cell} />}
          </CalendarGrid>
        </Calendar>
      </Dialog>
    </Popover>
  </AriaDatePicker>
)

export interface DateRangePickerProps<T extends DateValue>
  extends Omit<AriaDateRangePickerProps<T>, 'className' | 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  /** Months shown side by side in the popover. */
  visibleMonths?: number
  className?: string
}

/**
 * A start and end date in one control. Prefer it over two `DatePicker`s: it
 * enforces end ≥ start itself, so the "to before from" check every hand-rolled
 * pair grows never has to be written.
 */
export const DateRangePicker = <T extends DateValue>({
  label,
  description,
  errorMessage,
  visibleMonths = 2,
  className,
  ...props
}: DateRangePickerProps<T>) => {
  // Each grid renders the month N steps after the calendar's start, so the
  // offset is the identity of the grid and its key.
  const monthOffsets = Array.from({ length: visibleMonths }, (_, index) => index)

  return (
    <AriaDateRangePicker {...props} className={cn(styles.field, className)}>
      {label ? <Label className={styles.label}>{label}</Label> : null}
      <Group className={styles.group}>
        <DateInput slot="start" className={styles.input}>
          {DateSegments}
        </DateInput>
        <span aria-hidden="true" className={styles.rangeSeparator}>
          –
        </span>
        <DateInput slot="end" className={styles.input}>
          {DateSegments}
        </DateInput>
        <Button className={styles.trigger}>
          <CalendarIcon />
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className={styles.description}>
          {description}
        </Text>
      ) : null}
      <FieldError className={styles.error}>{errorMessage}</FieldError>
      <Popover className={styles.popover}>
        <Dialog className={styles.dialog}>
          <RangeCalendar
            className={cn(styles.calendar, styles.rangeCalendar)}
            visibleDuration={{ months: visibleMonths }}
          >
            <CalendarHeader />
            <div className={styles.months}>
              {monthOffsets.map((monthOffset) => (
                <CalendarGrid
                  key={`month-${monthOffset}`}
                  offset={{ months: monthOffset }}
                  className={styles.grid}
                >
                  {(date) => <CalendarCell date={date} className={styles.cell} />}
                </CalendarGrid>
              ))}
            </div>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  )
}
