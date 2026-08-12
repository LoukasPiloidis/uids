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

export interface DialogProps
  extends Omit<ModalOverlayProps, 'className' | 'children'>,
    Pick<AriaDialogProps, 'role' | 'aria-label'> {
  title?: string
  children: ReactNode | ((opts: DialogRenderProps) => ReactNode)
  className?: string
}

export const Dialog = ({ title, children, className, role, ...props }: DialogProps) => (
  <ModalOverlay {...props} className={styles.overlay}>
    <Modal className={styles.modal}>
      <AriaDialog role={role} className={cn(styles.dialog, className)}>
        {(renderProps) => (
          <>
            {title ? (
              <Heading slot="title" className={styles.title}>
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
