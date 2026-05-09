import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import SponsorsSection from '@/components/sections/SponsorsSection'
import GallerySection from '@/components/sections/GallerySection'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pira Web Creative Agency — Agenzia Digitale Caserta Napoli',
  description: 'Agenzia digitale che unisce brand direction, sviluppo web e performance marketing. Costruiamo ecosistemi digitali per brand visionari.',
  keywords: ['agenzia digitale', 'web agency', 'Caserta', 'Napoli', 'Shopify', 'e-commerce', 'branding', 'marketing digitale'],
  openGraph: {
    title: 'Pira Web Creative Agency',
    description: 'Brand direction, tecnologia e performance marketing per brand visionari.',
    url: 'https://www.piraweb.it',
    siteName: 'Pira Web Creative Agency',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630, alt: 'Pira Web Creative Agency — Agenzia Digitale' }],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pira Web Creative Agency',
    description: 'Brand direction, tecnologia e performance marketing per brand visionari.',
    images: ['https://www.piraweb.it/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.piraweb.it' },
}

export default async function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <MarqueeSection />
        <ProjectsSection />
        <ServicesSection />
        <SponsorsSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  )
}
