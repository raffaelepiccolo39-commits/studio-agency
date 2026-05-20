'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'pw-loader-shown'

export default function PageLoader() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY)
    if (reduced || alreadyShown) return

    setVisible(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
    const fadeTimer = setTimeout(() => setFadeOut(true), 900)
    const hideTimer = setTimeout(() => setVisible(false), 1500)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div style={{ animation: 'loaderLogoIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
        <Image src="/logo.png" alt="Pira Web" width={254} height={120} priority style={{ width: 'auto', height: '120px' }} />
      </div>

      <p style={{
        position: 'absolute', bottom: '24px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(14px, 2vw, 18px)',
        letterSpacing: '0.4em', textTransform: 'uppercase',
        color: 'rgba(240,237,230,0.4)', whiteSpace: 'nowrap',
        animation: 'loaderTextIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both',
      }}>
        Digital <span style={{ color: 'var(--accent)' }}>Experience</span>
      </p>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: '#111',
      }}>
        <div style={{
          height: '100%', background: 'var(--accent)',
          animation: 'loaderBar 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
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
