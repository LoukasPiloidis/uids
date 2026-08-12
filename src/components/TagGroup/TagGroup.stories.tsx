import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, TagGroup } from './TagGroup'

const meta = {
  title: 'Components/TagGroup',
  component: TagGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Interactive chips — filters, or a set of applied labels. Pass `onRemove` and each tag grows a remove button. For a static, non-interactive label use `Badge`.',
      },
    },
  },
  args: {
    label: 'Filter by tag',
    selectionMode: 'multiple',
    children: [
      <Tag key="design" id="design">
        design
      </Tag>,
      <Tag key="tokens" id="tokens">
        tokens
      </Tag>,
      <Tag key="a11y" id="a11y">
        accessibility
      </Tag>,
      <Tag key="rfc" id="rfc">
        rfc
      </Tag>,
    ],
  },
  argTypes: {
    selectionMode: { control: 'inline-radio', options: ['none', 'single', 'multiple'] },
    children: { control: false },
    items: { control: false },
  },
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SingleSelection: Story = {
  name: 'Single selection',
  args: { selectionMode: 'single', defaultSelectedKeys: ['tokens'] },
}

export const Removable: Story = {
  args: {
    label: 'Applied tags',
    selectionMode: 'none',
    description: 'Press Backspace on a focused tag to remove it.',
    onRemove: () => {},
  },
}

export const NonInteractive: Story = {
  name: 'Read-only',
  args: { label: 'Tags', selectionMode: 'none', onRemove: undefined },
}
