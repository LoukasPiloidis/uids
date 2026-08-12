import { copyFile, mkdir } from 'node:fs/promises'
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
const sheets = ['tokens.css', 'reset.css', 'global.css']

await mkdir(join(root, 'dist'), { recursive: true })

await Promise.all(
  sheets.map((sheet) => copyFile(join(root, 'src/styles', sheet), join(root, 'dist', sheet))),
)

console.log(`copied ${sheets.length} global stylesheets to dist/`)
