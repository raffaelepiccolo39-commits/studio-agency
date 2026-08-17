import type { Metadata } from 'next'
import { Bebas_Neue, DM_Serif_Display, Syne } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import ScrollProgress from '@/components/ui/ScrollProgress'
import PageTransition from '@/components/ui/PageTransition'
import CookieBanner from '@/components/ui/CookieBanner'
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider'
import { getSiteSettings } from '@/lib/sanity/queries'
import { socialAttivi, type SiteSettings } from '@/data/site'
import { jsonLdScript } from '@/lib/jsonLd'

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

// Boldonse è servito da noi, non da Google Fonts.
// Il foglio di stile di Google partiva su ogni pagina prima del consenso e
// mandava l'IP di chi visita a Google: sul solo trasferimento dell'IP a Google
// Fonts c'è già giurisprudenza europea. Il font è sotto licenza SIL OFL,
// quindi ospitarlo è consentito. Gli altri font erano già serviti da noi
// tramite next/font: questo era rimasto indietro.
const boldonse = localFont({
  src: [
    { path: '../fonts/boldonse-latin.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/boldonse-latin-ext.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-boldonse',
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

// I dati dell'azienda per Google arrivano dalle Impostazioni sito su Sanity:
// cambiare il telefono nello Studio aggiorna anche la scheda nei risultati.
function organizationSchemaDa(s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: s.ragioneSociale,
    alternateName: s.nomeCommerciale,
    url: 'https://www.piraweb.it',
    logo: 'https://www.piraweb.it/logo.png',
    image: 'https://www.piraweb.it/og-image.jpg',
    description: 'Agenzia digitale che unisce brand direction, sviluppo web e performance marketing. Costruiamo ecosistemi digitali per brand visionari.',
    email: s.email,
    telephone: s.telefoni[0]?.numero,
    vatID: s.partitaIva,
    areaServed: ['Casapesenna', 'Caserta', 'Napoli', 'Campania', 'Italia'],
    sameAs: socialAttivi(s).map(({ url }) => url),
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.indirizzo.via,
      addressLocality: s.indirizzo.citta,
      addressRegion: s.indirizzo.provincia,
      postalCode: s.indirizzo.cap,
      addressCountry: s.indirizzo.nazione,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const impostazioni = await getSiteSettings()
  const organizationSchema = organizationSchemaDa(impostazioni)

  return (
    <html lang="it" className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${syne.variable} ${boldonse.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationSchema) }}
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
        {/* Meta Pixel, Trustpilot e player TikTok: caricati solo dopo il
            consenso marketing, dentro CookieBanner. Qui non deve tornarci
            niente di terze parti: quello che sta nell'<head> parte prima che
            l'utente abbia risposto al banner. */}
      </head>
      <body>
        <SiteSettingsProvider value={impostazioni}>
          <ScrollProgress />
          <PageTransition />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CookieBanner />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}