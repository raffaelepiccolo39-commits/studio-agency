'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/alma-studio'

const IMG = {
  hero:          `${BASE}/alma-studio-case-study-01.jpg`,
  biglietto:     `${BASE}/alma-studio-02.jpg`,
  commercialista:`${BASE}/alma-studio-03.jpg`,
  claim:         `${BASE}/alma-studio-case-study-04.jpg`,
  instagram:     `${BASE}/alma-studio-case-study-05.jpg`,
  insegna:       `${BASE}/alma-studio-case-study-06.jpg`,
  bigliettoMat:  `${BASE}/alma-studio-07.jpg`,
  scrivania:     `${BASE}/alma-studio-08.jpg`,
  brochure:      `${BASE}/alma-studio-case-study-09.jpg`,
  postSingolo:   `${BASE}/alma-studio-case-study-10.jpg`,
  carosello:     `${BASE}/alma-studio-case-study-11.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#ffffff', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.hero}
        alt="Alma Studio brand hero"
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

function Row2({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="bluemoon-row-2">
      {left}
      {right}
    </div>
  )
}

export default function AlmaGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: logo con occhiali */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — biglietto da visita + commercialista al lavoro */}
        <Row2
          left={<GalleryImg src={IMG.biglietto} alt="Biglietto da visita Alma Studio" animDir="left" />}
          right={<GalleryImg src={IMG.commercialista} alt="Commercialista al lavoro" animDir="right" delay={0.1} />}
        />

        {/* S3 — claim grafico + mockup Instagram */}
        <Row2
          left={<GalleryImg src={IMG.claim} alt="Claim Alma Studio" animDir="left" />}
          right={<GalleryImg src={IMG.instagram} alt="Profilo Instagram Alma Studio" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Insegna esterna full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.insegna} alt="Insegna esterna Alma Studio" animDir="up" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S5 — biglietto su mattoni + scrivania */}
        <Row2
          left={<GalleryImg src={IMG.bigliettoMat} alt="Biglietto Alma su mattoni" animDir="left" />}
          right={<GalleryImg src={IMG.scrivania} alt="Scrivania studio" animDir="right" delay={0.1} />}
        />

        {/* S6 — brochure su cuscino + post Instagram */}
        <Row2
          left={<GalleryImg src={IMG.brochure} alt="Brochure Alma su cuscino" animDir="left" />}
          right={<GalleryImg src={IMG.postSingolo} alt="Post Instagram Alma Studio" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S7 — Carosello social full width */}
      <div style={{ marginTop: GAP }}>
        <GalleryImg src={IMG.carosello} alt="Carosello contenuti social Alma Studio" animDir="up" />
      </div>

    </section>
  )
}
