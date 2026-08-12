import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

/**
 * Library build.
 *
 * Consumers get one ESM bundle plus one stylesheet. CSS Modules are compiled
 * here (hashed class names, bundled into `dist/styles.css`) so no consumer
 * bundler needs to know how to handle `.module.css` inside node_modules.
 *
 * The global token sheets (tokens/reset/global) are NOT part of this graph —
 * they ship verbatim via `scripts/copy-styles.mjs` so consumers can read and
 * override the custom properties.
 */

// Everything declared as a dependency or peer stays external: it must resolve
// from the consumer's node_modules, never be inlined (a second copy of React
// Aria would break context and blow up bundle size).
const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  'react/jsx-runtime',
]

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      // Storybook-only sources never reach the published package.
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/stories/**'],
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json',
      // Flatten every declaration into a single dist/index.d.ts. Per-file
      // declarations import each other with extensionless relative paths, which
      // fails to resolve under `moduleResolution: node16` in a consumer — the
      // types would silently degrade to `any`. One file has no internal imports
      // to get wrong.
      // (Named `bundleTypes` since vite-plugin-dts 5 / unplugin-dts; the old
      // `rollupTypes` name is silently ignored.)
      bundleTypes: true,
    }),
  ],
  css: {
    modules: {
      // Readable in devtools, stable across builds, namespaced so consumer
      // styles can never collide with ours.
      generateScopedName: 'uids-[local]-[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    // One stylesheet, not one per component — consumers import it once.
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith('.css') ? 'styles.css' : '[name][extname]',
      },
    },
  },
})
