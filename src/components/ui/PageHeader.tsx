'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface PageHeaderProps {
  tag?: string
  title: string
  titleAccent?: string
  titleAfter?: string
  subtitle?: string
  /** 'boldonse' = il font display della home (GROWTH FOCUSED AGENCY), tutte le righe uguali; default Bebas + DM Serif corsivo. */
  font?: 'bebas' | 'boldonse'
}

export default function PageHeader({ tag, title, titleAccent, titleAfter, subtitle, font = 'bebas' }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const boldonse = font === 'boldonse'
  // Boldonse è un carattere alto: ha bisogno di più interlinea e di un corpo più piccolo di Bebas.
  const lineStyle: React.CSSProperties = boldonse
    ? { fontFamily: 'var(--font-boldonse)', fontSize: 'clamp(26px, 5.4vw, 88px)', lineHeight: 1.15, letterSpacing: '-0.01em', display: 'block', textTransform: 'uppercase' }
    : { fontFamily: 'var(--font-bebas)', fontSize: 'clamp(34px, 8vw, 140px)', letterSpacing: '-0.01em', display: 'block' }
  const accentStyle: React.CSSProperties = boldonse
    ? { ...lineStyle, color: 'var(--accent)' }
    : { fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(34px, 8vw, 140px)', color: 'var(--accent)', display: 'block' }
  const linePad = boldonse ? '0.3em 0.12em 0.26em' : undefined

  useGSAP(() => {
    const lines = headerRef.current?.querySelectorAll<HTMLElement>('.ph-line')
    if (!lines) return

    lines.forEach((line) => {
      const text = line.dataset.text || line.textContent || ''
      line.textContent = ''
      line.setAttribute('aria-label', text)
      const chars = text.split('').map((ch) => {
        const span = document.createElement('span')
        span.className = 'ph-char'
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.display = 'inline-block'
        span.style.willChange = 'transform'
        line.appendChild(span)
        return span
      })
      gsap.set(chars, { yPercent: 110, rotate: 5 })
    })

    const allChars = headerRef.current?.querySelectorAll('.ph-char')
    if (allChars) {
      gsap.to(allChars, {
        yPercent: 0,
        rotate: 0,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.022,
        delay: 0.35,
      })
    }

    const tagEl = headerRef.current?.querySelector('.ph-tag')
    const subEl = headerRef.current?.querySelector('.ph-subtitle')
    if (tagEl) gsap.from(tagEl, { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'expo.out' })
    if (subEl) gsap.from(subEl, { y: 20, opacity: 0, duration: 0.9, delay: 0.7, ease: 'expo.out' })
  }, { scope: headerRef })

  return (
    <section
      ref={headerRef}
      style={{
        paddingTop: 'clamp(120px, 18vw, 180px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        paddingLeft: 'clamp(24px, 5vw, 40px)',
        paddingRight: 'clamp(24px, 5vw, 40px)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(100px, 18vw, 260px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
        zIndex: 0,
      }}>
        {title.toUpperCase()}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {tag && (
          <p className="ph-tag" style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            {tag}
          </p>
        )}

        <h1 style={{ lineHeight: boldonse ? 1 : 0.9, marginTop: boldonse ? '-0.3em' : undefined }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em', padding: linePad }}>
            <span className="ph-line" data-text={title} style={lineStyle}>
              {title}
            </span>
          </span>
          {titleAccent && (
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em', padding: linePad }}>
              <span className="ph-line" data-text={titleAccent} style={accentStyle}>
                {titleAccent}
              </span>
            </span>
          )}
          {titleAfter && (
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em', padding: linePad }}>
              <span className="ph-line" data-text={titleAfter} style={lineStyle}>
                {titleAfter}
              </span>
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="ph-subtitle" style={{
            fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.8,
            color: 'rgba(240,237,230,0.55)', maxWidth: '560px', marginTop: '32px',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
