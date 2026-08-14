import type { ReactNode } from 'react'
import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Dialog.module.css'

type DialogRenderProps = { close: () => void }

type Variant = 'modal' | 'sheet' | 'fullscreen'

export interface DialogProps
  extends Omit<ModalOverlayProps, 'className' | 'children'>,
    Pick<AriaDialogProps, 'role' | 'aria-label'> {
  title?: string
  /**
   * `modal` centres a panel; `sheet` slides up from the bottom edge and `fullscreen`
   * takes the whole viewport — both of which read better than a centred panel on a
   * phone, and both respect the safe-area insets.
   */
  variant?: Variant
  /**
   * Keep the title in the accessibility tree but hide it visually, for dialogs whose
   * content already carries a heading. Prefer this over omitting `title`, which
   * leaves the dialog without an accessible name.
   */
  hideTitle?: boolean
  children: ReactNode | ((opts: DialogRenderProps) => ReactNode)
  className?: string
}

export const Dialog = ({
  title,
  variant = 'modal',
  hideTitle = false,
  children,
  className,
  role,
  ...props
}: DialogProps) => (
  <ModalOverlay {...props} className={cn(styles.overlay, styles[`${variant}Overlay`])}>
    <Modal className={cn(styles.modal, styles[variant])}>
      <AriaDialog role={role} className={cn(styles.dialog, className)}>
        {(renderProps) => (
          <>
            {title ? (
              <Heading
                slot="title"
                className={cn(styles.title, hideTitle && styles.visuallyHidden)}
              >
                {title}
              </Heading>
            ) : null}
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )}
      </AriaDialog>
    </Modal>
  </ModalOverlay>
)

export interface DialogFooterProps {
  children: ReactNode
  className?: string
}

/**
 * The action row at the bottom of a dialog. Buttons are laid out end-aligned in
 * source order, so the confirming action goes last — the position users' eyes
 * land on when they finish reading.
 */
export const DialogFooter = ({ children, className }: DialogFooterProps) => (
  <div className={cn(styles.footer, className)}>{children}</div>
)

export { DialogTrigger }
