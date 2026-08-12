import type { SVGProps } from 'react'

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M2.5 4.5 L6 8 L9.5 4.5" />
  </svg>
)
