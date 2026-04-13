'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/quadrifoglio-group'

const IMG = {
  heroLogo:      `${BASE}/quadrifoglio-01.jpg`,
  iconaOperaio:  `${BASE}/quadrifoglio-02.jpg`,
  claimCantiere: `${BASE}/quadrifoglio-03.jpg`,
  cartellina:    `${BASE}/quadrifoglio-04.jpg`,
  soggiorno:     `${BASE}/quadrifoglio-05.jpg`,
  caschi:        `${BASE}/quadrifoglio-06.jpg`,
  bigliettoRetro:`${BASE}/quadrifoglio-07.jpg`,
  gridLogo:      `${BASE}/quadrifoglio-08.jpg`,
  operaioMaglia: `${BASE}/quadrifoglio-09.jpg`,
  bigliettoFronte:`${BASE}/quadrifoglio-10.jpg`,
  palette:       `${BASE}/quadrifoglio-11.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#1a1a1a', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroLogo}
        alt="Quadrifoglio Group logo"
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
        background: '#1a1a1a',
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

function Row2({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="bluemoon-row-2">
      {left}
      {right}
    </div>
  )
}

export default function QuadrifoglioGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: logo Quadrifoglio Group */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — icona operaio b/n + claim cantiere */}
        <Row2
          left={<GalleryImg src={IMG.iconaOperaio} alt="Icona logo su operaio" animDir="left" />}
          right={<GalleryImg src={IMG.claimCantiere} alt="Due generazioni, un'unica passione: costruire" animDir="right" delay={0.1} />}
        />

        {/* S3 — cartellina brand + soggiorno ristrutturato */}
        <Row2
          left={<GalleryImg src={IMG.cartellina} alt="Cartellina Quadrifoglio Group" animDir="left" />}
          right={<GalleryImg src={IMG.soggiorno} alt="Soggiorno ristrutturato" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Caschi cantiere full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.caschi} alt="Caschi da cantiere giallo e bianchi" animDir="up" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S5 — biglietto retro su cemento + griglia costruzione logo */}
        <Row2
          left={<GalleryImg src={IMG.bigliettoRetro} alt="Biglietto da visita su cemento" animDir="left" />}
          right={<GalleryImg src={IMG.gridLogo} alt="Griglia costruzione logo" animDir="right" delay={0.1} />}
        />

        {/* S6 — operaio con maglia brand + biglietto fronte */}
        <Row2
          left={<GalleryImg src={IMG.operaioMaglia} alt="Operaio con maglia Quadrifoglio Group" animDir="left" />}
          right={<GalleryImg src={IMG.bigliettoFronte} alt="Biglietto da visita fronte" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S7 — Palette colori full width */}
      <div style={{ marginTop: GAP }}>
        <GalleryImg src={IMG.palette} alt="Palette colori brand Quadrifoglio Group" animDir="up" />
      </div>

    </section>
  )
}
