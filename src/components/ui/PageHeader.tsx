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
}

export default function PageHeader({ tag, title, titleAccent, titleAfter, subtitle }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null)

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

        <h1 style={{ lineHeight: 0.9 }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
            <span
              className="ph-line"
              data-text={title}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(56px, 9vw, 140px)',
                letterSpacing: '-0.01em',
                display: 'block',
              }}
            >
              {title}
            </span>
          </span>
          {titleAccent && (
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <span
                className="ph-line"
                data-text={titleAccent}
                style={{
                  fontFamily: 'var(--font-dm-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(56px, 9vw, 140px)',
                  color: 'var(--accent)',
                  display: 'block',
                }}
              >
                {titleAccent}
              </span>
            </span>
          )}
          {titleAfter && (
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <span
                className="ph-line"
                data-text={titleAfter}
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(56px, 9vw, 140px)',
                  letterSpacing: '-0.01em',
                  display: 'block',
                }}
              >
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
