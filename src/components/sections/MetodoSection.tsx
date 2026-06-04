'use client'

import { useInView } from 'react-intersection-observer'

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--accent)' }}>{children}</span>
)

type StepData = { letter: string; name: string; body: React.ReactNode }

const steps: StepData[] = [
  {
    letter: 'P',
    name: 'Posizionamento',
    body: (
      <>
        <p>
          Analizziamo il <Hl>mercato</Hl>, mappiamo lo <Hl>scenario competitivo</Hl>, definiamo{' '}
          <Hl>posizionamento</Hl> e <Hl>KPI</Hl> di business.
        </p>
        <p>
          Da qui costruiamo la <Hl>strategia di marketing</Hl>: non un documento da archiviare, ma il
          riferimento operativo da cui ogni fase successiva trae direzione e coerenza.
        </p>
      </>
    ),
  },
  {
    letter: 'I',
    name: 'Identità',
    body: (
      <>
        <p>
          Progettiamo l&rsquo;identità visiva, costruiamo il <Hl>tono di voce</Hl>, definiamo{' '}
          <Hl>piano editoriale</Hl> e <Hl>linee guida operative</Hl>.
        </p>
        <p>
          Così prende forma il <Hl>sistema brand</Hl>: non un esercizio estetico, ma il riferimento
          espressivo che dà a ogni post, campagna e email la stessa voce riconoscibile.
        </p>
      </>
    ),
  },
  {
    letter: 'R',
    name: 'Realizzazione',
    body: (
      <>
        <p>La realizzazione è la fase in cui la strategia diventa concreta.</p>
        <p>
          <Hl>Fotografiamo, giriamo, disegniamo, scriviamo, sviluppiamo</Hl>: ogni asset del progetto
          nasce sotto lo stesso tetto, con la stessa direzione e con la stessa cura del dettaglio.
        </p>
      </>
    ),
  },
  {
    letter: 'A',
    name: 'Amplificazione',
    body: (
      <>
        <p>L&rsquo;amplificazione è la fase in cui il brand incontra il mercato.</p>
        <p>
          <Hl>Pubblichiamo, investiamo, ottimizziamo.</Hl> Ogni canale (social, advertising, SEO, email)
          lavora dentro la stessa strategia. I dati non supportano le decisioni, bensì le guidano.
        </p>
        <p>Ciò che porta valore si scala, ciò che non rende viene tagliato.</p>
      </>
    ),
  },
]

export default function MetodoSection() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

  return (
    <section
      ref={ref}
      id="metodo"
      style={{
        background: '#0a0a0a',
        borderTop: '0.5px solid #525252',
        padding: 'clamp(56px, 8vw, 100px) clamp(24px, 5vw, 40px)',
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: '13px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#b2b2b2',
          margin: '0 0 clamp(24px, 3vw, 40px)',
        }}
      >
        Metodo
      </p>

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: 'clamp(26px, 3.6vw, 52px)',
          lineHeight: 1.12,
          letterSpacing: '-0.015em',
          color: '#ffffff',
          margin: '0 0 clamp(40px, 6vw, 80px)',
          maxWidth: '900px',
        }}
      >
        Il metodo <Hl>PIRA</Hl>, un processo creativo guidato dalla strategia
      </h2>

      {/* Steps timeline */}
      <div
        className="metodo-steps"
        style={
          {
            '--pad': 'clamp(28px, 4vw, 60px)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 5vw, 72px)',
            paddingLeft: 'var(--pad)',
            borderLeft: '1px solid rgba(255,255,255,0.16)',
            maxWidth: '860px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          } as React.CSSProperties
        }
      >
        {steps.map((s) => (
          <div key={s.letter} style={{ position: 'relative' }}>
            {/* node */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 'calc(-1 * var(--pad))',
                top: '0.35em',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: 'var(--accent)',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 0 4px #0a0a0a',
              }}
            />
            <h3
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(28px, 3.4vw, 46px)',
                lineHeight: 1,
                letterSpacing: '0.01em',
                color: '#ffffff',
                margin: '0 0 clamp(14px, 1.6vw, 22px)',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>{s.letter}</span> — {s.name.toUpperCase()}
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxWidth: '640px',
                fontFamily: 'var(--font-syne)',
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.05vw, 16px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
