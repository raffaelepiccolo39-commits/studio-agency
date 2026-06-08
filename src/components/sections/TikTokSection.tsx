'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const videos = [
  { user: 'maestri_cotonieri_home', id: '7616016157396569366' },
  { user: 'svinati', id: '7611180256845663510' },
  { user: 'contexbiancheria', id: '7624172835149319446' },
  { user: 'pasticceriabluemoon', id: '7633342939099319574' },
  { user: 'alma.studio.comme', id: '7619006303549033751' },
]

export default function TikTokSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [loaded, setLoaded] = useState<Set<string>>(new Set())
  const load = (id: string) => setLoaded((prev) => new Set(prev).add(id))

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
        I NOSTRI{' '}
        <span style={{ background: 'var(--accent)', color: '#0a0a0a', padding: '0 0.14em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
          CONTENUTI
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
        Generano milioni di visualizzazioni e community reali.
      </p>

      <div className="tiktok-grid">
        {videos.map((v) => (
          <div className="tiktok-card" key={v.id}>
            <div className="tiktok-frame">
              {loaded.has(v.id) ? (
                <iframe
                  src={`https://www.tiktok.com/player/v1/${v.id}?music_info=0&description=0&rel=0&autoplay=1`}
                  title={`Video TikTok @${v.user}`}
                  allow="encrypted-media; fullscreen; picture-in-picture; autoplay"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="tiktok-facade"
                  onClick={() => load(v.id)}
                  aria-label={`Carica e guarda il video TikTok di @${v.user}`}
                >
                  <span className="tiktok-facade-play" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="tiktok-facade-user">@{v.user}</span>
                  <span className="tiktok-facade-hint">Guarda il video</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="tiktok-hint" aria-hidden>
        <span className="tiktok-hint-line" />
        Scorri per vedere tutti i video
        <span className="tiktok-hint-arrow">→</span>
      </p>
    </section>
  )
}
