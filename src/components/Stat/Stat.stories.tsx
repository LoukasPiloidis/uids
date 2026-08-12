import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatGroup } from './Stat'

const meta = {
  title: 'Components/Stat',
  component: Stat,
  parameters: {
    docs: {
      description: {
        component:
          'A single headline number with its label and an optional change. Wrap several in `StatGroup` for the summary row at the top of a report — past four or five tiles the row stops being scannable and the data belongs in a `Table`.',
      },
    },
  },
  args: { label: 'Total games', value: 148 },
  argTypes: {
    trend: { control: 'inline-radio', options: [undefined, 'up', 'down', 'flat'] },
  },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithChange: Story = {
  name: 'With change',
  args: { label: 'Assignments', value: 148, trend: 'up', change: '+12%', hint: 'vs last season' },
}

export const Group: Story = {
  render: () => (
    <StatGroup>
      <Stat label="Total games" value={148} trend="up" change="+12%" hint="vs last season" />
      <Stat label="Blocked days" value={9} />
      <Stat label="Average rest" value="4.2" hint="days between games" />
      <Stat label="Unfilled slots" value={3} trend="down" change="−2" />
    </StatGroup>
  ),
}

export const TrendMeaning: Story = {
  name: 'Trend reads, not arithmetic',
  parameters: {
    docs: {
      description: {
        story:
          'Fewer unfilled slots is good news, so it takes the `up` tone even though the number fell. Colour follows the reading; the arrow follows the direction.',
      },
    },
  },
  render: () => (
    <StatGroup>
      <Stat label="Coverage" value="97%" trend="up" change="+4pt" />
      <Stat label="Unfilled slots" value={3} trend="up" change="↓ from 9" />
      <Stat label="Late changes" value={11} trend="down" change="+5" />
    </StatGroup>
  ),
}

export const Bare: Story = {
  args: { label: 'Referees', value: 62 },
}
