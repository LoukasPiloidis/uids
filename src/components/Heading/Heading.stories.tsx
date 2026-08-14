import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './Heading'

const meta = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component:
          'Section and page titles. `level` drives both the type scale and the tag, so the visual hierarchy and the document outline stay in step by default — reach for `as` only when they genuinely need to diverge (a visually small page title, say). For body copy use `Text`.',
      },
    },
  },
  args: { children: 'Lower body — week 3', level: 2 },
  argTypes: { level: { control: 'inline-radio', options: [1, 2, 3, 4] } },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Levels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <Heading level={1}>Level 1 — page title</Heading>
      <Heading level={2}>Level 2 — section heading</Heading>
      <Heading level={3}>Level 3 — subsection</Heading>
      <Heading level={4}>Level 4 — card title</Heading>
    </div>
  ),
}

export const OutlineOverride: Story = {
  name: 'Tag override',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <Heading level={4} as="h2">
        Renders an h2, sized as level 4
      </Heading>
    </div>
  ),
}
