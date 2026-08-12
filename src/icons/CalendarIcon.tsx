import type { SVGProps } from 'react'

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="2" y="3.5" width="12" height="10.5" rx="1.5" />
    <path d="M2 6.5 H14" />
    <path d="M5.5 2 V4" />
    <path d="M10.5 2 V4" />
  </svg>
)
