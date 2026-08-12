import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { I18nProvider } from 'react-aria-components'
import { DatePicker, DateRangePicker } from './DatePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'A date field with a calendar. The value is an `@internationalized/date` object rather than a string or a `Date` — it carries no time or timezone, so "the 8th" stays the 8th wherever the user is. Segment order and formatting follow the `I18nProvider` locale. For a start and end together use `DateRangePicker`, which enforces end ≥ start itself.',
      },
    },
  },
  args: { label: 'Match day' },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithValue: Story = {
  name: 'With a value',
  args: { label: 'Match day', defaultValue: parseDate('2026-02-08') },
}

export const Bounded: Story = {
  name: 'No past dates',
  args: {
    label: 'Blocked day',
    minValue: today(getLocalTimeZone()),
    description: 'Days already played cannot be blocked.',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Match day',
    defaultValue: parseDate('2026-02-08'),
    isInvalid: true,
    errorMessage: 'That day falls outside the season.',
  },
}

export const Disabled: Story = {
  args: { label: 'Match day', defaultValue: parseDate('2026-02-08'), isDisabled: true },
}

export const Localized: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The same component under `el-GR`: segments reorder to day-month-year and the calendar starts its week on Monday. Nothing here is configured per-locale — it all comes from `I18nProvider`.',
      },
    },
  },
  render: () => (
    <I18nProvider locale="el-GR">
      <DatePicker label="Ημερομηνία αγώνα" defaultValue={parseDate('2026-02-08')} />
    </I18nProvider>
  ),
}

export const Range: Story = {
  render: () => (
    <DateRangePicker
      label="Unavailable"
      defaultValue={{ start: parseDate('2026-02-08'), end: parseDate('2026-02-15') }}
      description="Both ends are included."
    />
  ),
}

export const RangeSingleMonth: Story = {
  name: 'Range, one month',
  render: () => <DateRangePicker label="Unavailable" visibleMonths={1} />,
}
