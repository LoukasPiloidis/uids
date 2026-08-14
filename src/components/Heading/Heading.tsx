import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Heading.module.css'

type Level = 1 | 2 | 3 | 4

const tags = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Type scale step. Also picks the tag unless `as` overrides it. */
  level?: Level
  /**
   * Render a different tag than `level` implies, for when the visual weight and
   * the document outline disagree.
   */
  as?: ElementType
  children?: ReactNode
  className?: string
}

export const Heading = ({
  level = 2,
  as: Component,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Tag = Component ?? tags[level]
  return (
    <Tag {...props} className={cn(styles.heading, styles[`level${level}`], className)}>
      {children}
    </Tag>
  )
}
