import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberField } from './NumberField'

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  parameters: {
    docs: {
      description: {
        component:
          'Numeric input with steppers, locale-aware formatting and keyboard increment. Hands the call site a real `number` rather than a string, so consumers never parse a change event — reach for it over `TextField type="number"`, which does neither.',
      },
    },
  },
  args: { label: 'Quantity', defaultValue: 4 },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    hideStepper: { control: 'boolean' },
  },
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: {
    label: 'Games per month',
    defaultValue: 4,
    minValue: 0,
    maxValue: 50,
    description: 'Target load. The scheduler treats this as a soft ceiling.',
  },
}

export const Bounded: Story = {
  args: { label: 'Rating', defaultValue: 3, minValue: 1, maxValue: 5 },
}

export const Currency: Story = {
  args: {
    label: 'Fee',
    defaultValue: 45,
    formatOptions: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' },
  },
}

export const Percentage: Story = {
  args: { label: 'Completion', defaultValue: 0.72, formatOptions: { style: 'percent' } },
}

export const NoStepper: Story = {
  name: 'Without steppers',
  args: { label: 'Sort order', defaultValue: 2, hideStepper: true },
}

export const Invalid: Story = {
  args: {
    label: 'Rating',
    defaultValue: 9,
    isInvalid: true,
    errorMessage: 'Pick a value between 1 and 5.',
  },
}

export const Disabled: Story = {
  args: { label: 'Seats', defaultValue: 12, isDisabled: true },
}
