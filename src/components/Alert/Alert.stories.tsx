import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'A message that stays on the page and belongs to what is around it — a failed save, form-level validation, the result of an import. Use `Toast` instead when the message is transient and unrelated to a specific region; the danger and warning tones announce themselves via `role="alert"`.',
      },
    },
  },
  args: { tone: 'info', children: 'Nine rows imported. Two were skipped as duplicates.' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['accent', 'info', 'neutral', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)', maxWidth: 520 }}>
      <Alert tone="accent">Your changes are live.</Alert>
      <Alert tone="info">Nine rows imported. Two were skipped as duplicates.</Alert>
      <Alert tone="neutral">Nothing has been scheduled for this week yet.</Alert>
      <Alert tone="warning">Three games could not be filled at this level.</Alert>
      <Alert tone="danger">Could not reach the server. Your edit was not saved.</Alert>
    </div>
  ),
}

export const WithTitle: Story = {
  name: 'With title',
  args: {
    tone: 'danger',
    title: 'Save failed',
    children: 'The name is already taken. Pick another and try again.',
  },
}

export const Dismissible: Story = {
  args: {
    tone: 'warning',
    title: 'Unfilled slots',
    children: 'Three games are still missing a third official.',
    onDismiss: () => {},
  },
}

export const RichContent: Story = {
  name: 'Rich content',
  args: {
    tone: 'warning',
    title: 'Two rows need attention',
    children: (
      <ul style={{ paddingLeft: '1.1em' }}>
        <li>Row 4 — official already assigned that day</li>
        <li>Row 9 — no eligible official at this level</li>
      </ul>
    ),
  },
}
