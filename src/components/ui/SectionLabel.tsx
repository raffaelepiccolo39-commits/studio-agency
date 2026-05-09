'use client'

import { useInView } from 'react-intersection-observer'

type Props = {
  number: string
  text: string
  color?: 'light' | 'muted'
}

export default function SectionLabel({ number, text, color = 'muted' }: Props) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`section-label ${inView ? 'is-visible' : ''}`}
      style={{ color: color === 'light' ? '#ffffff' : '#b2b2b2' }}
    >
      <span className="section-label-num">({number})</span>
      <span>{text}</span>
      <span className="section-label-line" />
    </div>
  )
}
