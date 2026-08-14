import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          'Shows how far along a known-length task is. Use it when the total is knowable — steps completed, weeks of a programme finished, bytes uploaded — and `Spinner` when it is not. Set `isIndeterminate` for work that has started but has no measurable end.',
      },
    },
  },
  args: { label: 'Week 3 of 8', value: 37, tone: 'accent', size: 'md' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['accent', 'success', 'warning', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: 320 }}>
      <ProgressBar label="In progress" value={45} tone="accent" />
      <ProgressBar label="Complete" value={100} tone="success" valueLabel="Done" />
      <ProgressBar label="Behind schedule" value={20} tone="warning" />
      <ProgressBar label="Failed" value={60} tone="danger" />
    </div>
  ),
}

export const WithoutLabel: Story = {
  args: { label: undefined, valueLabel: undefined, 'aria-label': 'Upload progress' },
}

export const Indeterminate: Story = {
  args: { label: 'Syncing', isIndeterminate: true, valueLabel: ' ' },
}
