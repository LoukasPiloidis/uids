import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Where the current page sits in the hierarchy. The last crumb is the current page — leave its `href` off so it renders as text rather than a link back to itself.',
      },
    },
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#">Forum</Breadcrumb>
      <Breadcrumb href="#">Design</Breadcrumb>
      <Breadcrumb>Token naming conventions</Breadcrumb>
    </Breadcrumbs>
  ),
}

export const TwoLevels: Story = {
  name: 'Two levels',
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#">Forum</Breadcrumb>
      <Breadcrumb>Design</Breadcrumb>
    </Breadcrumbs>
  ),
}

export const Deep: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Forum</Breadcrumb>
      <Breadcrumb href="#">Design</Breadcrumb>
      <Breadcrumb href="#">Design system</Breadcrumb>
      <Breadcrumb>Token naming conventions</Breadcrumb>
    </Breadcrumbs>
  ),
}
