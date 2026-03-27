import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Progetti',
  description: 'Portfolio dei progetti realizzati da Pira Web: e-commerce, siti web, branding e campagne di marketing digitale a Caserta e Napoli.',
  openGraph: {
    title: 'Progetti — Pira Web Creative Agency',
    description: 'Portfolio dei progetti realizzati: e-commerce, siti web, branding e marketing digitale.',
    url: 'https://www.piraweb.it/progetti',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web — Portfolio Progetti' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Progetti — Pira Web Creative Agency',
    description: 'Portfolio dei progetti realizzati: e-commerce, siti web, branding e marketing.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it/progetti' },
}

export default function ProgettiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
