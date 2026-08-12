import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Indeterminate loading. Backed by React Aria `ProgressBar`, so it announces as a live progress indicator rather than being invisible to screen readers. Always give it a `label` describing what is loading.',
      },
    },
  },
  args: { label: 'Loading', size: 18 },
  argTypes: { size: { control: { type: 'range', min: 12, max: 48, step: 2 } } },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <Spinner size={14} label="Loading" />
      <Spinner size={18} label="Loading" />
      <Spinner size={28} label="Loading" />
      <Spinner size={40} label="Loading" />
    </div>
  ),
}

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)',
      }}
    >
      <Spinner size={14} label="Loading replies" />
      Loading replies…
    </div>
  ),
}

export const InAButton: Story = {
  name: 'In a button',
  render: () => (
    <Button isDisabled>
      <Spinner size={14} label="Saving" />
      Saving…
    </Button>
  ),
}
