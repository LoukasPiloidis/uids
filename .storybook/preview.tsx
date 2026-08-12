import type { Preview } from '@storybook/react-vite'

// The token layer, loaded exactly the way a consuming app loads it.
import '../src/styles/global.css'

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
