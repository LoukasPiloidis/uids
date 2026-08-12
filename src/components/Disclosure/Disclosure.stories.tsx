import type { Meta, StoryObj } from '@storybook/react-vite'
import { Disclosure, DisclosureGroup } from './Disclosure'

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible content behind a heading. Wrap several in `DisclosureGroup` for an accordion — pass `allowsMultipleExpanded` if more than one should be able to stay open.',
      },
    },
  },
  args: {
    title: 'How do I override a token?',
    children:
      'Redefine the custom property on :root in your own stylesheet, loaded after the package styles. Every component reads the alias, so the change propagates everywhere at once.',
  },
  argTypes: { isExpanded: { control: 'boolean' }, isDisabled: { control: 'boolean' } },
} satisfies Meta<typeof Disclosure>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultExpanded: Story = {
  name: 'Expanded by default',
  args: { defaultExpanded: true },
}

export const Accordion: Story = {
  render: () => (
    <DisclosureGroup>
      <Disclosure id="tokens" title="How do I override a token?">
        Redefine the custom property on <code>:root</code> after importing the package styles.
      </Disclosure>
      <Disclosure id="dark" title="Is there a dark mode?">
        Not yet. The tokens are structured so dark is an additive layer — redefine the semantic
        aliases under <code>:root[data-theme="dark"]</code> without touching component CSS.
      </Disclosure>
      <Disclosure id="tailwind" title="Can I use this alongside Tailwind?">
        Yes. The components ship pre-compiled CSS Modules with namespaced class names, so nothing
        collides with utility classes.
      </Disclosure>
    </DisclosureGroup>
  ),
}

export const MultipleExpanded: Story = {
  name: 'Allowing multiple open',
  render: () => (
    <DisclosureGroup allowsMultipleExpanded defaultExpandedKeys={['one']}>
      <Disclosure id="one" title="First section">
        Both of these can be open at the same time.
      </Disclosure>
      <Disclosure id="two" title="Second section">
        Opening this one leaves the first one open.
      </Disclosure>
    </DisclosureGroup>
  ),
}
