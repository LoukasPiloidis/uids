import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface } from './Surface'

const meta = {
  title: 'Components/Surface',
  component: Surface,
  parameters: {
    docs: {
      description: {
        component:
          'The card primitive — a bordered container on `--surface`. Use `as` to render the right semantic element (`article` for a post, `li` inside a list) rather than nesting a div inside one.',
      },
    },
  },
  args: { elevation: 'flat', padding: 'md', children: 'Surface content' },
  argTypes: {
    elevation: { control: 'inline-radio', options: ['flat', 'raised'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    as: { control: false },
  },
} satisfies Meta<typeof Surface>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Elevation: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-4)',
        background: 'var(--paper)',
        padding: 'var(--space-6)',
      }}
    >
      <Surface elevation="flat">
        <strong style={{ color: 'var(--ink)' }}>Flat</strong>
        <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--text-muted)' }}>
          Hairline only. The default for content that sits in a list.
        </p>
      </Surface>
      <Surface elevation="raised">
        <strong style={{ color: 'var(--ink)' }}>Raised</strong>
        <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--text-muted)' }}>
          Adds a soft shadow. Reserve it for things that float above the page.
        </p>
      </Surface>
    </div>
  ),
}

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Surface key={padding} padding={padding}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
            padding="{padding}"
          </code>
        </Surface>
      ))}
    </div>
  ),
}

export const AsAnArticle: Story = {
  name: 'Semantic element',
  render: () => (
    <Surface as="article" elevation="flat" padding="lg">
      <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: 'var(--text-xl)' }}>
        Rendering as &lt;article&gt;
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-reading)',
          lineHeight: 'var(--lh-reading)',
          color: 'var(--text)',
          maxWidth: 'var(--measure)',
        }}
      >
        Passing <code>as="article"</code> keeps the document outline meaningful without wrapping the
        card in yet another element.
      </p>
    </Surface>
  ),
}
