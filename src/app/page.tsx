import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import StatsSection from '@/components/sections/StatsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import SponsorsSection from '@/components/sections/SponsorsSection'
import MetodoSection from '@/components/sections/MetodoSection'
import TikTokSection from '@/components/sections/TikTokSection'
import { getProjects, getServizi, getPagina } from '@/lib/sanity/queries'

import type { Metadata } from 'next'

// La home tiene le sue keyword e la sua scheda social, ma titolo e descrizione
// arrivano dallo Studio come per le altre pagine (piraweb.it/studio → Pagine).
export async function generateMetadata(): Promise<Metadata> {
  const pagina = await getPagina('/')
  const titolo = pagina?.titoloSeo ?? ''
  const descrizione = pagina?.descrizioneSeo ?? ''
  return {
    title: titolo,
    description: descrizione,
    keywords: ['agenzia digitale', 'web agency', 'Caserta', 'Napoli', 'Shopify', 'e-commerce', 'branding', 'marketing digitale'],
    openGraph: {
      title: titolo,
      description: descrizione,
      url: 'https://www.piraweb.it',
      siteName: 'Pira Web Creative Agency',
      images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web Creative Agency — Agenzia Digitale' }],
      type: 'website',
      locale: 'it_IT',
    },
    twitter: {
      card: 'summary_large_image',
      title: titolo,
      description: descrizione,
      images: ['https://www.piraweb.it/og-image.jpg'],
    },
    alternates: { canonical: 'https://www.piraweb.it' },
  }
}

export default async function Home() {
  const [projects, servizi] = await Promise.all([getProjects(), getServizi()])
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <MarqueeSection />
        <StatsSection />
        <ProjectsSection projects={projects} />
        <ServicesSection servizi={servizi} />
        <SponsorsSection />
        <MetodoSection />
        <TikTokSection />
      </main>
      <Footer />
    </>
  )
}
