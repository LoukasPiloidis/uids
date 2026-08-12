import type { SVGProps } from 'react'

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points="2.5,7.5 6,11 11.5,3.5" />
  </svg>
)
