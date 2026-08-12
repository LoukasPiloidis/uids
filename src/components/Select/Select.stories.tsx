import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectItem } from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Pick one option from a known, short list. The list is not filterable — once it passes roughly a dozen options, or the user is likely to know what they want by name, switch to `ComboBox`.',
      },
    },
  },
  args: {
    label: 'Category',
    placeholder: 'Select…',
    children: [
      <SelectItem key="general" id="general">
        General
      </SelectItem>,
      <SelectItem key="design" id="design">
        Design
      </SelectItem>,
      <SelectItem key="engineering" id="engineering">
        Engineering
      </SelectItem>,
      <SelectItem key="announcements" id="announcements">
        Announcements
      </SelectItem>,
    ],
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: { description: 'Threads can be moved later.' },
}

export const WithSelection: Story = {
  name: 'With a selection',
  args: { defaultSelectedKey: 'design' },
}

export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Pick a category before posting.' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultSelectedKey: 'general' },
}

export const DisabledOption: Story = {
  name: 'With a disabled option',
  args: { disabledKeys: ['announcements'], description: 'Announcements are moderator-only.' },
}
