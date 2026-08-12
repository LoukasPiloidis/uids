import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Tooltip, TooltipTrigger } from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A short hint on hover or keyboard focus. Never put essential information or interactive content in one — it is unreachable on touch devices. Label icon-only buttons with `aria-label` as well; the tooltip is a supplement, not the accessible name.',
      },
    },
  },
  args: { children: 'Pin this thread to the top', placement: 'top' },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--space-12)' }}>
      <TooltipTrigger>
        <Button variant="secondary" aria-label="Pin thread">
          Pin
        </Button>
        <Tooltip {...args} />
      </TooltipTrigger>
    </div>
  ),
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-12)' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <TooltipTrigger key={placement}>
          <Button variant="secondary">{placement}</Button>
          <Tooltip placement={placement}>Placed {placement}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  ),
}

export const OpensInstantly: Story = {
  name: 'Without the open delay',
  render: () => (
    <div style={{ padding: 'var(--space-12)' }}>
      <TooltipTrigger delay={0}>
        <Button variant="secondary">No delay</Button>
        <Tooltip>Appears as soon as you hover</Tooltip>
      </TooltipTrigger>
    </div>
  ),
}
