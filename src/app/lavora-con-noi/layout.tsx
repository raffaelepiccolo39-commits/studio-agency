import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lavora con Noi',
  description: 'Entra nel team di Pira Web Creative Agency. Cerchiamo talenti appassionati di design, sviluppo web e marketing digitale.',
  openGraph: {
    title: 'Lavora con Noi — Pira Web Creative Agency',
    description: 'Entra nel team di Pira Web. Cerchiamo talenti appassionati di design, sviluppo e marketing digitale.',
    url: 'https://www.piraweb.it/lavora-con-noi',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web — Lavora con Noi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lavora con Noi — Pira Web Creative Agency',
    description: 'Entra nel team di Pira Web. Cerchiamo talenti appassionati di digitale.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it/lavora-con-noi' },
}

export default function LavoraConNoiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
