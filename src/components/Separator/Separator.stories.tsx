import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          'A semantic divider (`role="separator"`). Use it when the split carries meaning; for purely decorative spacing, a border or margin is lighter.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ color: 'var(--text)' }}>
      <p style={{ marginTop: 0 }}>Everything above the line.</p>
      <Separator />
      <p style={{ marginBottom: 0 }}>Everything below it.</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        height: 24,
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)',
      }}
    >
      <span>12 replies</span>
      <Separator orientation="vertical" />
      <span>Last active 2h ago</span>
      <Separator orientation="vertical" />
      <span>4 participants</span>
    </div>
  ),
}
