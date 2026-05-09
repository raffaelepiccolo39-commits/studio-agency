'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  images: string[]
  selector?: string
  size?: number
  trailLength?: number
  threshold?: number
  className?: string
}

type TrailImg = {
  el: HTMLDivElement
  rotation: number
}

export default function ImageTrail({
  images,
  selector = '[data-trail]',
  size = 220,
  trailLength = 8,
  threshold = 70,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (images.length === 0) return

    const items: TrailImg[] = []
    for (let i = 0; i < trailLength; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${size}px;
        height: ${size * 1.2}px;
        background-image: url("${images[i % images.length]}");
        background-size: cover;
        background-position: center;
        pointer-events: none;
        z-index: 5;
        opacity: 0;
        transform: translate(-50%, -50%);
        will-change: transform, opacity;
      `
      container.appendChild(el)
      items.push({
        el,
        rotation: gsap.utils.random(-12, 12),
      })
    }

    let mouseX = 0
    let mouseY = 0
    let lastX = 0
    let lastY = 0
    let cursor = 0
    let active = false
    let imgIndex = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement | null
      const isOnTrigger = target?.closest(selector)
      active = !!isOnTrigger
    }

    const onMouseLeave = () => {
      active = false
    }

    const tick = () => {
      const dx = mouseX - lastX
      const dy = mouseY - lastY
      const dist = Math.hypot(dx, dy)

      if (active && dist > threshold) {
        const item = items[cursor % trailLength]
        if (item) {
          imgIndex = (imgIndex + 1) % images.length
          item.el.style.backgroundImage = `url("${images[imgIndex]}")`
          item.rotation = gsap.utils.random(-12, 12)

          gsap.killTweensOf(item.el)
          gsap.fromTo(
            item.el,
            {
              x: mouseX,
              y: mouseY,
              scale: 0.6,
              rotate: item.rotation,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'expo.out',
              onComplete: () => {
                gsap.to(item.el, {
                  opacity: 0,
                  scale: 0.85,
                  duration: 0.6,
                  delay: 0.3,
                  ease: 'expo.in',
                })
              },
            }
          )

          cursor++
          lastX = mouseX
          lastY = mouseY
        }
      }

      requestAnimationFrame(tick)
    }

    const rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      items.forEach((item) => item.el.remove())
    }
  }, [images, selector, size, trailLength, threshold])

  return <div ref={containerRef} aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }} />
}
