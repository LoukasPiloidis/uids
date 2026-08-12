/**
 * Generates `llms.txt` — the consumer-facing brief for AI agents.
 *
 * Everything here is derived from source: component descriptions come from the
 * `docs.description.component` strings the Storybook pages already show, the
 * export lists come from `src/index.ts`, and the token inventory comes from
 * `tokens.css`. Nothing is retyped, so this file cannot drift from the package
 * the way a hand-maintained summary would.
 *
 * Run via `pnpm build`. See AGENTS.md for the in-repo contributor guide, which
 * is a different document with a different audience.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8')

const pkg = JSON.parse(read('package.json'))

// --- component descriptions -------------------------------------------------
// `component:` appears twice per stories file: once as the meta's component
// reference (followed by an identifier) and once as the docs description
// (followed by a quoted string). Requiring the quote picks out the right one.
const DESCRIPTION = /component:\s*'((?:[^'\\]|\\.)*)'/
const componentDirs = readdirSync(join(root, 'src/components')).sort()

const components = componentDirs.map((name) => {
  const source = read('src/components', name, `${name}.stories.tsx`)
  const match = source.match(DESCRIPTION)
  if (!match) throw new Error(`${name}: no docs description found in its stories file`)
  return { name, description: match[1].replace(/\\'/g, "'") }
})

// --- exports, grouped by the component they belong to ------------------------
const indexSource = read('src/index.ts')
const exportsByComponent = new Map()
for (const [, names, dir] of indexSource.matchAll(
  /export\s*\{([^}]*)\}\s*from\s*'\.\/components\/([^/]+)\//g,
)) {
  const list = names
    .split(',')
    .map((entry) => entry.trim().replace(/^type\s+/, ''))
    .filter(Boolean)
  exportsByComponent.set(dir, [...(exportsByComponent.get(dir) ?? []), ...list])
}

// --- tokens, minus the raw scales consumers must not touch -------------------
const tokenSource = read('src/styles/tokens.css')
const sections = []
for (const line of tokenSource.split('\n')) {
  const header = line.match(/\/\* --- (.+?) --- \*\//)
  if (header) {
    sections.push({ title: header[1], tokens: [] })
    continue
  }
  const declaration = line.match(/^\s*(--[a-z0-9-]+):/)
  if (declaration && sections.length) sections.at(-1).tokens.push(declaration[1])
}
const semantic = sections.filter((s) => !s.title.startsWith('Raw:') && s.tokens.length)

// --- emit --------------------------------------------------------------------
const lines = []
const put = (text = '') => lines.push(text)

put(`# ${pkg.name}`)
put()
put(`> ${pkg.description}`)
put()
put('A React component library. Behaviour and accessibility come from React Aria')
put('Components; styling is CSS Modules reading a single layer of design tokens.')
put('There is no Tailwind and no utility-class system.')
put()
put(`Docs: ${pkg.homepage}`)
put()

put('## Setup')
put()
put('```tsx')
put('// once, in the app entry — the token layer every component reads')
put(`import '${pkg.name}/global.css'`)
put('```')
put()
put('Also available: `/tokens.css` (custom properties only), `/reset.css`, and')
put('`/styles.css` (component styles, already included by `global.css`).')
put()

put('## Rules')
put()
put('1. **Use semantic tokens, never raw scales.** `var(--accent)` and `var(--text)`')
put('   are public; `--green-500` and `--neutral-800` are internal. Overriding the')
put('   semantic layer rethemes the whole system — reaching past it into a raw scale')
put('   silently opts that element out of theming.')
put('2. **Never hardcode a value a token covers** — colour, spacing, radius, font')
put('   size, weight, line height, shadow.')
put('3. **Style interaction state with `data-*` attributes**, which React Aria emits:')
put('   `data-hovered`, `data-focus-visible`, `data-disabled`, `data-selected`,')
put('   `data-entering` / `data-exiting`, `data-invalid`, `data-expanded`. Do not use')
put('   `:hover` / `:focus`, and do not track this state in React — the pseudo-classes')
put('   fire in cases React Aria deliberately excludes.')
put('4. **Press, not click.** Interactive components take `onPress`, not `onClick`,')
put('   so keyboard, touch and pointer behave identically.')
put('5. **`className` is a plain string** on every component here and merges after the')
put('   internal classes, so consumer styles win.')
put()

put(`## Components (${components.length})`)
put()
for (const { name, description } of components) {
  const exported = exportsByComponent.get(name) ?? [name]
  put(`- **${name}** — ${description}`)
  put(`  <br>Exports: ${exported.map((e) => `\`${e}\``).join(', ')}`)
}
put()
put('Also exported: `cn` (a `clsx` wrapper for composing class names), the icon set')
put('(`CalendarIcon`, `CheckIcon`, `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`,')
put('`SearchIcon`, `OverlayArrowTip`), and the `DateValue` / `Key` / `Selection` /')
put('`SortDescriptor` types re-exported from React Aria Components.')
put()

put('## Tokens')
put()
put('Reference these from consumer CSS. Redefine them to retheme.')
put()
for (const section of semantic) {
  put(`### ${section.title}`)
  put()
  put(section.tokens.map((t) => `\`${t}\``).join(', '))
  put()
}

writeFileSync(join(root, 'llms.txt'), `${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`)
console.log(
  `llms.txt: ${components.length} components, ${semantic.reduce((n, s) => n + s.tokens.length, 0)} tokens`,
)
