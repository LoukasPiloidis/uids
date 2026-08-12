// Toast is still an UNSTABLE_ export in react-aria-components@1.19. Aliased here
// so the rest of the app depends on a stable local name; revisit on RAC upgrade.
import {
  UNSTABLE_Toast as AriaToast,
  Button,
  Text,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Toast.module.css'

export type ToastTone = 'neutral' | 'accent' | 'info' | 'danger'

export interface ToastContentValue {
  title: string
  description?: string
  tone?: ToastTone
}

export const toastQueue = new ToastQueue<ToastContentValue>({ maxVisibleToasts: 5 })

export interface ToastOptions {
  timeout?: number
}

export const toast = (content: ToastContentValue, options?: ToastOptions) =>
  toastQueue.add(content, options)

export interface ToasterProps {
  className?: string
}

/** Renders the live toast region. Mount once at the app root. */
export const Toaster = ({ className }: ToasterProps) => (
  <ToastRegion queue={toastQueue} className={cn(styles.region, className)}>
    {({ toast }) => (
      <AriaToast
        toast={toast}
        className={cn(styles.toast, styles[toast.content.tone ?? 'neutral'])}
      >
        <ToastContent className={styles.content}>
          <Text slot="title" className={styles.title}>
            {toast.content.title}
          </Text>
          {toast.content.description ? (
            <Text slot="description" className={styles.description}>
              {toast.content.description}
            </Text>
          ) : null}
        </ToastContent>
        <Button slot="close" className={styles.close} aria-label="Dismiss">
          ✕
        </Button>
      </AriaToast>
    )}
  </ToastRegion>
)
