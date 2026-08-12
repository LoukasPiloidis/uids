import type { Preview } from '@storybook/react-vite'

// The token layer, loaded exactly the way a consuming app loads it.
import '../src/styles/global.css'

/**
 * Keep `HTMLElement.prototype.focus` a plain method.
 *
 * Storybook's test loader runs before every story and, whenever
 * `navigator.clipboard` exists, swaps `focus` for an accessor whose getter
 * dereferences `this.ownerDocument`. Reading `.focus` off anything that is not
 * a real element then throws
 *
 *   'get ownerDocument' called on an object that does not implement interface Node.
 *
 * which React Aria trips over — it probes for a `focus` method while setting up
 * focus management — and the story renders as an error box instead. Only the
 * components that never touch focus (Avatar, Badge) survive.
 *
 * Redefining the property as non-configurable makes Storybook's own
 * `Object.defineProperties` throw, and the `try/catch` it already wraps that
 * call in swallows the failure. The native method survives, and nothing here
 * uses the instrumented `userEvent` that the patch exists to support.
 */
if (typeof HTMLElement !== 'undefined') {
  const focus = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')
  if (focus && typeof focus.value === 'function') {
    Object.defineProperty(HTMLElement.prototype, 'focus', { ...focus, configurable: false })
  }
}

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      // Foundations first — the palette and type scale are what you browse
      // when deciding what to use; components come after.
      storySort: {
        order: [
          'Getting Started',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius & Elevation'],
          'Components',
        ],
      },
    },
    a11y: { test: 'todo' },
  },
}

export default preview
