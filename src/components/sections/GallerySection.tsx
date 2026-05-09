'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const images = [
  '/progetti/pasticceria-bluemoon/mockup-prodotto.jpg',
  '/progetti/pasticceria-bluemoon/griglia-prodotti.jpg',
  '/progetti/pasticceria-bluemoon/panettone.jpg',
]

export default function GallerySection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{
        borderTop: '0.5px solid #525252',
        borderBottom: '0.5px solid #525252',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          height: '838px',
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'relative',
              height: '100%',
              overflow: 'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 0' }}>
        <Link
          href="/progetti"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#ffffff',
            textDecoration: 'underline',
          }}
        >
          ESPLORA TUTTI I NOSTRI PROGETTI
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
