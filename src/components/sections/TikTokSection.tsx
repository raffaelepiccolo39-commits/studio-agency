'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const videos = [
  { user: 'maestri_cotonieri_home', id: '7616016157396569366' },
  { user: 'svinati', id: '7611180256845663510' },
  { user: 'contexbiancheria', id: '7624172835149319446' },
  { user: 'ladeliziapasticcerie', id: '7549236385270615318' },
]

export default function TikTokSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const w = window as unknown as { tiktokEmbed?: { lib?: { render?: () => void } } }
    if (w.tiktokEmbed?.lib?.render) {
      w.tiktokEmbed.lib.render()
      return
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.tiktok.com/embed.js"]')
    if (existing) return
    const s = document.createElement('script')
    s.src = 'https://www.tiktok.com/embed.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#6a6a6a',
          margin: '0 0 clamp(18px, 2vw, 26px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
        Risultati organici
      </p>

      <h2
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(40px, 6.5vw, 104px)',
          lineHeight: 0.95,
          letterSpacing: '0.005em',
          color: '#0a0a0a',
          margin: '0 0 clamp(16px, 2vw, 24px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s',
        }}
      >
        VIDEO CHE{' '}
        <span style={{ background: 'var(--accent)', color: '#0a0a0a', padding: '0 0.14em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
          SPACCANO
        </span>
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 400,
          fontSize: 'clamp(15px, 1.3vw, 19px)',
          lineHeight: 1.5,
          color: '#6a6a6a',
          maxWidth: '620px',
          margin: '0 0 clamp(40px, 5vw, 64px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.16s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.16s',
        }}
      >
        I nostri contenuti organici generano milioni di visualizzazioni e community reali.
      </p>

      <div className="tiktok-grid">
        {videos.map((v) => (
          <div className="tiktok-card" key={v.id}>
            <blockquote
              className="tiktok-embed"
              cite={`https://www.tiktok.com/@${v.user}/video/${v.id}`}
              data-video-id={v.id}
              style={{ maxWidth: '100%', minWidth: 0, margin: 0, width: '100%' }}
            >
              <section> </section>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}
