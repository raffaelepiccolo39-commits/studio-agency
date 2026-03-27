import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cosa Facciamo',
  description: 'Branding, sviluppo web, e-commerce, social media e performance marketing. Tutti i servizi di Pira Web Creative Agency a Caserta e Napoli.',
  openGraph: {
    title: 'Cosa Facciamo — Pira Web Creative Agency',
    description: 'Branding, sviluppo web, e-commerce, social media e performance marketing.',
    url: 'https://www.piraweb.it/cosa-facciamo',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web — Servizi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosa Facciamo — Pira Web Creative Agency',
    description: 'Branding, sviluppo web, e-commerce, social media e performance marketing.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it/cosa-facciamo' },
}

export default function CosaFacciamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
