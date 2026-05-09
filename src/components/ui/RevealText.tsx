'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  children: string
  splitBy?: 'char' | 'word'
  duration?: number
  stagger?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
  threshold?: number
}

export default function RevealText({
  children,
  splitBy = 'word',
  duration = 0.9,
  stagger = 0.04,
  delay = 0,
  className,
  style,
  threshold = 0.3,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const text = children
  const tokens = splitBy === 'char' ? Array.from(text) : text.split(/(\s+)/)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = el.querySelectorAll<HTMLElement>('.reveal-item')
    if (!items.length) return

    gsap.set(items, { yPercent: 110, opacity: 0 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(items, {
              yPercent: 0,
              opacity: 1,
              duration,
              stagger,
              delay,
              ease: 'power4.out',
            })
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, duration, stagger, threshold])

  return (
    <span ref={ref} className={className} style={style}>
      {tokens.map((tk, i) => {
        if (/^\s+$/.test(tk)) return <span key={i}>{tk}</span>
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
            }}
          >
            <span
              className="reveal-item"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
            >
              {tk}
            </span>
          </span>
        )
      })}
    </span>
  )
}
