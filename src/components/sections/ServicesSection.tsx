'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    id: 'a',
    name: 'BRANDING & GRAPHIC DESIGN',
    desc: 'Il tuo brand non deve solo "esserci", deve dominare. Non ci limitiamo a disegnare loghi; costruiamo armature visive per aziende che non vogliono passare inosservate. Dallo studio del posizionamento alla creazione di un’identità visiva coordinata, trasformiamo i valori della tua azienda in un impatto estetico che genera fiducia e autorità immediata. Se non sei memorabile, sei invisibile.',
    items: ['Brand Strategy', 'Visual Identity', 'UX / UI', 'Market Positioning', 'Brand Audit', 'Digital Storytelling'],
  },
  {
    id: 'b',
    name: 'WEB SITE & E-COMMERCE',
    desc: `Codice pulito, prestazioni estreme, vendite reali.  
Progettiamo ecosistemi digitali dove l’estetica premium incontra una tecnologia impeccabile. 
Che si tratti di un sito corporate o di un e-commerce complesso, puntiamo tutto su: velocità di caricamento, UX intuitiva e ottimizzazione SEO.
Non costruiamo semplici siti, ma asset digitali progettati per convertire.`,
    
    items: ['E-commerce Dev', 'Custom Builds', 'App Development', 'API Integration', 'Performance Opt.', 'Headless Commerce'],
  },
  {
    id: 'c',
    name: 'GESTIONE SOCIAL MEDIA',
    desc: 'Smettila di postare a caso. Inizia a influenzare. La gestione dei social media per noi non è "pubblicare una foto", ma presidiare l\'attenzione del tuo target. Analizziamo i dati, studiamo l\'algoritmo e creiamo strategie di distribuzione che trasformano i follower in una community fedele. Gestiamo la tua presenza sui canali social con l\'obiettivo di costruire una reputazione d\'acciaio e alimentare costantemente il tuo funnel di vendita.',
    items: ['Media Strategy', 'Meta & Google Ads', 'Email Automation', 'Audience Targeting', 'CRO Testing', 'AI Campaigns'],
  },
  {
    id: 'd',
    name: 'CREAZIONE DEI CONTENUTI',
    desc: 'Contenuti che catturano l\'attenzione e non la lasciano più.In un mondo saturo di rumore, vince chi ha qualcosa da dire e sa come dirlo. Produciamo contenuti originali – dal copywriting persuasivo alla produzione visual – studiati per risuonare con il tuo pubblico e scalare i risultati di Google. Creiamo storie che vendono, video che bloccano lo scrolling e testi che convincono anche il cliente più scettico.',
    items: ['Video Production', 'Photography', 'Copywriting', 'Social Content', 'Visual Storytelling', 'AI Automation'],
  },
]

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '60px 1fr auto',
        gap: '32px',
        alignItems: 'start',
        padding: '32px 32px 32px 0',
        paddingLeft: hovered ? '16px' : '0',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'padding 0.4s ease',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 0.1}s`,
        transitionProperty: 'opacity, transform, padding',
        transitionDuration: '0.6s, 0.6s, 0.4s',
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Bordo verde a sinistra */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: hovered ? '4px' : '0',
        background: 'var(--accent)',
        transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <span style={{
        fontSize: '11px', letterSpacing: '0.15em',
        color: 'var(--muted)', fontWeight: 500,
        paddingTop: '8px',
      }}>
        ({service.id}.)
      </span>

      <div>
        {/* Nome servizio */}
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(28px, 4vw, 52px)',
          letterSpacing: '0.02em',
          color: hovered ? 'var(--accent)' : 'var(--text)',
          transition: 'color 0.3s',
          display: 'block',
        }}>
          {service.name}
        </span>

        {/* Descrizione + tag — appare con animazione su hover */}
        <div style={{
          maxHeight: hovered ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'rgba(240,237,230,0.55)',
            marginTop: '14px',
            marginBottom: '16px',
          }}>
            {service.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {service.items.map(item => (
              <span key={item} style={{
                fontSize: '11px', color: 'var(--muted)',
                padding: '4px 10px',
                border: '1px solid var(--border)',
                letterSpacing: '0.05em',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Freccia */}
      <span style={{
        fontSize: '20px',
        color: hovered ? 'var(--accent)' : 'var(--muted)',
        transition: 'transform 0.4s ease, color 0.3s',
        transform: hovered ? 'rotate(-45deg)' : 'none',
        display: 'block',
        paddingTop: '8px',
      }}>
        ↗
      </span>
    </div>
  )
}

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" style={{
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 40px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div ref={ref} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        marginBottom: '80px',
        alignItems: 'end',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <h2 style={{ lineHeight: 0.9 }}>
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(56px, 8vw, 120px)', display: 'block' }}>COSA</span>
          <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--accent)', display: 'block' }}>facciamo</span>
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(56px, 8vw, 120px)', display: 'block' }}></span>  
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.5)', maxWidth: '400px', alignSelf: 'end' }}>
          Diamo forma a visioni audaci. Uniamo direzione creativa e performance marketing per portare il tuo brand dove non è mai stato prima.  </p>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {services.map((s, i) => (
          <ServiceRow key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  )
}
