import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Dal 2018 affianchiamo imprenditori nella costruzione di ecosistemi digitali solidi e scalabili. Scopri il team e la nostra visione.',
  openGraph: {
    title: 'Chi Siamo — Pira Web Creative Agency',
    description: 'Dal 2018 affianchiamo imprenditori nella costruzione di ecosistemi digitali solidi e scalabili.',
    url: 'https://www.piraweb.it/chi-siamo',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web — Chi Siamo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Siamo — Pira Web Creative Agency',
    description: 'Dal 2018 affianchiamo imprenditori nella costruzione di ecosistemi digitali solidi e scalabili.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it/chi-siamo' },
}

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
