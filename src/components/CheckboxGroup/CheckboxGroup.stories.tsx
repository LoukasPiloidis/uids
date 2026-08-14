import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../Checkbox/Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A labelled set of checkboxes sharing one value array, one validation message and one accessible group name. Use it whenever more than one checkbox belongs to the same question — a lone `Checkbox` for a standalone toggle, and `Select` or `ListBox` with `selectionMode="multiple"` when the list is long enough to need scrolling.',
      },
    },
  },
  args: { label: 'Body parts', orientation: 'vertical' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
} satisfies Meta<typeof CheckboxGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <CheckboxGroup {...args} defaultValue={['chest']}>
      <Checkbox value="chest">Chest</Checkbox>
      <Checkbox value="back">Back</Checkbox>
      <Checkbox value="legs">Legs</Checkbox>
      <Checkbox value="shoulders">Shoulders</Checkbox>
    </CheckboxGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup label="Equipment" orientation="horizontal" defaultValue={['barbell']}>
      <Checkbox value="barbell">Barbell</Checkbox>
      <Checkbox value="dumbbell">Dumbbell</Checkbox>
      <Checkbox value="cable">Cable</Checkbox>
      <Checkbox value="bodyweight">Bodyweight</Checkbox>
    </CheckboxGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <CheckboxGroup label="Body parts" isInvalid errorMessage="Pick at least one body part.">
      <Checkbox value="chest">Chest</Checkbox>
      <Checkbox value="back">Back</Checkbox>
    </CheckboxGroup>
  ),
}

export const Empty: Story = {
  render: () => (
    <CheckboxGroup
      label="Body parts"
      renderEmptyState={() => 'No body parts yet — create one first.'}
    />
  ),
}
