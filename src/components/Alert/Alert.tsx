import type { ReactNode } from 'react'
import { Button } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Alert.module.css'

type Tone = 'accent' | 'info' | 'neutral' | 'warning' | 'danger'

export interface AlertProps {
  tone?: Tone
  /** Bolded first line. Omit it and the children carry the whole message. */
  title?: string
  /** Leading glyph. Decorative — the tone and copy carry the meaning. */
  icon?: ReactNode
  children?: ReactNode
  /** Renders a dismiss button. The caller owns the resulting visibility state. */
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

/**
 * A message that stays on the page: form-level validation, a failed save, the
 * result of an import. Danger and warning tones announce themselves as alerts.
 */
export const Alert = ({
  tone = 'info',
  title,
  icon,
  children,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
}: AlertProps) => (
  // Only the tones that report a problem interrupt a screen reader; an info or
  // accent note is read in document order like any other paragraph.
  <div
    role={tone === 'danger' || tone === 'warning' ? 'alert' : undefined}
    className={cn(styles.alert, styles[tone], className)}
  >
    {icon ? (
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    ) : null}
    <div className={styles.body}>
      {title ? <p className={styles.title}>{title}</p> : null}
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
    {onDismiss ? (
      <Button className={styles.dismiss} aria-label={dismissLabel} onPress={onDismiss}>
        ✕
      </Button>
    ) : null}
  </div>
)
