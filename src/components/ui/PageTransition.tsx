'use client'

import { usePathname } from 'next/navigation'

const STRIPES = 6

export default function PageTransition() {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      aria-hidden
      className="page-transition-stripes"
    >
      {Array.from({ length: STRIPES }).map((_, i) => (
        <div
          key={i}
          className="page-transition-stripe"
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}
