import { type ReactNode, useEffect, useState } from 'react'
import { resolve } from './tokens'

/**
 * Presentation helpers for the Foundations pages. Storybook-only — excluded
 * from the published package.
 */

const mono = 'var(--font-mono)'

export const Section = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) => (
  <section style={{ marginBottom: 'var(--space-10)' }}>
    <h2
      style={{
        font: `var(--weight-semi) var(--text-xl)/var(--lh-tight) var(--font-ui)`,
        color: 'var(--ink)',
        margin: '0 0 var(--space-2)',
      }}
    >
      {title}
    </h2>
    {description ? (
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: 'var(--text-sm)',
          maxWidth: '60ch',
          margin: '0 0 var(--space-5)',
        }}
      >
        {description}
      </p>
    ) : null}
    {children}
  </section>
)

export const TokenName = ({ children }: { children: ReactNode }) => (
  <code style={{ fontFamily: mono, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>
    {children}
  </code>
)

export const Value = ({ children }: { children: ReactNode }) => (
  <span style={{ fontFamily: mono, fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>
    {children}
  </span>
)

/** Reads live token values after mount, so nothing here can drift from the CSS. */
export const useTokenValues = (tokens: string[]) => {
  const [values, setValues] = useState<Record<string, string>>({})
  useEffect(() => {
    setValues(Object.fromEntries(tokens.map((token) => [token, resolve(token)])))
  }, [tokens])
  return values
}

// --- contrast ---------------------------------------------------------------

const toRgb = (color: string): [number, number, number] | null => {
  const value = color.trim()
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex?.[1]) {
    const h = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join('') : hex[1]
    return [
      Number.parseInt(h.slice(0, 2), 16),
      Number.parseInt(h.slice(2, 4), 16),
      Number.parseInt(h.slice(4, 6), 16),
    ]
  }
  const rgb = value.match(/rgba?\(([^)]+)\)/i)
  if (rgb?.[1]) {
    const parts = rgb[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number)
    const [r, g, b] = parts
    if (r !== undefined && g !== undefined && b !== undefined) return [r, g, b]
  }
  return null
}

const luminance = ([r, g, b]: [number, number, number]) => {
  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** WCAG 2.1 contrast ratio, or null when either colour isn't a flat rgb/hex. */
export const contrastRatio = (fg: string, bg: string): number | null => {
  const a = toRgb(fg)
  const b = toRgb(bg)
  if (!a || !b) return null
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (light + 0.05) / (dark + 0.05)
}

export const ContrastBadge = ({ ratio }: { ratio: number | null }) => {
  if (ratio === null) return <Value>—</Value>
  const rounded = ratio.toFixed(2)
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'fail'
  const passing = ratio >= 4.5
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 'var(--text-xs)',
        padding: '2px var(--space-2)',
        borderRadius: 'var(--radius-full)',
        background: passing
          ? 'var(--up-weak)'
          : ratio >= 3
            ? 'var(--warning-weak)'
            : 'var(--down-weak)',
        color: passing ? 'var(--accent-text)' : ratio >= 3 ? 'var(--warning)' : 'var(--down)',
        whiteSpace: 'nowrap',
      }}
    >
      {rounded} {grade}
    </span>
  )
}

// --- layout -----------------------------------------------------------------

export const Grid = ({ children, min = 240 }: { children: ReactNode; min?: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
      gap: 'var(--space-4)',
    }}
  >
    {children}
  </div>
)

export const Page = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: 'var(--space-6)', maxWidth: 1100 }}>{children}</div>
)

export const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
    }}
  >
    {children}
  </div>
)

export const Stack = ({ children, gap = 4 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: `var(--space-${gap})` }}>
    {children}
  </div>
)
