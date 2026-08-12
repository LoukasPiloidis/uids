import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FileTrigger } from './FileTrigger'

const meta = {
  title: 'Components/FileTrigger',
  component: FileTrigger,
  parameters: {
    docs: {
      description: {
        component:
          'A styled file picker — a real `<input type="file">` kept hidden behind a `Button`, so the OS dialog and form submission still work. It reports the selection and nothing else: the chosen file name is the caller’s to display, because only the caller knows whether it belongs next to the button or somewhere else on the page.',
      },
    },
  },
  args: { children: 'Choose file' },
} satisfies Meta<typeof FileTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithSelection: Story = {
  name: 'Showing the selection',
  render: () => {
    const [name, setName] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <FileTrigger onSelect={(files) => setName(files?.[0]?.name ?? null)}>
          Choose backup
        </FileTrigger>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
          {name ?? 'No file selected'}
        </span>
      </div>
    )
  },
}

export const Restricted: Story = {
  args: { children: 'Import spreadsheet', acceptedFileTypes: ['.xlsx'] },
}

export const Multiple: Story = {
  args: { children: 'Attach files', allowsMultiple: true },
}

export const Primary: Story = {
  args: { children: 'Upload', variant: 'primary' },
}

export const Disabled: Story = {
  args: { children: 'Choose file', isDisabled: true },
}
