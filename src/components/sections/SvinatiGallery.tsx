'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/svinati'

const IMG = {
  heroGrid:      `${BASE}/svinati-case-study-01.jpg`,
  piattoMano:    `${BASE}/svinati-02.jpg`,
  feedInstagram: `${BASE}/svinati-case-study-03.jpg`,
  paniniVino:    `${BASE}/svinati-case-study-04.jpg`,
  postIngredient:`${BASE}/svinati-case-study-05.jpg`,
  morsoPanino:   `${BASE}/svinati-case-study-06.jpg`,
  pastaForchetta:`${BASE}/svinati-case-study-07.jpg`,
  gridSocial:    `${BASE}/svinati-case-study-08.jpg`,
  salmone:       `${BASE}/svinati-case-study-09.jpg`,
  brindisi:      `${BASE}/svinati-case-study-10.jpg`,
  piattiTavolo:  `${BASE}/svinati-case-study-11.jpg`,
  postCarosello: `${BASE}/svinati-case-study-12.jpg`,
  crocchette:    `${BASE}/svinati-case-study-13.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#0a0a0a', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroGrid}
        alt="Svinati food photography grid"
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
        background: '#0a0a0a',
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

export default function SvinatiGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: griglia piatti */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — piatto in mano + feed Instagram */}
        <Row2
          left={<GalleryImg src={IMG.piattoMano} alt="Piatto servito a mano" animDir="left" />}
          right={<GalleryImg src={IMG.feedInstagram} alt="Feed Instagram Svinati" animDir="right" delay={0.1} />}
        />

        {/* S3 — panini e vino + post ingredienti */}
        <Row2
          left={<GalleryImg src={IMG.paniniVino} alt="Panini gourmet e degustazione" animDir="left" />}
          right={<GalleryImg src={IMG.postIngredient} alt="Post Instagram ingredienti piatto" animDir="right" delay={0.1} />}
        />

        {/* S4 — morso panino + pasta con forchetta */}
        <Row2
          left={<GalleryImg src={IMG.morsoPanino} alt="Morso panino gourmet" animDir="left" />}
          right={<GalleryImg src={IMG.pastaForchetta} alt="Pasta alla forchetta" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S5 — Griglia social full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.gridSocial} alt="Griglia contenuti social Svinati" animDir="up" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S6 — salmone + brindisi calici */}
        <Row2
          left={<GalleryImg src={IMG.salmone} alt="Salmone in crosta" animDir="left" />}
          right={<GalleryImg src={IMG.brindisi} alt="Brindisi con calici di vino" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S7 — Piatti tavolo full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.piattiTavolo} alt="Piatti sul tavolo dall'alto" animDir="up" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S8 — carosello post + crocchette e tramezzini */}
        <Row2
          left={<GalleryImg src={IMG.postCarosello} alt="Carosello post Instagram" animDir="left" />}
          right={<GalleryImg src={IMG.crocchette} alt="Crocchette e tramezzini gourmet" animDir="right" delay={0.1} />}
        />

      </div>

    </section>
  )
}
