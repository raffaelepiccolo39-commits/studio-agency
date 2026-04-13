'use client'

import { useInView } from 'react-intersection-observer'

const BASE = '/progetti/maestri-cotonieri'

const IMG = {
  heroLetto:     `${BASE}/maestri-cotonieri-pira-01.jpg`,
  composizione:  `${BASE}/maestri-cotonieri-02.jpg`,
  tavolaVerde:   `${BASE}/maestri-cotonieri-pira-03.jpg`,
  tavolaFiori:   `${BASE}/maestri-cotonieri-pira-04.jpg`,
  lettoRosa:     `${BASE}/maestri-cotonieri-pira-05.jpg`,
  vassioioBlu:   `${BASE}/maestri-cotonieri-06.jpg`,
  vassoioClose:  `${BASE}/maestri-cotonieri-pira-07.jpg`,
  stories:       `${BASE}/maestri-cotonieri-08.jpg`,
  feedInstagram: `${BASE}/maestri-cotonieri-pira-09.jpg`,
  gridPost:      `${BASE}/maestri-cotonieri-10.jpg`,
  postElegance:  `${BASE}/maestri-cotonieri-pira-11.jpg`,
  storiesDue:    `${BASE}/maestri-cotonieri-pira-12.jpg`,
}

const GAP = '10px'

function HeroImg() {
  return (
    <div style={{ background: '#ffffff', overflow: 'hidden', position: 'relative', lineHeight: 0 }}>
      <img
        src={IMG.heroLetto}
        alt="Maestri Cotonieri letto con libro e tazza"
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

export default function MaestriCotonieriGallery() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>

      {/* S1 — Hero full width: letto con libro e tazza */}
      <HeroImg />

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S2 — composizione letto + tavola verde con posate */}
        <Row2
          left={<GalleryImg src={IMG.composizione} alt="Composizione shooting letto" animDir="left" />}
          right={<GalleryImg src={IMG.tavolaVerde} alt="Tavola apparecchiata verde e rosa" animDir="right" delay={0.1} />}
        />

        {/* S3 — tavola fiori blu + letto rosa shooting */}
        <Row2
          left={<GalleryImg src={IMG.tavolaFiori} alt="Tavola con tovaglia a fiori blu" animDir="left" />}
          right={<GalleryImg src={IMG.lettoRosa} alt="Shooting letto rosa" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S4 — Vassoio blu su letto full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.vassioioBlu} alt="Vassoio con fiori e tazza su letto blu" animDir="up" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, padding: GAP }}>

        {/* S5 — vassoio close-up + stories Instagram */}
        <Row2
          left={<GalleryImg src={IMG.vassoioClose} alt="Dettaglio vassoio e tazza" animDir="left" />}
          right={<GalleryImg src={IMG.stories} alt="Stories Instagram Maestri Cotonieri" animDir="right" delay={0.1} />}
        />

        {/* S6 — feed Instagram + griglia post */}
        <Row2
          left={<GalleryImg src={IMG.feedInstagram} alt="Feed Instagram Maestri Cotonieri" animDir="left" />}
          right={<GalleryImg src={IMG.gridPost} alt="Griglia post social" animDir="right" delay={0.1} />}
        />

      </div>

      {/* S7 — Post Elegance full width */}
      <div style={{ padding: `0 ${GAP}` }}>
        <GalleryImg src={IMG.postElegance} alt="Post Elegance meets Comfort" animDir="up" />
      </div>

      {/* S8 — Stories due full width */}
      <div style={{ padding: GAP }}>
        <GalleryImg src={IMG.storiesDue} alt="Stories Softness e Where comfort begins" animDir="up" />
      </div>

    </section>
  )
}
