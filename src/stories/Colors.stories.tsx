import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ContrastBadge,
  contrastRatio,
  Grid,
  Page,
  Section,
  TokenName,
  useTokenValues,
  Value,
} from './kit'
import { rawColorGroups, semanticColorGroups } from './tokens'

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The palette is two layers. Raw scales are the paint; semantic aliases are what components are allowed to reference. Retheme by redefining layer 2 — no component CSS changes.',
      },
    },
  },
  tags: ['!autodocs'],
}
export default meta

type Story = StoryObj

const Swatch = ({ token, value }: { token: string; value: string }) => (
  <div
    style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--surface)',
    }}
  >
    <div style={{ height: 64, background: `var(${token})` }} />
    <div
      style={{
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderTop: '1px solid var(--border)',
      }}
    >
      <TokenName>{token}</TokenName>
      <Value>{value || '—'}</Value>
    </div>
  </div>
)

const SwatchGroups = ({ groups }: { groups: typeof rawColorGroups }) => {
  const allTokens = groups.flatMap((group) => group.tokens)
  const values = useTokenValues(allTokens)
  return (
    <>
      {groups.map((group) => (
        <Section key={group.title} title={group.title} description={group.description}>
          <Grid min={180}>
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} value={values[token] ?? ''} />
            ))}
          </Grid>
        </Section>
      ))}
    </>
  )
}

export const SemanticAliases: Story = {
  name: 'Semantic aliases (use these)',
  render: () => (
    <Page>
      <SwatchGroups groups={semanticColorGroups} />
    </Page>
  ),
}

export const RawScales: Story = {
  name: 'Raw scales (do not use directly)',
  render: () => (
    <Page>
      <SwatchGroups groups={rawColorGroups} />
    </Page>
  ),
}

const textPairs = [
  { fg: '--ink', bg: '--surface', use: 'Titles on a card' },
  { fg: '--text', bg: '--surface', use: 'Body copy on a card' },
  { fg: '--text-muted', bg: '--surface', use: 'Meta / secondary' },
  { fg: '--text-subtle', bg: '--surface', use: 'Timestamps, hints' },
  { fg: '--text', bg: '--paper', use: 'Body copy on the page' },
  { fg: '--on-accent', bg: '--accent', use: 'Filled primary button' },
  { fg: '--accent-text', bg: '--surface', use: 'Links, accent text' },
  { fg: '--accent-text', bg: '--accent-subtle', use: 'Accent chip' },
  { fg: '--on-inverse', bg: '--surface-inverse', use: 'Tooltip' },
  { fg: '--down', bg: '--down-weak', use: 'Danger chip' },
  { fg: '--info', bg: '--info-weak', use: 'Info chip' },
  { fg: '--warning', bg: '--warning-weak', use: 'Warning chip' },
]

export const Contrast: Story = {
  name: 'Contrast check',
  render: () => {
    const values = useTokenValues(textPairs.flatMap((pair) => [pair.fg, pair.bg]))
    return (
      <Page>
        <Section
          title="Contrast"
          description="Live WCAG 2.1 ratios for the foreground/background pairs the components actually produce. Body-size text needs 4.5 (AA); large text (18.66px bold or 24px regular) needs 3."
        >
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: 'var(--space-2)', fontWeight: 'var(--weight-medium)' }}>
                  Sample
                </th>
                <th style={{ padding: 'var(--space-2)', fontWeight: 'var(--weight-medium)' }}>
                  Foreground
                </th>
                <th style={{ padding: 'var(--space-2)', fontWeight: 'var(--weight-medium)' }}>
                  Background
                </th>
                <th style={{ padding: 'var(--space-2)', fontWeight: 'var(--weight-medium)' }}>
                  Ratio
                </th>
                <th style={{ padding: 'var(--space-2)', fontWeight: 'var(--weight-medium)' }}>
                  Used for
                </th>
              </tr>
            </thead>
            <tbody>
              {textPairs.map((pair) => (
                <tr key={`${pair.fg}-${pair.bg}`} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: 'var(--space-2)' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        background: `var(${pair.bg})`,
                        color: `var(${pair.fg})`,
                        border: '1px solid var(--border)',
                      }}
                    >
                      Sample text
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-2)' }}>
                    <TokenName>{pair.fg}</TokenName>
                  </td>
                  <td style={{ padding: 'var(--space-2)' }}>
                    <TokenName>{pair.bg}</TokenName>
                  </td>
                  <td style={{ padding: 'var(--space-2)' }}>
                    <ContrastBadge
                      ratio={contrastRatio(values[pair.fg] ?? '', values[pair.bg] ?? '')}
                    />
                  </td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--text-muted)' }}>
                    {pair.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </Page>
    )
  },
}
