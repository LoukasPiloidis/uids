# AGENTS.md

Guidance for AI agents working in this repo. The `.d.ts` already tells you the
shape of every export — this file covers the conventions it cannot express.

`@piloten/uids` is a design system: **React Aria Components** for behaviour and
accessibility, **CSS Modules** for styling, over **one token layer**. There is no
Tailwind and no utility-class system.

## The rule that matters most: token layers

`src/styles/tokens.css` has two layers, and the boundary between them is the
whole architecture.

| Layer | Examples | Who may reference it |
|---|---|---|
| **Raw scales** | `--green-500`, `--neutral-800` | `tokens.css` only |
| **Semantic aliases** | `--accent`, `--text`, `--surface`, `--border` | component CSS |

**Component CSS reads semantic aliases only.** Never reference a raw scale from a
`.module.css` file, and never hardcode a hex, rgb, or px value for anything a
token covers (colour, spacing, radius, font size, weight, line height, shadow).

This is what makes retheming work: redefining the semantic layer — e.g. under
`:root[data-theme="dark"]` — restyles every component without touching a single
component stylesheet. A raw scale referenced directly in a component is a hole in
that guarantee, and it will not show up as a test failure.

The Foundations stories are the live inventory: `Foundations/Colors` renders
every token by reading `getComputedStyle` off the document, so it can never drift
from the CSS.

## Interaction state comes from the DOM, not from React

React Aria emits interaction state as `data-*` attributes. Style those in CSS.

```css
.button[data-hovered] { background: var(--accent-hover); }
.button[data-pressed] { transform: translateY(0.5px); }
.button[data-focus-visible] { outline: none; box-shadow: var(--focus-ring); }
.button[data-disabled] { cursor: not-allowed; opacity: 0.5; }
```

Do **not** add `useState` for hover/press/focus, and do not reach for `:hover` or
`:focus` — the plain CSS pseudo-classes fire in cases React Aria deliberately
excludes (touch hover, mouse focus).

The attributes this system actually styles, by frequency: `data-focus-visible`,
`data-hovered`, `data-disabled`, `data-selected`, `data-placement`,
`data-entering` / `data-exiting` (overlay transitions), `data-focused`,
`data-invalid`, `data-expanded`, `data-current`. Check an existing
`.module.css` before inventing an attribute name — React Aria only emits a fixed
set, and a selector with a typo fails silently.

## Component shape

Every component is three co-located files:

```
src/components/<Name>/<Name>.tsx
src/components/<Name>/<Name>.module.css
src/components/<Name>/<Name>.stories.tsx
```

Wrap the React Aria primitive; don't reimplement it:

```tsx
export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  variant?: Variant
  size?: Size
  className?: string
}

export const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) => (
  <AriaButton {...props} className={cn(styles.button, styles[variant], styles[size], className)} />
)
```

Conventions in that snippet, all load-bearing:

- `Omit<Aria…Props, 'className'>` then re-declare `className?: string`. React Aria
  types `className` as a render-prop callback; consumers want a plain string.
- Spread `{...props}` **first** so callers can override.
- Compose classes with `cn()` and put `className` **last** so consumer styles win.
- Arrow-function components, named exports. No default export in an
  implementation file — the only `export default` in `src/` is a story's `meta`,
  which Storybook requires.
- Variant/size props map to module classes (`styles[variant]`), so the CSS stays
  declarative and no conditional logic leaks into the component.

Compound components (`Select`, `Menu`, `Tabs`, `ComboBox`, `TagGroup`) export the
parent plus its item parts (`Select` + `SelectItem`) rather than accepting an
array of options. Follow the existing file if you add one.

`cn()` is `clsx` and nothing else — no `tailwind-merge`. There are no utility
classes to dedupe; specificity resolves the rest.

## Public API

Every export goes through `src/index.ts`, alphabetically, exporting the component
**and** its props type:

```ts
export { Badge, type BadgeProps } from './components/Badge/Badge'
```

