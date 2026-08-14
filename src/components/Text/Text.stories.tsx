import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'Body copy with the type tokens already applied. Size and tone are independent axes — `size` picks the step on the type scale, `tone` picks the text colour — so a small muted caption is `size="sm" tone="muted"` rather than a single conflated variant. Use `Heading` for titles, and `isReading` for long-form prose that should wrap at `--measure`.',
      },
    },
  },
  args: { children: 'Four sets of eight, two minutes rest.', size: 'base', tone: 'default' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'base', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'subtle', 'accent', 'danger'] },
    weight: { control: 'inline-radio', options: ['normal', 'medium', 'semi', 'bold'] },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <Text size="lg">Large — lead paragraph</Text>
      <Text size="md">Medium — reading body</Text>
      <Text size="base">Base — the UI default</Text>
      <Text size="sm">Small — meta and labels</Text>
      <Text size="xs">Extra small — timestamps and counts</Text>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <Text tone="default">Default — primary body copy</Text>
      <Text tone="muted">Muted — secondary and supporting</Text>
      <Text tone="subtle">Subtle — hints and timestamps</Text>
      <Text tone="accent">Accent — emphasis inside copy</Text>
      <Text tone="danger">Danger — validation and failures</Text>
    </div>
  ),
}

export const Reading: Story = {
  args: {
    isReading: true,
    size: 'md',
    children:
      'Progressive overload is the gradual increase of stress placed on the body during training. It is the single most reliable driver of adaptation, and it is why the same programme run twice at the same load produces diminishing returns the second time.',
  },
}
