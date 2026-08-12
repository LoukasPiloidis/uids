import type { SVGProps } from 'react'

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="7" cy="7" r="5" />
    <line x1="11" y1="11" x2="14.5" y2="14.5" />
  </svg>
)
