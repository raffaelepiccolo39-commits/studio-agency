'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800)
    const hideTimer = setTimeout(() => setVisible(false), 2400)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>

      {/* Logo centrato */}
      <div style={{
        animation: 'loaderLogoIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both',
      }}>
        <img src="/logo.png" alt="Pira Web" style={{ height: '120px', width: 'auto' }} />
      </div>

      {/* Testo in basso sopra la barra */}
      <p style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(14px, 2vw, 18px)',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'rgba(240,237,230,0.4)',
        whiteSpace: 'nowrap',
        animation: 'loaderTextIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both',
      }}>
        Digital <span style={{ color: 'var(--accent)' }}>Experience</span>
      </p>

      {/* Barra di progresso */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: '#111',
      }}>
        <div style={{
          height: '100%', background: 'var(--accent)',
          animation: 'loaderBar 1.8s cubic-bezier(0.16,1,0.3,1) forwards',
        }} />
      </div>

      <style>{`
        @keyframes loaderLogoIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderTextIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes loaderBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}