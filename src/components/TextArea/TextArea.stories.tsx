import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from './TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input. Set `rows` to signal how much writing you expect — a two-row box invites a sentence, an eight-row box invites a post. `mono` switches to the monospace family for code or configuration.',
      },
    },
  },
  args: { label: 'Reply', placeholder: 'Share your thoughts…', rows: 4 },
  argTypes: {
    rows: { control: { type: 'range', min: 2, max: 12, step: 1 } },
    mono: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: {
    label: 'Bio',
    description: 'Shown on your profile. Markdown is supported.',
    rows: 5,
  },
}

export const Monospace: Story = {
  args: {
    label: 'Custom tokens',
    mono: true,
    rows: 6,
    defaultValue: ':root {\n  --accent: #147a52;\n  --radius-md: 6px;\n}',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Reply',
    defaultValue: 'x',
    isInvalid: true,
    errorMessage: 'Replies must be at least 10 characters.',
  },
}

export const Disabled: Story = {
  args: { label: 'Reply', defaultValue: 'This thread is locked.', isDisabled: true },
}
