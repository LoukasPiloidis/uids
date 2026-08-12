import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField } from './SearchField'

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    docs: {
      description: {
        component:
          'A search input with a built-in clear button. Renders `type="search"`, so Escape clears it and `onSubmit` fires on Enter — behaviour users already expect from browser search fields.',
      },
    },
  },
  args: { placeholder: 'Search threads…' },
  argTypes: { isDisabled: { control: 'boolean' } },
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithLabel: Story = {
  name: 'With label',
  args: { label: 'Search', placeholder: 'Search threads…' },
}

export const WithValue: Story = {
  name: 'With a value (clear button visible)',
  args: { defaultValue: 'design tokens', placeholder: 'Search threads…' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: 'design tokens' },
}
