'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Script from 'next/script'

const faqs = [
  {
    domanda: 'Quanto costa un progetto con Pira Web?',
    risposta: "Ogni progetto e' diverso e il costo dipende dalla complessita', dagli obiettivi e dai servizi richiesti. Offriamo soluzioni su misura: contattaci per un preventivo gratuito e senza impegno.",
  },
  {
    domanda: 'Quanto tempo serve per realizzare un sito o un e-commerce?',
    risposta: "I tempi variano in base al progetto. Un sito vetrina richiede in media 3-4 settimane, un e-commerce strutturato 6-8 settimane. Definiamo sempre una timeline chiara prima di iniziare.",
  },
  {
    domanda: 'Lavorate solo con aziende di Caserta e Napoli?',
    risposta: "No, lavoriamo con clienti in tutta Italia e anche all'estero. Il nostro approccio e' completamente digitale, quindi la distanza non e' mai un problema.",
  },
  {
    domanda: 'Cosa include la gestione social media?',
    risposta: "Include piano editoriale mensile, creazione contenuti (grafiche, copy, stories), pubblicazione, community management e report mensile con i risultati ottenuti.",
  },
  {
    domanda: 'Offrite supporto dopo il lancio del progetto?',
    risposta: "Assolutamente si'. Ogni progetto include un periodo di assistenza post-lancio. Offriamo anche piani di manutenzione e ottimizzazione continuativa per chi vuole risultati a lungo termine.",
  },
  {
    domanda: 'Posso vedere altri progetti che avete realizzato?',
    risposta: "Certo, visita la nostra pagina Progetti per scoprire i casi studio completi con risultati, processo e gallery fotografiche.",
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.domanda,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.risposta,
    },
  })),
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      style={{
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Accent bar left */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: open || hovered ? '3px' : '0',
          background: 'var(--accent)',
          transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '24px 0 24px 0',
          paddingLeft: open || hovered ? '16px' : '0',
          transition: 'padding 0.4s ease',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: open || hovered ? 'var(--text)' : 'rgba(240,237,230,0.7)',
            transition: 'color 0.3s',
            fontFamily: 'inherit',
          }}
        >
          {faq.domanda}
        </span>
        <span
          style={{
            fontSize: '22px',
            fontWeight: 300,
            lineHeight: 1,
            color: open ? 'var(--accent)' : 'var(--muted)',
            transition: 'transform 0.4s ease, color 0.3s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'block',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'var(--muted)',
            padding: '0 0 24px 16px',
            maxWidth: '640px',
          }}
        >
          {faq.risposta}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section
        style={{
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 40px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          ref={ref}
          style={{
            marginBottom: '56px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            Domande frequenti
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(56px, 8vw, 100px)',
              lineHeight: 0.9,
            }}
          >
            FAQ
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.domanda} faq={faq} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
