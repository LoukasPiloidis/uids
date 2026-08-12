import { type ClassValue, clsx } from 'clsx'

/**
 * Class-name joiner for the React Aria + CSS Modules system.
 *
 * clsx only — no `tailwind-merge`. There are no utility classes to dedupe;
 * components compose scoped module classes and conditional strings, and CSS
 * specificity resolves the rest.
 */
export const cn = (...inputs: ClassValue[]) => clsx(inputs)
