'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/alba-ricambi'

const IMG = {
  heroLaptop:    `${BASE}/sito-alba-01.jpg`,
  logoOlio:      `${BASE}/sito-alba-02.jpg`,
  screenshotSito:`${BASE}/sito-alba-03.jpg`,
  sezioniSito:   `${BASE}/sito-alba-04.jpg`,
  carrelloPopup: `${BASE}/sito-alba-05.jpg`,
  video:         `${BASE}/video-alba.mp4`,
  categorie:     `${BASE}/sito-alba-07.jpg`,
  catalogo:      `${BASE}/sito-alba-08.jpg`,
  gif:           `${BASE}/gif-alba.gif`,
  carrelloFull:  `${BASE}/sito-alba-10.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#c00', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroLaptop}
        alt="Alba Ricambi e-commerce laptop mockup"
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
        background: '#111',
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

export default function AlbaRicambiGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: laptop su sfondo rosso */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — logo olio motore + screenshot sito */}
        <Row2
          left={<GalleryImg src={IMG.logoOlio} alt="Logo Alba Ricambi su olio motore" animDir="left" />}
          right={<GalleryImg src={IMG.screenshotSito} alt="Screenshot homepage Alba Ricambi" animDir="right" delay={0.1} />}
        />

        {/* S3 — sezioni sito + popup carrello */}
        <Row2
          left={<GalleryImg src={IMG.sezioniSito} alt="Sezioni e-commerce Alba Ricambi" animDir="left" />}
          right={<GalleryImg src={IMG.carrelloPopup} alt="Popup carrello acquisti" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Video full width */}
      <VideoSection />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S5 — categorie ricambi + catalogo alternatori */}
        <Row2
          left={<GalleryImg src={IMG.categorie} alt="Categorie ricambi auto" animDir="left" />}
          right={<GalleryImg src={IMG.catalogo} alt="Catalogo alternatori" animDir="right" delay={0.1} />}
        />

        {/* S6 — GIF animata + carrello completo */}
        <Row2
          left={<GalleryImg src={IMG.gif} alt="GIF animata Alba Ricambi" animDir="left" />}
          right={<GalleryImg src={IMG.carrelloFull} alt="Pagina carrello completa" animDir="right" delay={0.1} />}
        />

      </div>

    </section>
  )
}
