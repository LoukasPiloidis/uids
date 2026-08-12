import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tab, TabList, TabPanel, Tabs } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Peer views of the same subject, only one visible at a time. Arrow keys move between tabs and the panel is wired to its tab automatically. Tabs are not navigation — if each view has its own URL, use links.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const panelStyle = {
  color: 'var(--text)',
  fontFamily: 'var(--font-reading)',
  lineHeight: 'var(--lh-reading)',
  maxWidth: 'var(--measure)',
} as const

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Thread views">
        <Tab id="latest">Latest</Tab>
        <Tab id="top">Top</Tab>
        <Tab id="unanswered">Unanswered</Tab>
      </TabList>
      <TabPanel id="latest">
        <p style={panelStyle}>The most recently active threads, newest first.</p>
      </TabPanel>
      <TabPanel id="top">
        <p style={panelStyle}>Threads ranked by votes over the last week.</p>
      </TabPanel>
      <TabPanel id="unanswered">
        <p style={panelStyle}>Threads nobody has replied to yet.</p>
      </TabPanel>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  name: 'With a disabled tab',
  render: () => (
    <Tabs disabledKeys={['archive']}>
      <TabList aria-label="Thread views">
        <Tab id="latest">Latest</Tab>
        <Tab id="top">Top</Tab>
        <Tab id="archive">Archive</Tab>
      </TabList>
      <TabPanel id="latest">
        <p style={panelStyle}>Latest threads.</p>
      </TabPanel>
      <TabPanel id="top">
        <p style={panelStyle}>Top threads.</p>
      </TabPanel>
      <TabPanel id="archive">
        <p style={panelStyle}>Archived threads.</p>
      </TabPanel>
    </Tabs>
  ),
}
