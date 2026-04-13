'use client'
import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({
  children, delay = 0, direction = 'up'
}: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const transforms = {
    up: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
  }
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}
