import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Navigation, not action. Renders an anchor when given `href`; pass `onPress` instead for a router-driven link. If the result is a state change rather than a navigation, use `Button variant="ghost"`.',
      },
    },
  },
  args: { children: 'Read the thread', href: '#' },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const InProse: Story = {
  name: 'In prose',
  render: () => (
    <p
      style={{
        fontFamily: 'var(--font-reading)',
        fontSize: 'var(--text-md)',
        lineHeight: 'var(--lh-reading)',
        maxWidth: 'var(--measure)',
        color: 'var(--text)',
      }}
    >
      The migration notes are worth reading before you start — see{' '}
      <Link href="#">the design system overview</Link> for the reasoning behind the token layer, or
      skip straight to <Link href="#">the component inventory</Link>.
    </p>
  ),
}

export const External: Story = {
  render: () => (
    <Link href="https://react-spectrum.adobe.com/react-aria/" target="_blank" rel="noreferrer">
      React Aria Components documentation
    </Link>
  ),
}
