import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from '../../icons'
import { Button } from '../Button/Button'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          'What a list shows when it has nothing in it. Give it an action whenever the user can actually fix the emptiness — an empty state without a next step is a dead end.',
      },
    },
  },
  args: {
    title: 'No threads yet',
    description: 'Start the first conversation in this category.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithAction: Story = {
  name: 'With an action',
  args: {
    title: 'No threads yet',
    description: 'Start the first conversation in this category.',
    action: <Button>New thread</Button>,
  },
}

export const WithIcon: Story = {
  name: 'With an icon',
  args: {
    icon: <SearchIcon width={28} height={28} />,
    title: 'No results for “tokens”',
    description: 'Check the spelling, or try a broader search term.',
  },
}

export const TitleOnly: Story = {
  name: 'Title only',
  args: { title: 'Nothing here', description: undefined },
}
