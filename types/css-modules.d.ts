// CSS Modules declaration so `tsc` resolves `import styles from './X.module.css'`.
// Kept outside `src/` deliberately: it is a build-time convenience and must not
// be emitted into `dist/`, where an ambient `*.module.css` declaration would
// leak into consumers' type space.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
