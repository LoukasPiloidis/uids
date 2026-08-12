import { cn } from '../../lib/cn'
import styles from './Avatar.module.css'

export interface AvatarProps {
  name?: string | null
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Avatar = ({ name, src, size = 'md', className }: AvatarProps) => {
  if (src) {
    return <img src={src} alt="" className={cn(styles.avatar, styles[size], className)} />
  }
  const initial = (name?.trim()?.[0] ?? '?').toUpperCase()
  return (
    <span className={cn(styles.avatar, styles[size], className)} aria-hidden="true">
      {initial}
    </span>
  )
}
