import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The primary action control. Built on React Aria `Button`, so it handles keyboard, touch and pointer press consistently and exposes `data-hovered` / `data-pressed` / `data-focus-visible` for styling. Use `onPress`, not `onClick`. While `isPending` it blocks presses without going disabled, so it stays focusable and announces itself as busy.',
      },
    },
  },
  args: {
    children: 'Save changes',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'One primary per view. Danger is for destructive, irreversible actions.',
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Delete
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
    </div>
  ),
}

export const Pending: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A pending button keeps its colour and its focus, unlike a disabled one — the press is swallowed, not the control. Give it a `pendingLabel` so a slow save reads as progress rather than a click that did nothing.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <Button {...args} isPending pendingLabel="Saving…">
        Save changes
      </Button>
      <Button {...args} isPending variant="secondary">
        No pending label
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <Button {...args} isDisabled variant="primary">
        Primary
      </Button>
      <Button {...args} isDisabled variant="secondary">
        Secondary
      </Button>
      <Button {...args} isDisabled variant="ghost">
        Ghost
      </Button>
      <Button {...args} isDisabled variant="danger">
        Danger
      </Button>
    </div>
  ),
}
