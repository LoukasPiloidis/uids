import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'An immediate on/off toggle. Because it applies instantly there is no Save button to confirm it — if the change needs confirmation or belongs to a form, use `Checkbox`.',
      },
    },
  },
  args: { children: 'Post anonymously' },
  argTypes: {
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      <Switch>Off</Switch>
      <Switch defaultSelected>On</Switch>
      <Switch isDisabled>Disabled</Switch>
      <Switch isDisabled defaultSelected>
        Disabled and on
      </Switch>
    </div>
  ),
}

export const WithoutLabel: Story = {
  name: 'Without a visible label',
  render: () => <Switch aria-label="Post anonymously" />,
}
