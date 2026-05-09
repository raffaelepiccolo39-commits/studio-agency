'use client'

import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'hover' | 'label'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const labeledEl = target.closest<HTMLElement>('[data-cursor]')
      if (labeledEl) {
        setLabel(labeledEl.dataset.cursor || '')
        setState('label')
        return
      }
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label')
      if (interactive) {
        setLabel('')
        setState('hover')
        return
      }
      setLabel('')
      setState('default')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', handleOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleOver)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const sizes = {
    default: { dot: 10, ring: 36 },
    hover: { dot: 16, ring: 56 },
    label: { dot: 0, ring: 92 },
  }
  const current = sizes[state]

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          width: `${current.dot}px`,
          height: `${current.dot}px`,
          background: state === 'label' ? 'transparent' : 'var(--accent)',
          opacity: current.dot === 0 ? 0 : 1,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: `${current.ring}px`,
          height: `${current.ring}px`,
          borderColor: state === 'default' ? 'rgba(255,209,8,0.4)' : 'rgba(255,209,8,0.9)',
          background: state === 'label' ? 'var(--accent)' : 'transparent',
          color: '#0a0a0a',
          fontFamily: 'var(--font-syne), sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {state === 'label' && label}
      </div>
    </>
  )
}
