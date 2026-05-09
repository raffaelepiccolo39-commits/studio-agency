'use client'

import { useInView } from 'react-intersection-observer'
import SectionLabel from '@/components/ui/SectionLabel'

const sponsors = [
  { src: '/partners/shopify.png', alt: 'Shopify Partners', height: 74 },
  { src: '/partners/google.png', alt: 'Google Partner', height: 66 },
  { src: '/partners/tiktok.png', alt: 'TikTok Marketing Partner', height: 59 },
  { src: '/partners/trustpilot.png', alt: 'Trustpilot', height: 39 },
  { src: '/partners/meta.png', alt: 'Meta Business Partner', height: 36 },
  { src: '/partners/spoki.png', alt: 'Spoki', height: 55 },
  { src: '/partners/klavyo.png', alt: 'Klaviyo', height: 26 },
]

export default function SponsorsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: 'clamp(40px, 5vw, 60px) 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <div style={{ padding: '0 clamp(24px, 3vw, 40px)' }}>
        <SectionLabel number="03" text="I NOSTRI SPONSOR" />
      </div>

      <div
        className="sponsor-row-wrap"
        style={{
          padding: '0 clamp(16px, 2.5vw, 40px)',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          className="sponsor-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(12px, 2vw, 32px)',
            flexWrap: 'nowrap',
            maxWidth: '1280px',
            width: '100%',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {sponsors.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="sponsor-logo"
              style={{
                height: `clamp(14px, ${(s.height / 18).toFixed(2)}vw, ${s.height}px)`,
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 1,
                minWidth: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
