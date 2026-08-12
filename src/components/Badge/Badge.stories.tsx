import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'A small status label. Non-interactive by design — if it needs a click or a remove affordance, reach for `TagGroup` instead.',
      },
    },
  },
  args: { children: 'Open', tone: 'neutral' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['accent', 'info', 'neutral', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="accent">Published</Badge>
      <Badge tone="info">In review</Badge>
      <Badge tone="warning">Stale</Badge>
      <Badge tone="danger">Blocked</Badge>
    </div>
  ),
}
