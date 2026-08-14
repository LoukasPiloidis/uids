import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ComboBox, ComboBoxItem } from './ComboBox'

const timezones = [
  'Africa/Cairo',
  'America/New_York',
  'America/Sao_Paulo',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Athens',
  'Europe/Berlin',
  'Europe/London',
  'Pacific/Auckland',
]

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
  parameters: {
    docs: {
      description: {
        component:
          'A Select you can type into. Choose it over `Select` when the list is long enough that scanning is slower than typing, or when the user already knows the value by name. Pass `onCreate` to turn it into a search-or-create field: when the typed text matches no existing option, a "Create …" row is appended to the results and picking it hands you the trimmed text. Prefer that over `allowsCustomValue` whenever the new value has to be persisted rather than just accepted.',
      },
    },
  },
  args: {
    label: 'Timezone',
    placeholder: 'Start typing…',
    children: timezones.map((zone) => (
      <ComboBoxItem key={zone} id={zone}>
        {zone}
      </ComboBoxItem>
    )),
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    allowsCustomValue: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof ComboBox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDescription: Story = {
  name: 'With description',
  args: { description: 'Used for timestamps across the site.' },
}

export const WithSelection: Story = {
  name: 'With a selection',
  args: { defaultSelectedKey: 'Europe/Athens' },
}

export const AllowsCustomValue: Story = {
  name: 'Accepting a custom value',
  args: {
    label: 'Tag',
    placeholder: 'Pick or invent one',
    allowsCustomValue: true,
    description: 'Not in the list? Type it anyway.',
  },
}

export const Creatable: Story = {
  name: 'Search or create',
  parameters: {
    docs: {
      description: {
        story:
          'Type a name that already exists and you get the match; type one that does not and the create row appears. Matching is case-insensitive and ignores surrounding whitespace, so "bench press" will not offer to create a duplicate of "Bench Press".',
      },
    },
  },
  render: () => {
    const [exercises, setExercises] = useState(['Bench Press', 'Barbell Squat', 'Pull-Up'])
    const [selected, setSelected] = useState<string | null>(null)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <ComboBox
          label="Exercise"
          placeholder="Search or add…"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key === null ? null : String(key))}
          onCreate={(name) => {
            setExercises((current) => [...current, name])
            setSelected(name)
          }}
        >
          {exercises.map((name) => (
            <ComboBoxItem key={name} id={name}>
              {name}
            </ComboBoxItem>
          ))}
        </ComboBox>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
          {exercises.length} in the library · selected: {selected ?? 'none'}
        </span>
      </div>
    )
  },
}

export const CreatableEmpty: Story = {
  name: 'Search or create — empty library',
  render: () => (
    <ComboBox
      label="Exercise"
      placeholder="Search or add…"
      onCreate={() => {}}
      emptyState="No exercises yet."
    >
      {[]}
    </ComboBox>
  ),
}

export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Pick a timezone from the list.' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultSelectedKey: 'Europe/London' },
}
