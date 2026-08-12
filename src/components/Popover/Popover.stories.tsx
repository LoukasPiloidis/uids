import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { DialogTrigger, Popover } from './Popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'Non-modal content anchored to a trigger. The page stays interactive behind it — if the user must deal with it before continuing, use `Dialog`. For a short hint on hover, use `Tooltip`.',
      },
    },
  },
  // `children` is required on PopoverProps, so it has to be present here even
  // though every story below passes its own as JSX.
  args: { showArrow: true, placement: 'bottom', children: null },
  argTypes: {
    showArrow: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'bottom start', 'bottom end'],
    },
    children: { control: false },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button variant="secondary">Show details</Button>
      <Popover {...args}>
        <div style={{ maxWidth: 260 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 'var(--weight-semi)',
              color: 'var(--ink)',
            }}
          >
            Anonymous posting
          </p>
          <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--text-muted)' }}>
            Your name is hidden from other members, but moderators can still see it.
          </p>
        </div>
      </Popover>
    </DialogTrigger>
  ),
}

export const WithoutArrow: Story = {
  name: 'Without an arrow',
  render: () => (
    <DialogTrigger>
      <Button variant="secondary">Show details</Button>
      <Popover showArrow={false}>
        <div style={{ maxWidth: 240, color: 'var(--text)' }}>Anchored without the arrow tip.</div>
      </Popover>
    </DialogTrigger>
  ),
}

export const WithActions: Story = {
  name: 'With actions',
  render: () => (
    <DialogTrigger>
      <Button variant="secondary">Move thread</Button>
      <Popover>
        <div style={{ maxWidth: 280 }}>
          <p style={{ margin: 0, fontWeight: 'var(--weight-semi)', color: 'var(--ink)' }}>
            Move to Design?
          </p>
          <p style={{ margin: 'var(--space-2) 0 var(--space-4)', color: 'var(--text-muted)' }}>
            Everyone watching this thread will be notified.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm">Move</Button>
          </div>
        </div>
      </Popover>
    </DialogTrigger>
  ),
}
