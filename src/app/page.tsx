import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import PartnersSection from '@/components/sections/PartnersSection'

export default async function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ProjectsSection projects={[]} />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}