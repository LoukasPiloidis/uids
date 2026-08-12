import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Toaster, toast } from './Toast'

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          'Transient confirmation of something that already happened. Mount `<Toaster />` once at the app root, then call `toast()` from anywhere — no context or hook required. Never put a required action in one; they disappear.',
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Tones: Story = {
  render: () => (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <Button
          variant="secondary"
          onPress={() => toast({ title: 'Draft saved', tone: 'neutral' })}
        >
          Neutral
        </Button>
        <Button
          variant="secondary"
          onPress={() => toast({ title: 'Thread published', tone: 'accent' })}
        >
          Accent
        </Button>
        <Button
          variant="secondary"
          onPress={() => toast({ title: 'Moved to Design', tone: 'info' })}
        >
          Info
        </Button>
        <Button
          variant="secondary"
          onPress={() => toast({ title: 'Could not save', tone: 'danger' })}
        >
          Danger
        </Button>
      </div>
      <Toaster />
    </>
  ),
}

export const WithDescription: Story = {
  name: 'With a description',
  render: () => (
    <>
      <Button
        onPress={() =>
          toast({
            title: 'Thread published',
            description: 'Everyone watching Design has been notified.',
            tone: 'accent',
          })
        }
      >
        Publish
      </Button>
      <Toaster />
    </>
  ),
}

export const AutoDismiss: Story = {
  name: 'Auto-dismissing',
  render: () => (
    <>
      <Button
        variant="secondary"
        onPress={() => toast({ title: 'Copied link', tone: 'neutral' }, { timeout: 3000 })}
      >
        Copy link (dismisses after 3s)
      </Button>
      <Toaster />
    </>
  ),
}

export const Stacked: Story = {
  render: () => (
    <>
      <Button
        variant="secondary"
        onPress={() => {
          toast({ title: 'First', tone: 'neutral' })
          toast({ title: 'Second', tone: 'info' })
          toast({ title: 'Third', tone: 'accent' })
        }}
      >
        Fire three at once
      </Button>
      <Toaster />
    </>
  ),
}
