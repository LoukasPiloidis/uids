import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid, Page, Section, Stack, TokenName, useTokenValues, Value } from './kit'
import { radiusTokens, shadowTokens, spaceTokens } from './tokens'

const meta: Meta = {
  title: 'Foundations/Spacing & Elevation',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

export const Spacing: Story = {
  render: () => {
    const values = useTokenValues(spaceTokens)
    return (
      <Page>
        <Section
          title="Spacing"
          description="A 4px base scale. Gaps, padding and margins come from here — no arbitrary pixel values."
        >
          <Stack gap={3}>
            {spaceTokens.map((token) => (
              <div
                key={token}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}
              >
                <div style={{ minWidth: 140 }}>
                  <TokenName>{token}</TokenName>
                </div>
                <div style={{ minWidth: 70 }}>
                  <Value>{values[token] ?? ''}</Value>
                </div>
                <div
                  style={{
                    height: 16,
                    width: `var(${token})`,
                    background: 'var(--accent)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
              </div>
            ))}
          </Stack>
        </Section>
      </Page>
    )
  },
}

export const Radius: Story = {
  render: () => {
    const values = useTokenValues(radiusTokens)
    return (
      <Page>
        <Section title="Radius" description="Corner rounding, from inputs up to pills.">
          <Grid min={160}>
            {radiusTokens.map((token) => (
              <div key={token}>
                <div
                  style={{
                    height: 80,
                    background: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-subtle-2)',
                    borderRadius: `var(${token})`,
                    marginBottom: 'var(--space-2)',
                  }}
                />
                <TokenName>{token}</TokenName>
                <div>
                  <Value>{values[token] ?? ''}</Value>
                </div>
              </div>
            ))}
          </Grid>
        </Section>
      </Page>
    )
  },
}

export const Elevation: Story = {
  render: () => {
    const values = useTokenValues(shadowTokens)
    const roles: Record<string, string> = {
      '--shadow-sm': 'Resting cards',
      '--shadow-md': 'Popovers, menus',
      '--shadow-lg': 'Modals',
    }
    return (
      <Page>
        <Section
          title="Elevation"
          description="Deliberately restrained — this is a content-forward system, so depth comes from hairlines and whitespace before it comes from shadow."
        >
          <div style={{ background: 'var(--paper)', padding: 'var(--space-8)' }}>
            <Grid min={200}>
              {shadowTokens.map((token) => (
                <div key={token}>
                  <div
                    style={{
                      height: 90,
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: `var(${token})`,
                      marginBottom: 'var(--space-3)',
                    }}
                  />
                  <TokenName>{token}</TokenName>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                    {roles[token]}
                  </div>
                  <Value>{values[token] ?? ''}</Value>
                </div>
              ))}
            </Grid>
          </div>
        </Section>
      </Page>
    )
  },
}
