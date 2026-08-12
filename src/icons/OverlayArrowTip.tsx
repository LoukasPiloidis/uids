import type { SVGProps } from 'react'

export const OverlayArrowTip = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" width={12} height={12} aria-hidden="true" {...props}>
    <path d="M0 0 L6 6 L12 0" />
  </svg>
)
