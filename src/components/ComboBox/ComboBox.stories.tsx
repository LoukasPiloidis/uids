import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComboBox, ComboBoxItem } from './ComboBox'

const timezones = [
  'Africa/Cairo',
  'America/New_York',
  'America/Sao_Paulo',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Athens',
  'Europe/Berlin',
  'Europe/London',
  'Pacific/Auckland',
]

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
  parameters: {
    docs: {
      description: {
        component:
          'A Select you can type into. Choose it over `Select` when the list is long enough that scanning is slower than typing, or when the user already knows the value by name.',
      },
    },
  },
  args: {
    label: 'Timezone',
    placeholder: 'Start typing…',
    children: timezones.map((zone) => (
      <ComboBoxItem key={zone} id={zone}>
        {zone}
      </ComboBoxItem>
    )),
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    allowsCustomValue: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof ComboBox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: { description: 'Used for timestamps across the site.' },
}

export const WithSelection: Story = {
  name: 'With a selection',
  args: { defaultSelectedKey: 'Europe/Athens' },
}

export const AllowsCustomValue: Story = {
  name: 'Accepting a custom value',
  args: {
    label: 'Tag',
    placeholder: 'Pick or invent one',
    allowsCustomValue: true,
    description: 'Not in the list? Type it anyway.',
  },
}

export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Pick a timezone from the list.' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultSelectedKey: 'Europe/London' },
}
