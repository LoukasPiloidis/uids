# @piloten/uids

Piloidis UI Design System — 26 React components built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/) for behaviour and accessibility, styled with CSS Modules over a single layer of design tokens.

📖 **[uids.piloidis.com](https://uids.piloidis.com)** — component browser, colour palette, type scale.

## Install

```bash
pnpm add @piloten/uids
```

`react` and `react-dom` (18 or 19) are peer dependencies. React Aria Components comes bundled as a regular dependency, so there is nothing else to install.

## Use

Import the token layer once, at your app entry:

```ts
// app/layout.tsx, main.tsx — wherever your app boots
import '@piloten/uids/global.css'   // tokens + reset + document defaults
import '@piloten/uids/styles.css'   // the component styles
```

Then use components anywhere:

```tsx
import { Button, TextField, Select, SelectItem } from '@piloten/uids'

export default function Page() {
  return (
    <form>
      <TextField label="Title" isRequired />
      <Select label="Category" defaultSelectedKey="design">
        <SelectItem id="design">Design</SelectItem>
        <SelectItem id="engineering">Engineering</SelectItem>
      </Select>
      <Button variant="primary" onPress={() => {}}>
        Publish
      </Button>
    </form>
  )
}
```

Every component ships full TypeScript types, so prop names, variants and literal values autocomplete in your editor.

### Stylesheet entrypoints

| Import | What it is |
|---|---|
| `@piloten/uids/styles.css` | Compiled component styles. **Required.** |
| `@piloten/uids/global.css` | Tokens + reset + `body` defaults. The usual choice. |
| `@piloten/uids/tokens.css` | Just the custom properties, if you have your own reset. |
| `@piloten/uids/reset.css` | Just the reset. |

## Theming

Components never reference a raw colour — only semantic aliases. Redefine those and the whole system shifts:

```css
/* your app, loaded after the package styles */
:root {
  --accent: #6d28d9;
  --accent-hover: #5b21b6;
  --accent-text: #5b21b6;
  --radius-md: 10px;
}
```

The full token inventory — colours with live contrast ratios, the type scale, spacing, radius and elevation — is documented under **Foundations** on [uids.piloidis.com](https://uids.piloidis.com).

## Components

`Avatar` · `Badge` · `Breadcrumbs` · `Button` · `Checkbox` · `ComboBox` · `Dialog` · `Disclosure` · `EmptyState` · `Link` · `ListBox` · `Menu` · `Popover` · `SearchField` · `Select` · `Separator` · `Spinner` · `Surface` · `Switch` · `Tabs` · `TagGroup` · `TextArea` · `TextField` · `Toast` · `ToggleButton` · `Tooltip`

Plus `cn` (a `clsx` wrapper) and five icons.

Interaction state comes from React Aria as `data-*` attributes (`data-hovered`, `data-pressed`, `data-selected`, `data-focus-visible`, `data-disabled`) and is styled in CSS — there are no conditional class strings to manage.

## Using it with AI tools

The package ships an `llms.txt` — a short brief covering setup, the token rules, and what each component is for. Point an agent at whichever is easier to reach:

- `node_modules/@piloten/uids/llms.txt` — already there once installed
- <https://uids.piloidis.com/llms.txt>

It's generated from the same story descriptions the docs site renders, so it tracks the release rather than drifting from it.

## Notes

This package is **ESM-only**. Modern bundlers and Next.js handle it natively; a CommonJS `require()` needs a dynamic `import()`.

---

## Development

```bash
pnpm install
pnpm storybook        # docs site on :6006
pnpm build            # dist/ — ESM bundle, index.d.ts, stylesheets, llms.txt
pnpm llms             # regenerate llms.txt on its own
pnpm typecheck
pnpm lint
```

Contributor conventions live in [AGENTS.md](AGENTS.md).

### How the build works

`vite.config.ts` runs Vite in library mode:

- CSS Modules are **compiled here** into one `dist/styles.css` with namespaced class names (`uids-button-2ZuB7`), so no consumer bundler needs to process `.module.css` from `node_modules`.
- Types are bundled into a single `dist/index.d.ts` (`bundleTypes`). Per-file declarations would import each other with extensionless relative paths, which fails to resolve under `moduleResolution: node16` and silently degrades consumer types to `any`.
- `tokens.css`, `reset.css` and `global.css` bypass the bundler entirely (`scripts/copy-styles.mjs`) so they stay readable and overridable.
- `react`, `react-dom`, `react-aria-components` and `clsx` are external — bundling a second copy of React Aria would break its context.

CI runs `publint` and `@arethetypeswrong/cli` against a packed tarball, because a published version number can never be reused.

### Releasing

```bash
pnpm version minor          # or patch / major
git push --follow-tags
```

The tag triggers `.github/workflows/release.yml`, which re-runs CI, verifies the tag matches `package.json`, and publishes to npm with provenance. Requires an `NPM_TOKEN` repository secret (an npm **Automation** token).

The very first publish has to happen locally, since the package does not exist on the registry yet:

```bash
npm login
pnpm build
npm publish --access public
```

### Deploying the docs

Pushing to `main` builds a Docker image (Storybook served by Caddy), pushes it to GHCR, and deploys it to the VPS over SSH.

Required repository secrets: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `GHCR_USER`, `GHCR_TOKEN`.

**One-time setup on the VPS:**

1. Point DNS: an `A` record for `uids.piloidis.com` at the server's IP.
2. Add the block in [`docker/Caddyfile.vps-snippet`](docker/Caddyfile.vps-snippet) to the Caddyfile already running there, then reload Caddy.
3. Ensure `/opt/uids` exists and the deploy user can write to it.

The container serves plain HTTP on port 80 and publishes no host port — TLS and the public hostname are the existing Caddy's job. Caddy reaches it by service name over the external `proxy-net` network, the same one it uses to front the other sites on the box.

## Licence

MIT
