import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'A boolean choice that takes effect on save. If the change applies immediately, use `Switch` instead — the difference is what the user expects to happen when they click it.',
      },
    },
  },
  args: { children: 'Email me about replies' },
  argTypes: {
    isSelected: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isDisabled defaultSelected>
        Disabled and checked
      </Checkbox>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend
        style={{
          padding: 0,
          marginBottom: 'var(--space-3)',
          color: 'var(--ink)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-semi)',
        }}
      >
        Notify me about
      </legend>
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <Checkbox defaultSelected>Replies to my threads</Checkbox>
        <Checkbox defaultSelected>Direct mentions</Checkbox>
        <Checkbox>Everything in categories I follow</Checkbox>
      </div>
    </fieldset>
  ),
}
