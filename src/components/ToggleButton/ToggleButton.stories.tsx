import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleButton, ToggleButtonGroup } from './ToggleButton'

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component:
          'A button that stays pressed. Reports `aria-pressed`, so assistive tech announces the state — unlike a `Switch`, which is a form control, this belongs in toolbars and segmented controls.',
      },
    },
  },
  args: { children: 'Bold' },
  argTypes: {
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ToggleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      <ToggleButton>Off</ToggleButton>
      <ToggleButton defaultSelected>On</ToggleButton>
      <ToggleButton isDisabled>Disabled</ToggleButton>
    </div>
  ),
}

export const Toolbar: Story = {
  name: 'As a formatting toolbar',
  render: () => (
    <ToggleButtonGroup selectionMode="multiple" style={{ display: 'flex', gap: 'var(--space-1)' }}>
      <ToggleButton id="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleButton>
      <ToggleButton id="italic" aria-label="Italic">
        <em>I</em>
      </ToggleButton>
      <ToggleButton id="code" aria-label="Code">
        <code>{'</>'}</code>
      </ToggleButton>
    </ToggleButtonGroup>
  ),
}

export const SegmentedControl: Story = {
  name: 'As a segmented control',
  render: () => (
    <ToggleButtonGroup
      selectionMode="single"
      defaultSelectedKeys={['newest']}
      disallowEmptySelection
      style={{ display: 'flex', gap: 'var(--space-1)' }}
    >
      <ToggleButton id="newest">Newest</ToggleButton>
      <ToggleButton id="top">Top</ToggleButton>
      <ToggleButton id="oldest">Oldest</ToggleButton>
    </ToggleButtonGroup>
  ),
}
