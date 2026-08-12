import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './TextField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text input with a label, optional description and validation message. React Aria wires the label, description and error to the input via `aria-describedby` automatically — never fake a label with a placeholder.',
      },
    },
  },
  args: { label: 'Display name', placeholder: 'How others will see you' },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: {
    label: 'Username',
    description: 'Lowercase letters, numbers and hyphens only.',
    placeholder: 'ada-lovelace',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    isInvalid: true,
    errorMessage: 'Enter a valid email address.',
  },
}

export const Required: Story = {
  args: { label: 'Title', isRequired: true, placeholder: 'Give the thread a title' },
}

export const Disabled: Story = {
  args: { label: 'Workspace', defaultValue: 'piloidis', isDisabled: true },
}

export const Form: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 380 }}>
      <TextField label="Display name" placeholder="Ada Lovelace" />
      <TextField label="Email" type="email" description="We never show this publicly." />
      <TextField label="Password" type="password" isRequired />
    </div>
  ),
}
