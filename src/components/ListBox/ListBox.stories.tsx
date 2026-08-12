import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListBox, ListBoxItem } from './ListBox'

const meta = {
  title: 'Components/ListBox',
  component: ListBox,
  parameters: {
    docs: {
      description: {
        component:
          'A selectable list rendered inline, rather than inside a popover. Full keyboard navigation and typeahead come from React Aria. For a list that opens on demand, use `Select`; for a list of commands, use `Menu`.',
      },
    },
  },
  args: {
    'aria-label': 'Categories',
    selectionMode: 'single',
    children: [
      <ListBoxItem key="general" id="general">
        General
      </ListBoxItem>,
      <ListBoxItem key="design" id="design">
        Design
      </ListBoxItem>,
      <ListBoxItem key="engineering" id="engineering">
        Engineering
      </ListBoxItem>,
      <ListBoxItem key="announcements" id="announcements">
        Announcements
      </ListBoxItem>,
    ],
  },
  argTypes: {
    selectionMode: { control: 'inline-radio', options: ['none', 'single', 'multiple'] },
    children: { control: false },
  },
} satisfies Meta<typeof ListBox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SingleSelection: Story = {
  name: 'Single selection',
  args: { selectionMode: 'single', defaultSelectedKeys: ['design'] },
}

export const MultipleSelection: Story = {
  name: 'Multiple selection',
  args: { selectionMode: 'multiple', defaultSelectedKeys: ['design', 'engineering'] },
}

export const DisabledItems: Story = {
  name: 'With disabled items',
  args: { selectionMode: 'single', disabledKeys: ['announcements'] },
}
