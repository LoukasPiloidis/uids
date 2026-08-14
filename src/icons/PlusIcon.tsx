import type { SVGProps } from 'react'

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 14 14"
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <line x1="7" y1="2.5" x2="7" y2="11.5" />
    <line x1="2.5" y1="7" x2="11.5" y2="7" />
  </svg>
)
