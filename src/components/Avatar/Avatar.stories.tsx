import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'User image with an initial fallback. The fallback is `aria-hidden` — an avatar is decorative next to a visible name, so it never announces twice.',
      },
    },
  },
  args: { name: 'Loukas Piloidis', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    src: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" />
    </div>
  ),
}

export const WithImage: Story = {
  name: 'With image',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Avatar size="lg" src="https://i.pravatar.cc/96?img=12" name="Ada Lovelace" />
      <Avatar size="lg" name="Ada Lovelace" />
    </div>
  ),
}

export const FallbackWithoutName: Story = {
  name: 'No name available',
  render: () => <Avatar size="lg" />,
}
