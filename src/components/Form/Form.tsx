import { Form as AriaForm, type FormProps as AriaFormProps } from 'react-aria-components'
import { cn } from '../../lib/cn'
import styles from './Form.module.css'

type Gap = 'sm' | 'md' | 'lg'

export interface FormProps extends Omit<AriaFormProps, 'className'> {
  /** Vertical rhythm between fields. */
  gap?: Gap
  className?: string
}

export const Form = ({ gap = 'md', className, ...props }: FormProps) => (
  <AriaForm {...props} className={cn(styles.form, styles[gap], className)} />
)
