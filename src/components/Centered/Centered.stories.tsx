import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface } from '../Surface/Surface'
import { Text } from '../Text/Text'
import { Centered } from './Centered'

const meta = {
  title: 'Components/Centered',
  component: Centered,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Centres a single block in the viewport on the page background — the shell for sign-in, empty app states and error pages. It is the whole page, so it renders `main` by default; drop `isFullHeight` when nesting it inside a layout that already owns the height.',
      },
    },
  },
  args: { isFullHeight: true },
} satisfies Meta<typeof Centered>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Centered {...args}>
      <Surface padding="lg" elevation="raised" style={{ maxWidth: 360 }}>
        <Text>Everything inside stays centred, vertically and horizontally.</Text>
      </Surface>
    </Centered>
  ),
}
