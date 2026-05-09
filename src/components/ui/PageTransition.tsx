'use client'

import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      aria-hidden
      className="page-transition-panel"
    />
  )
}
