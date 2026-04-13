'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/contex-biancheria'

const IMG = {
  heroLaptop:    `${BASE}/context-pira-01.jpg`,
  asciugamani:   `${BASE}/context-pira-02.jpg`,
  screenshotSito:`${BASE}/context-pira-03.jpg`,
  canovacci:     `${BASE}/context-pira-04.jpg`,
  poltrona:      `${BASE}/context-pira-05.jpg`,
  video:         `${BASE}/video-context.mp4`,
  menuSito:      `${BASE}/context-pira-06.jpg`,
  cuscinoDivano: `${BASE}/context-pira-08.jpg`,
  brandSection:  `${BASE}/context-pira-09.jpg`,
  fullSito:      `${BASE}/context-pira-10.jpg`,
  tessuto:       `${BASE}/context-pira-11.jpg`,
  personaTessuto:`${BASE}/context-pira-12.jpg`,
  etroLabel:     `${BASE}/context-pira-13.jpg`,
  lettoMissoni:  `${BASE}/context-pira-14.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#ffffff', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroLaptop}
        alt="Con.tex Biancheria hero laptop mockup"
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
        aspectRatio: '16/9',
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

function Row2({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="bluemoon-row-2">
      {left}
      {right}
    </div>
  )
}

export default function ContexGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: laptop su divano */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — asciugamani su lampada + screenshot sito */}
        <Row2
          left={<GalleryImg src={IMG.asciugamani} alt="Asciugamani Con.tex su lampada" animDir="left" />}
          right={<GalleryImg src={IMG.screenshotSito} alt="Screenshot sito Con.tex Biancheria" animDir="right" delay={0.1} />}
        />

        {/* S3 — pagina canovacci + poltrona Etro */}
        <Row2
          left={<GalleryImg src={IMG.canovacci} alt="Pagina canovacci e-commerce" animDir="left" />}
          right={<GalleryImg src={IMG.poltrona} alt="Poltrona con cuscino Etro" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Video full width */}
      <VideoSection />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: `${GAP} ${GAP} 0` }}>

        {/* S5 — menu sito + cuscino su divano */}
        <Row2
          left={<GalleryImg src={IMG.menuSito} alt="Menu navigazione sito Con.tex" animDir="left" />}
          right={<GalleryImg src={IMG.cuscinoDivano} alt="Cuscino Etro su divano" animDir="right" delay={0.1} />}
        />

        {/* S6 — sezione brand + screenshot full sito */}
        <Row2
          left={<GalleryImg src={IMG.brandSection} alt="Sezione brand Missoni Blumarine" animDir="left" />}
          right={<GalleryImg src={IMG.fullSito} alt="Vista completa sito Con.tex" animDir="right" delay={0.1} />}
        />

        {/* S7 — tessuto piegato + persona tocca tessuto */}
        <Row2
          left={<GalleryImg src={IMG.tessuto} alt="Tessuto paisley piegato" animDir="left" />}
          right={<GalleryImg src={IMG.personaTessuto} alt="Dettaglio tessuto lavorato a mano" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S8 — Dettaglio Etro + letto Missoni full width */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>
        <Row2
          left={<GalleryImg src={IMG.etroLabel} alt="Dettaglio etichetta Etro" animDir="left" />}
          right={<GalleryImg src={IMG.lettoMissoni} alt="Letto con cuscini Missoni" animDir="right" delay={0.1} />}
        />
      </div>

    </section>
  )
}
