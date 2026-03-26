import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lavora con Noi — Pira Web Creative Agency',
  description: 'Entra nel team di Pira Web Creative Agency. Cerchiamo talenti appassionati di design, sviluppo web e marketing digitale.',
  openGraph: {
    title: 'Lavora con Noi — Pira Web Creative Agency',
    description: 'Entra nel team di Pira Web. Cerchiamo talenti appassionati di digitale.',
    url: 'https://www.piraweb.it/lavora-con-noi',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.piraweb.it/lavora-con-noi' },
}

export default function LavoraConNoiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
