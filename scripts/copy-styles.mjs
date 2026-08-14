import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Ship the global stylesheets verbatim.
 *
 * tokens/reset/global are plain CSS, not CSS Modules: they declare the custom
 * properties the whole system reads. They must reach `dist/` unhashed and
 * unminified so a consumer can inspect the tokens and override them
 * (`:root { --accent: ... }`) to retheme without forking the package.
 *
 * They land flat in `dist/`, which keeps the relative `@import "./tokens.css"`
 * inside global.css resolving correctly.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sheets = ['tokens.css', 'reset.css']

await mkdir(join(root, 'dist'), { recursive: true })

await Promise.all(
  sheets.map((sheet) => copyFile(join(root, 'src/styles', sheet), join(root, 'dist', sheet))),
)

/**
 * global.css gains one import on the way out: `styles.css`, the bundled
 * component CSS, which only exists in `dist/` — Storybook gets it through the
 * module graph instead. Consumers import `global.css` alone, so without this
 * every component renders unstyled on the correct tokens.
 */
const global = await readFile(join(root, 'src/styles/global.css'), 'utf8')
await writeFile(
  join(root, 'dist/global.css'),
  global.replace('@import "./reset.css";', '@import "./reset.css";\n@import "./styles.css";'),
)

console.log(`copied ${sheets.length + 1} global stylesheets to dist/`)