A component that isn't re-exported there does not exist as far as consumers are
concerned. `dist/index.d.ts` is deliberately bundled into one flat file — per-file
declarations break under `moduleResolution: node16` in a consumer and silently
degrade to `any`.

## Stories

Title is `Components/<Name>`; the first export is `Playground` (bare `{}`, driven
by `args` on the meta), followed by named stories for each meaningful state. The
two exceptions are `Separator` and `Toast`, which have nothing meaningful to
drive from controls and lead with a real state instead. Put
the "when do I use this, and what should I use instead" note in
`parameters.docs.description.component` — that text is the closest thing to
written guidance the system has.

There are no autodocs pages; every entry in the sidebar is a real story.
Foundations stories live in `src/stories/` and use the helpers in `kit.tsx`.

## Two documents, two audiences

This file is for agents working **in** this repo. `llms.txt` is for agents
working in a **consumer's** repo — it covers usage, not contribution, and is
generated by `scripts/generate-llms-txt.mjs` from the story descriptions,
`src/index.ts` and `tokens.css`. Never hand-edit `llms.txt`; change the source
and regenerate with `pnpm llms`. It ships in the npm package and is served at
`/llms.txt` on the docs site.

That means a component's `docs.description.component` string is public API for
both humans and machines. Write it as guidance — when to use this, and what to
reach for instead — not as a restatement of the type.

## Commands

```
pnpm storybook        # docs site on :6006
pnpm build            # library build (ESM + .d.ts + stylesheets + llms.txt)
pnpm llms             # regenerate llms.txt on its own
pnpm typecheck        # tsc --noEmit
pnpm lint             # biome check .
pnpm format           # biome format --write .
```

`pnpm format` does not sort imports — that's a Biome *assist*, not a formatter
rule. Use `pnpm biome check --write <file>` when CI flags `organizeImports`.

Run `pnpm typecheck` and `pnpm lint` before proposing a change is done. Biome
formatting is single quotes, no semicolons, 100-column width, 2-space indent —
don't hand-format against it, run `pnpm format`.

## Traps

- **`react-aria-components` is a peer dependency, and must stay one.** Making it
  a regular dependency lets a consumer end up with two copies, and two copies
  means two of every React context React Aria uses — `I18nProvider`, overlay and
  portal state, the toast queue. A `Dialog` then cannot see the app's locale and
  `toast()` pushes to a queue the mounted `<Toaster />` is not reading. Nothing
  errors; it just quietly does the wrong thing. `@internationalized/date` is an
  *optional* peer for the same reason — only `DatePicker` needs it.
- **`vite.config.ts` is the *library* build.** It externalises React and emits one
  bundle. Storybook is an app build and must do neither, so `.storybook/main.ts`
  strips `build.lib`, `rollupOptions.external` and the `dts` plugin in `viteFinal`.
  If you add a library-only plugin or build option, strip it there too.
- **Don't remove the `HTMLElement.prototype.focus` guard in
  `.storybook/preview.tsx`.** Storybook's test loader replaces `focus` with an
  accessor whose getter dereferences `this.ownerDocument`; React Aria probes for a
  `focus` method and the resulting throw blanks every focus-aware story. The guard
  makes that patch a no-op. Removing it breaks 24 of 26 components with an error
  that looks nothing like its cause.
- **Hooks in Foundations stories take token-name arrays.** `useTokenValues` keys
  its effect off the joined names, not array identity, because callers build those
  arrays inline. Preserve that if you touch it — depending on the array re-runs the
  effect every render and locks the browser.
- **The token sheets ship verbatim.** `tokens.css`, `reset.css` and `global.css`
  are copied by `scripts/copy-styles.mjs`, not bundled, so consumers can read and
  override the custom properties. Don't route them through the Vite graph.
- **Deploys are push-based.** Pushing to `main` builds an image, ships
  `docker-compose.yml` to the VPS and restarts the stack. Nothing pulls from git on
  the server; there is no checkout there to update.
