import type { SVGProps } from 'react'

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    width={12}
    height={12}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 2.5 L8 6 L4 9.5" />
  </svg>
)
