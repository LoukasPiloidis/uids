import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from './Menu'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'A list of commands hanging off a trigger. Menu items *do* things — for picking a value that stays picked, use `Select`. Always wrap in `MenuTrigger` so focus returns to the button on close.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom start', 'bottom end', 'top start', 'top end', 'left', 'right'],
    },
    children: { control: false },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button variant="secondary">Thread actions</Button>
      <Menu {...args} aria-label="Thread actions" onAction={() => {}}>
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="pin">Pin to top</MenuItem>
        <MenuItem id="share">Copy link</MenuItem>
        <MenuSeparator />
        <MenuItem id="delete" variant="danger">
          Delete thread
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithGroups: Story = {
  name: 'With sections',
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">More</Button>
      <Menu aria-label="More actions" onAction={() => {}}>
        <MenuGroup label="This thread">
          <MenuItem id="edit">Edit</MenuItem>
          <MenuItem id="pin">Pin to top</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Notifications">
          <MenuItem id="watch">Watch</MenuItem>
          <MenuItem id="mute">Mute</MenuItem>
        </MenuGroup>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithDisabledItems: Story = {
  name: 'With disabled items',
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Thread actions</Button>
      <Menu aria-label="Thread actions" disabledKeys={['pin']} onAction={() => {}}>
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="pin">Pin to top (moderators only)</MenuItem>
        <MenuItem id="delete" variant="danger">
          Delete thread
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}
