import type { Metadata } from 'next'
import { Bebas_Neue, DM_Serif_Display, Syne } from 'next/font/google'
import './globals.css'
import PageLoader from '@/components/ui/PageLoader'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import ScrollProgress from '@/components/ui/ScrollProgress'
import PageTransition from '@/components/ui/PageTransition'
import CookieBanner from '@/components/ui/CookieBanner'

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
  name: 'Pira Web S.r.l.',
  alternateName: 'Pira Web Creative Agency',
  url: 'https://www.piraweb.it',
  logo: 'https://www.piraweb.it/logo.png',
  image: 'https://www.piraweb.it/og-image.jpg',
  description: 'Agenzia digitale che unisce brand direction, sviluppo web e performance marketing. Costruiamo ecosistemi digitali per brand visionari.',
  email: 'info@piraweb.it',
  telephone: '+3908117560017',
  vatID: 'IT04891370613',
  areaServed: ['Casapesenna', 'Caserta', 'Napoli', 'Campania', 'Italia'],
  sameAs: [],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via A. Petrillo 171',
    addressLocality: 'Casapesenna',
    addressRegion: 'CE',
    postalCode: '81030',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Consent Mode v2 (default: denied) + GA4 — il consenso verrà aggiornato dalla CMP/cookie banner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
              gtag('js', new Date());
              gtag('config','G-P84R9MYBB5');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P84R9MYBB5" />
        {/* Meta Pixel: caricato solo dopo il consenso marketing (vedi CookieBanner) */}
      </head>
      <body>
        <PageLoader />
        <ScrollProgress />
        <PageTransition />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <CookieBanner />
      </body>
    </html>
  )
}