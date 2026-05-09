import type { Metadata } from 'next'
import { Bebas_Neue, DM_Serif_Display, Syne } from 'next/font/google'
import './globals.css'
import PageLoader from '@/components/ui/PageLoader'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pira Web Creative Agency — Agenzia Digitale Caserta Napoli',
    template: '%s — Pira Web Creative Agency',
  },
  description: 'Unifichiamo brand direction, tecnologia e performance marketing in un\'unica visione operativa per brand visionari.',
  keywords: ['agenzia digitale', 'web agency', 'Caserta', 'Napoli', 'Shopify', 'e-commerce', 'branding', 'marketing digitale'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Pira Web Creative Agency',
    description: 'Brand direction, advanced tech, performance marketing per brand visionari.',
    type: 'website',
    url: 'https://www.piraweb.it',
    siteName: 'Pira Web Creative Agency',
    locale: 'it_IT',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web Creative Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pira Web Creative Agency',
    description: 'Brand direction, tecnologia e performance marketing per brand visionari.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Pira Web Creative Agency',
  url: 'https://www.piraweb.it',
  logo: 'https://www.piraweb.it/logo.png',
  description: 'Agenzia digitale che unisce brand direction, sviluppo web e performance marketing. Costruiamo ecosistemi digitali per brand visionari.',
  email: 'piraweb1@gmail.com',
  areaServed: ['Caserta', 'Napoli', 'Italia'],
  sameAs: [],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Caserta',
    addressCountry: 'IT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <PageLoader />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}