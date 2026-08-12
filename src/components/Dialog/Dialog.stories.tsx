import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { TextField } from '../TextField/TextField'
import { Dialog, DialogFooter, DialogTrigger } from './Dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A modal that takes over the page: focus is trapped, the background is inert, Escape closes. Use it only when the user genuinely cannot continue without answering. `children` accepts a function receiving `close`, so buttons inside can dismiss it, and `DialogFooter` lays out the action row.',
      },
    },
  },
  // `children` is required on DialogProps, so it has to be present here even
  // though every story below passes its own as JSX.
  args: { title: 'New thread', isDismissable: true, children: null },
  argTypes: {
    isDismissable: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button>New thread</Button>
      <Dialog {...args}>
        {({ close }) => (
          <>
            <div style={{ display: 'grid', gap: 'var(--space-4)', minWidth: 380 }}>
              <TextField label="Title" placeholder="What is this about?" autoFocus />
              <TextField label="Category" placeholder="Design" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onPress={close}>
                Cancel
              </Button>
              <Button onPress={close}>Create</Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <DialogTrigger>
      <Button variant="danger">Delete thread</Button>
      <Dialog title="Delete this thread?" role="alertdialog" isDismissable={false}>
        {({ close }) => (
          <>
            <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '46ch' }}>
              This removes the thread and all 24 replies. It cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="ghost" onPress={close}>
                Keep it
              </Button>
              <Button variant="danger" onPress={close}>
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  ),
}

export const NotDismissable: Story = {
  name: 'Requiring an explicit choice',
  render: () => (
    <DialogTrigger>
      <Button variant="secondary">Review terms</Button>
      <Dialog title="Community guidelines" isDismissable={false} isKeyboardDismissDisabled>
        {({ close }) => (
          <>
            <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '46ch' }}>
              Clicking the backdrop and pressing Escape are both disabled here, so the only way out
              is the button.
            </p>
            <DialogFooter>
              <Button onPress={close}>I understand</Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  ),
}
