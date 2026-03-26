import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti — Pira Web Creative Agency',
  description: 'Contatta Pira Web Creative Agency. Siamo a Caserta e Napoli. Richiedi una consulenza gratuita per il tuo progetto digitale.',
  openGraph: {
    title: 'Contatti — Pira Web Creative Agency',
    description: 'Richiedi una consulenza gratuita per il tuo progetto digitale.',
    url: 'https://www.piraweb.it/contatti',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.piraweb.it/contatti' },
}

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
