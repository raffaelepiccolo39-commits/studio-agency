'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/pasticceria-bluemoon'

const IMG = {
  heroLaptop:      `${BASE}/hero-laptop.jpg`,
  pasticcere:      `${BASE}/pasticcere.jpg`,
  screenshotSito:  `${BASE}/screenshot-sito.jpg`,
  mockupProdotto:  `${BASE}/mockup-prodotto.jpg`,
  grigliaProdotti: `${BASE}/griglia-prodotti.jpg`,
  video:           `${BASE}/video.mp4`,
  laptopMockup:    `${BASE}/laptop-mockup.jpg`,
  panettone:       `${BASE}/panettone.jpg`,
  gifPassticceri:  `${BASE}/gif-pasticceri.gif`,
  brochure:        `${BASE}/brochure.jpg`,
  moodboard:       `${BASE}/moodboard.jpg`,
}

const GAP = '10px'

// Hero con Ken Burns + fade in
function HeroImg() {
  return (
    <div style={{ background: '#ffffff', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroLaptop}
        alt="Bluemoon hero laptop mockup"
        loading="eager"
        style={{
          width: '100%', height: 'auto', display: 'block',
          animation: 'kenBurns 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
          transformOrigin: 'center center',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

// Immagine singola con hover zoom + reveal scroll
function GalleryImg({
  src, alt, loading = 'lazy',
  animDir = 'up', delay = 0,
}: {
  src: string; alt: string
  loading?: 'lazy' | 'eager'
  animDir?: 'up' | 'left' | 'right'
  delay?: number
}) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

  const animMap = { up: 'fadeUp', left: 'fadeLeft', right: 'fadeRight' }

  return (
    <div
      ref={ref}
      style={{
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: 0,
        opacity: inView ? 1 : 0,
        animation: inView
          ? `${animMap[animDir]} 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
          : 'none',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        style={{
          width: '100%', height: 'auto', display: 'block',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
      />
    </div>
  )
}

// Video con fade-up al reveal
function VideoSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      style={{
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: inView ? 1 : 0,
        animation: inView ? 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both' : 'none',
      }}
    >
      <video
        src={IMG.video}
        autoPlay muted loop playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        onError={e => { (e.currentTarget as HTMLVideoElement).style.display = 'none' }}
      />
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.15 }}>
          <circle cx="32" cy="32" r="31" stroke="white" strokeWidth="2"/>
          <polygon points="26,20 48,32 26,44" fill="white"/>
        </svg>
      </div>
    </div>
  )
}

// Riga a 2 colonne con reveal staggerato sx/dx
function Row2({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="bluemoon-row-2">
      {left}
      {right}
    </div>
  )
}

export default function BluemoonGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width con Ken Burns */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — pasticcere (sx) + screenshot sito (dx) */}
        <Row2
          left={<GalleryImg src={IMG.pasticcere} alt="Pasticcere al lavoro" animDir="left" />}
          right={<GalleryImg src={IMG.screenshotSito} alt="Screenshot sito Bluemoon" animDir="right" delay={0.1} />}
        />

        {/* S3 — mockup prodotto (sx) + griglia prodotti (dx) */}
        <Row2
          left={<GalleryImg src={IMG.mockupProdotto} alt="Mockup pagina prodotto" animDir="left" />}
          right={<GalleryImg src={IMG.grigliaProdotti} alt="Griglia prodotti e-commerce" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Video full width */}
      <VideoSection />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: `${GAP} ${GAP} 0` }}>

        {/* S5 — laptop mockup (sx) + panettone (dx) */}
        <Row2
          left={<GalleryImg src={IMG.laptopMockup} alt="Laptop mockup Bluemoon" animDir="left" />}
          right={<GalleryImg src={IMG.panettone} alt="Panettone tagliato" animDir="right" delay={0.1} />}
        />

        {/* S6 — GIF pasticceri (sx) + brochure (dx) */}
        <Row2
          left={<GalleryImg src={IMG.gifPassticceri} alt="GIF pasticceri" animDir="left" />}
          right={<GalleryImg src={IMG.brochure} alt="Layout rivista brochure" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S7 — Moodboard full width */}
      <div style={{ marginTop: GAP }}>
        <GalleryImg src={IMG.moodboard} alt="Moodboard finale Bluemoon" animDir="up" />
      </div>

    </section>
  )
}
