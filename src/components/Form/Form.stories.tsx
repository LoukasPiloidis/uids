import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { TextField } from '../TextField/TextField'
import { Form } from './Form'

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          'A form element that stacks its fields with consistent vertical rhythm and wires React Aria native validation. It is layout and validation plumbing only — it deliberately knows nothing about form state, so pair it with whatever form library the consuming app uses (react-hook-form, TanStack Form) by controlling the fields inside it.',
      },
    },
  },
  args: { gap: 'md' },
  argTypes: { gap: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Form {...args} style={{ maxWidth: 320 }}>
      <TextField label="Name" name="name" isRequired />
      <TextField label="Email" name="email" type="email" isRequired />
      <Button type="submit">Save</Button>
    </Form>
  ),
}

export const NativeValidation: Story = {
  render: () => (
    <Form validationBehavior="native" style={{ maxWidth: 320 }}>
      <TextField label="Programme name" name="programme" isRequired />
      <Button type="submit">Create</Button>
    </Form>
  ),
}
