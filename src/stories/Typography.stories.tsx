import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page, Section, Stack, TokenName, useTokenValues, Value } from './kit'
import { fontTokens, lineHeightTokens, textSizeTokens, weightTokens } from './tokens'

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Two families, deliberately split: a sans for interface chrome and a serif for long-form reading. Sizes, line-heights and weights are tokens — never hard-code a px value in a component.',
      },
    },
  },
  tags: ['!autodocs'],
}
export default meta

type Story = StoryObj

const specimen = 'The quick brown fox jumps over the lazy dog'

const Line = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      padding: 'var(--space-3) 0',
      borderTop: '1px solid var(--border)',
    }}
  >
    {children}
  </div>
)

const Meta_ = ({ token, value }: { token: string; value: string }) => (
  <div style={{ minWidth: 190, flexShrink: 0 }}>
    <div>
      <TokenName>{token}</TokenName>
    </div>
    <Value>{value || '—'}</Value>
  </div>
)

export const Families: Story = {
  render: () => {
    const values = useTokenValues(fontTokens)
    const roles: Record<string, string> = {
      '--font-ui': 'Interface chrome: buttons, labels, navigation, meta.',
      '--font-reading': 'Long-form bodies — posts, replies, articles.',
      '--font-mono': 'Code, tokens, IDs.',
    }
    return (
      <Page>
        <Section
          title="Families"
          description="System stacks, so there is no webfont to load and no layout shift."
        >
          <Stack gap={6}>
            {fontTokens.map((token) => (
              <div key={token}>
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <TokenName>{token}</TokenName>
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-sm)',
                      marginLeft: 'var(--space-3)',
                    }}
                  >
                    {roles[token]}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: `var(${token})`,
                    fontSize: 'var(--text-xl)',
                    color: 'var(--ink)',
                  }}
                >
                  {specimen}
                </div>
                <Value>{values[token] ?? ''}</Value>
              </div>
            ))}
          </Stack>
        </Section>
      </Page>
    )
  },
}

export const Scale: Story = {
  render: () => {
    const values = useTokenValues(textSizeTokens)
    const roles: Record<string, string> = {
      '--text-xs': 'Timestamps, counts',
      '--text-sm': 'Meta, labels',
      '--text-base': 'UI default',
      '--text-md': 'Reading body',
      '--text-lg': 'Reply lead',
      '--text-xl': 'Thread title',
      '--text-2xl': 'Section heading',
      '--text-3xl': 'Page title',
    }
    return (
      <Page>
        <Section title="Size scale" description="Eight steps. Anything outside this list is a bug.">
          {textSizeTokens.map((token) => (
            <Line key={token}>
              <Meta_ token={token} value={values[token] ?? ''} />
              <div style={{ fontSize: `var(${token})`, color: 'var(--ink)', lineHeight: 1.3 }}>
                {roles[token]}
              </div>
            </Line>
          ))}
        </Section>
      </Page>
    )
  },
}

export const LineHeights: Story = {
  name: 'Line heights',
  render: () => {
    const values = useTokenValues(lineHeightTokens)
    const paragraph =
      'Typography is what language looks like. A line height that is too tight makes long text feel cramped; too loose and the lines stop reading as a block.'
    return (
      <Page>
        <Section
          title="Line heights"
          description="Tight for headings, reading for serif bodies. --lh-reading pairs with --font-reading."
        >
          {lineHeightTokens.map((token) => (
            <Line key={token}>
              <Meta_ token={token} value={values[token] ?? ''} />
              <p
                style={{
                  lineHeight: `var(${token})`,
                  maxWidth: '52ch',
                  margin: 0,
                  color: 'var(--text)',
                  fontFamily: token === '--lh-reading' ? 'var(--font-reading)' : 'var(--font-ui)',
                }}
              >
                {paragraph}
              </p>
            </Line>
          ))}
        </Section>
      </Page>
    )
  },
}

export const Weights: Story = {
  render: () => {
    const values = useTokenValues(weightTokens)
    return (
      <Page>
        <Section title="Weights" description="Four steps; --weight-semi carries most emphasis.">
          {weightTokens.map((token) => (
            <Line key={token}>
              <Meta_ token={token} value={values[token] ?? ''} />
              <div
                style={{
                  fontWeight: `var(${token})` as React.CSSProperties['fontWeight'],
                  fontSize: 'var(--text-lg)',
                  color: 'var(--ink)',
                }}
              >
                {specimen}
              </div>
            </Line>
          ))}
        </Section>
      </Page>
    )
  },
}

export const ReadingMeasure: Story = {
  name: 'Reading measure',
  render: () => (
    <Page>
      <Section
        title="Reading measure"
        description="--measure (68ch) caps long-form text at a comfortable line length. Apply it to post and article bodies, never to UI chrome."
      >
        <p
          style={{
            fontFamily: 'var(--font-reading)',
            fontSize: 'var(--text-md)',
            lineHeight: 'var(--lh-reading)',
            maxWidth: 'var(--measure)',
            color: 'var(--text)',
          }}
        >
          Anything above roughly seventy-five characters per line and the eye starts losing its
          place on the return sweep; anything under about forty-five and the rhythm breaks up into
          fragments. The measure token exists so that decision is made once, centrally, rather than
          re-argued in every component that happens to render a paragraph. Set it on the container,
          let the text find its own width beneath it, and long-form reading stays comfortable at any
          viewport.
        </p>
      </Section>
    </Page>
  ),
}
