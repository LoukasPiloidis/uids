/**
 * The token inventory, mirroring `src/styles/tokens.css`.
 *
 * This file lists token *names* only — never values. Every displayed value is
 * read back from the live stylesheet via `getComputedStyle`, so the Foundations
 * pages can never drift from the CSS the components actually consume.
 */

export type TokenGroup = {
  title: string
  description: string
  tokens: string[]
}

export const rawColorGroups: TokenGroup[] = [
  {
    title: 'Green scale',
    description:
      'The brand ramp. Components never reference these directly — they go through the semantic aliases below.',
    tokens: [
      '--green-50',
      '--green-100',
      '--green-200',
      '--green-300',
      '--green-400',
      '--green-500',
      '--green-600',
      '--green-700',
      '--green-800',
      '--green-900',
    ],
  },
  {
    title: 'Neutrals',
    description:
      'Slightly green-biased greys, so neutral surfaces read as chosen rather than default.',
    tokens: [
      '--neutral-0',
      '--neutral-25',
      '--neutral-50',
      '--neutral-200',
      '--neutral-300',
      '--neutral-500',
      '--neutral-600',
      '--neutral-800',
      '--neutral-900',
    ],
  },
]

export const semanticColorGroups: TokenGroup[] = [
  {
    title: 'Surfaces',
    description: 'Backgrounds, from the page up through cards and raised rows.',
    tokens: ['--paper', '--surface', '--surface-2', '--surface-inverse'],
  },
  {
    title: 'Text',
    description: 'Four weights of emphasis. Use --text for body copy and step down from there.',
    tokens: ['--ink', '--text', '--text-muted', '--text-subtle', '--on-accent', '--on-inverse'],
  },
  {
    title: 'Borders',
    description: 'Hairlines. --border for card edges, --border-strong for inputs and dividers.',
    tokens: ['--border', '--border-strong'],
  },
  {
    title: 'Accent',
    description: 'The green, aliased. Retheme the whole system by redefining these.',
    tokens: [
      '--accent',
      '--accent-hover',
      '--accent-text',
      '--accent-subtle',
      '--accent-subtle-2',
      '--accent-ring',
    ],
  },
  {
    title: 'States',
    description:
      'Semantic status colours, independent of the accent. Each has a weak variant for backgrounds.',
    tokens: [
      '--up',
      '--up-weak',
      '--down',
      '--down-weak',
      '--info',
      '--info-weak',
      '--warning',
      '--warning-weak',
    ],
  },
  {
    title: 'Overlay',
    description: 'Modal scrim.',
    tokens: ['--overlay'],
  },
]

export const fontTokens = ['--font-ui', '--font-reading', '--font-mono']

export const textSizeTokens = [
  '--text-xs',
  '--text-sm',
  '--text-base',
  '--text-md',
  '--text-lg',
  '--text-xl',
  '--text-2xl',
  '--text-3xl',
]

export const lineHeightTokens = ['--lh-tight', '--lh-snug', '--lh-normal', '--lh-reading']

export const weightTokens = ['--weight-normal', '--weight-medium', '--weight-semi', '--weight-bold']

export const spaceTokens = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
  '--space-8',
  '--space-10',
  '--space-12',
  '--space-16',
]

export const radiusTokens = [
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-xl',
  '--radius-full',
]

export const shadowTokens = ['--shadow-sm', '--shadow-md', '--shadow-lg']

export const layoutTokens = ['--measure', '--container', '--focus-ring']

/** Read a custom property's computed value off the document root. */
export const resolve = (token: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(token).trim()
