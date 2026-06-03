import type { Metadata, Viewport } from 'next'

// Metadata server-side senza importare next-sanity (che trascinerebbe il
// codice client dello Studio nel grafo server). /studio è escluso dall'indice.
export const metadata: Metadata = {
  title: 'Pira Web Studio',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
