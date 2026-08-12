import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  // Publishes the agent brief alongside the docs site, so a tool that can reach
  // the web gets the same guidance a consumer gets from node_modules.
  staticDirs: [{ from: '../llms.txt', to: '/llms.txt' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // This Storybook is the design system's published documentation, not a
  // scratchpad being set up — so no onboarding checklist and no release toasts.
  features: {
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
  core: {
    disableWhatsNewNotifications: true,
  },
  typescript: {
    // Drive the Controls prop table from our real TypeScript interfaces, so
    // Storybook shows the same prop info a consumer gets from intellisense.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Resolved from the project root, not from .storybook/.
      tsconfigPath: './tsconfig.json',
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // React Aria props come from node_modules; without this the tables would
      // show only our own thin wrapper props.
      propFilter: (prop) =>
        !/node_modules\/(?!react-aria-components)/.test(prop.parent?.fileName ?? ''),
    },
  },
  viteFinal: (config) => {
    // vite.config.ts is the *library* build: it externalises React and emits a
    // single bundle. Storybook is an app build and must do neither, so strip
    // the library-only pieces rather than maintaining a second Vite config.
    if (config.build) {
      config.build.lib = undefined
      if (config.build.rollupOptions) config.build.rollupOptions.external = undefined
      config.build.cssCodeSplit = true
    }
    // The dts plugin only serves the package build; running it here is wasted
    // work and it has no valid entry in this context.
    config.plugins = config.plugins?.filter(
      (plugin) => !(plugin && 'name' in plugin && String(plugin.name).includes('dts')),
    )
    return config
  },
}

export default config
