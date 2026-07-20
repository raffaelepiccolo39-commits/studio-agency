'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import Cursor from '@/components/ui/Cursor'
import Footer from '@/components/layout/Footer'
import type { Project } from '@/data/projects'
import LandingForm from './LandingForm'

// Sezioni pesanti below-the-fold (con GSAP): caricate dopo il primo render
// per alleggerire il bundle iniziale e velocizzare LCP/FCP.
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false })
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), { ssr: false })
const MetodoSection = dynamic(() => import('@/components/sections/MetodoSection'), { ssr: false })

/* ──────────────────────────────────────────────────────────
   Landing ADV — Medie Imprese (nascosta, traffico a pagamento)
   Stile nativo del sito piraweb.it: dark #0a0a0a, font Boldonse/
   Syne/Bebas, accento giallo #FFD108, card glassy a spigolo vivo,
   cursore custom + Footer reali del sito.
   // TODO = placeholder da sostituire con materiali reali.
   ────────────────────────────────────────────────────────── */

// Numero WhatsApp aziendale (internazionale, senza +)
const WHATSAPP_NUMBER = '393318535698'

const differenziatori = [
  { n: '01', t: 'Un solo partner', d: 'Strategia, brand, sviluppo e advertising sotto un’unica regia. Un solo interlocutore responsabile dei risultati.' },
  { n: '02', t: 'Più valore percepito', d: 'Costruiamo un’identità che alza il valore percepito del tuo brand e ti toglie dalla guerra del prezzo.' },
  { n: '03', t: 'Visione da imprenditori', d: 'Pianifichiamo il marketing come un investimento aziendale, con orizzonte trimestrale e annuale.' },
  { n: '04', t: 'Sistemi che generano', d: 'Mettiamo a terra sistemi di acquisizione che producono opportunità misurabili, non solo “visibilità”.' },
]

const painPoints = [
  'Investi in marketing ma non capisci davvero cosa stia rendendo.',
  'Gestisci troppi fornitori diversi che non parlano tra loro.',
  'Ti trovi a trattare sempre sul prezzo invece che sul valore.',
  'I competitor sembrano sempre un passo avanti a te.',
  'Tanta attività, poca crescita realmente visibile.',
  'Nessuno ti dà numeri chiari su ritorno e prossimi passi.',
]

const faq = [
  { q: 'Quanto costa lavorare con voi?', a: 'Dipende dai tuoi obiettivi e dalle attività necessarie: non vendiamo pacchetti preconfezionati. Nell’incontro conoscitivo capiamo cosa ti serve davvero e ti prepariamo una proposta chiara, con costi e priorità definiti, senza sorprese.' },
  { q: 'In quanto tempo è pronto un sito o un e-commerce?', a: 'In media un sito vetrina richiede 3–5 settimane, un e-commerce 6–10, a seconda di contenuti e funzionalità. Dopo il briefing ti diamo una tempistica precisa e ti aggiorniamo a ogni passaggio.' },
  { q: 'Cosa vi serve da noi per iniziare?', a: 'Poco: una chiacchierata sui tuoi obiettivi e, dove già esistono, i materiali che hai (logo, foto, testi, accessi). Al resto — strategia, contenuti e sviluppo — pensiamo noi.' },
  { q: 'Gestite voi i social e le campagne o dobbiamo farlo noi?', a: 'Ce ne occupiamo noi dall’inizio alla fine: strategia, contenuti, pubblicazione e advertising. Tu resti coinvolto nelle decisioni e ricevi report chiari, senza doverti occupare dell’operatività quotidiana.' },
  { q: 'Come misurate i risultati?', a: 'Definiamo insieme i KPI all’inizio (contatti, vendite, ritorno sulla spesa pubblicitaria, traffico) e li monitoriamo nel tempo. Ricevi report ricorrenti con numeri chiari e i prossimi passi, non chiacchiere.' },
  { q: 'Lavorate su tutto il territorio nazionale?', a: 'Sì. Con il nostro team copriamo l’intero territorio nazionale e seguiamo aziende in tutta Italia. La nostra sede è in Campania, a Casapesenna, e per chi è in zona ci incontriamo volentieri anche di persona.' },
  { q: 'La consulenza è davvero gratuita? A cosa mi impegna?', a: 'È gratuita e senza impegno. È un confronto per capire la tua situazione e se possiamo esserti utili: se c’è margine ti proponiamo come procedere, altrimenti nessun problema.' },
]

// ── helpers di stile (token del sito) ──
const SYNE = 'var(--font-syne), sans-serif'
const BEBAS = 'var(--font-bebas), sans-serif'
const BOLDONSE = 'var(--font-boldonse), sans-serif'

const WRAP: React.CSSProperties = { maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,4vw,40px)' }
const SECTION = (border = true): React.CSSProperties => ({
  background: '#0a0a0a',
  padding: 'clamp(64px,9vw,120px) 0',
  borderTop: border ? '0.5px solid rgba(255,255,255,0.1)' : 'none',
})
const EYEBROW: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  fontFamily: SYNE, fontWeight: 500, fontSize: 13, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#e5e5e5', marginBottom: 28,
}
const H2: React.CSSProperties = {
  fontFamily: SYNE, fontWeight: 600, fontSize: 'clamp(28px,3.6vw,54px)',
  lineHeight: 1.12, letterSpacing: '-0.015em', color: '#fff',
}
const SUB: React.CSSProperties = { fontFamily: SYNE, fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.6, color: 'rgba(240,237,230,0.6)', maxWidth: 640 }
const CARD: React.CSSProperties = {
  border: '0.5px solid rgba(255,255,255,0.12)',
  background: 'rgba(15,15,15,0.62)',
  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span style={EYEBROW}><span style={{ width: 7, height: 7, background: 'var(--accent)', display: 'inline-block' }} />{children}</span>
}

export default function LandingClient({ projects }: { projects: Project[] }) {
  return (
    <>
      <Cursor />
      <main style={{ background: '#0a0a0a', color: 'var(--text)', minHeight: '100vh', fontFamily: SYNE }}>
        <style>{`
          .lp-card { transition: border-color .4s, background .4s, transform .4s; }
          .lp-card:hover { border-color: rgba(255,255,255,0.3) !important; background: rgba(20,20,20,0.85) !important; transform: translateY(-3px); }
          .lp-topcta { display: inline-flex; }
          @media (max-width:600px){ .lp-topcta { display:none !important; } }
          .lp-sticky { display:none; }
          @media (max-width:600px){ .lp-sticky { display:flex !important; } }
          /* Su mobile il WhatsApp sale sopra la barra CTA sticky */
          @media (max-width:600px){ .lp-wa { bottom: 84px !important; right: 16px !important; } }
          .lp-marquee { animation: lp-scroll 34s linear infinite; }
          @keyframes lp-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .lp-root details > summary::-webkit-details-marker { display:none; }
          .lp-root details[open] .lp-faqicon { transform: rotate(45deg); }

          /* Hero a due colonne → stack su mobile */
          @media (max-width: 900px){
            .lp-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }

          /* Metodo PIRA: compatto SOLO nella landing (la home resta invariata) */
          .lp-root #metodo.metodo-h { border-top: none; }
          @media (min-width: 821px){
            .lp-root #metodo.metodo-h { height: 74vh; }
          }
          @media (max-width: 820px){
            .lp-root #metodo .metodo-panel { min-height: 46vh; padding-top: 24px; padding-bottom: 24px; }
          }
        `}</style>

        <div className="lp-root">
          {/* ── Header slim (stile navbar) ── */}
          <header style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ ...WRAP, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
              <Image src="/logo.png" alt="Pira Web" width={82} height={41} priority style={{ height: 38, width: 'auto' }} />
              <a href="#form" className="lp-topcta" style={{ alignItems: 'center', background: 'var(--accent)', color: '#0a0a0a', padding: '11px 30px', fontFamily: SYNE, fontSize: 14, fontWeight: 600, textDecoration: 'none', cursor: 'none' }}>
                RICHIEDI CONSULENZA
              </a>
            </div>
          </header>

          {/* ── Hero a due colonne: slogan a sinistra, form a destra ── */}
          <section style={{ position: 'relative', background: '#0a0a0a', overflow: 'hidden', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
            {/* glow accento */}
            <div aria-hidden style={{ position: 'absolute', top: '-25%', left: '-5%', width: 720, height: 720, background: 'radial-gradient(circle, rgba(255,209,8,0.09) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div className="lp-hero-grid" style={{ ...WRAP, position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(32px,4vw,64px)', alignItems: 'start', paddingTop: 'clamp(52px,7vw,96px)', paddingBottom: 'clamp(52px,7vw,96px)' }}>
              {/* Sinistra: slogan */}
              <div>
                <span style={{ ...EYEBROW, marginBottom: 22 }}><span style={{ width: 7, height: 7, background: 'var(--accent)', display: 'inline-block' }} />Consulenza gratuita</span>
                <h1 style={{ fontFamily: BOLDONSE, fontSize: 'clamp(23px,3.6vw,50px)', lineHeight: 1.4, letterSpacing: '-0.02em', color: '#fff', margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Un solo partner<br />per far <span style={{ color: 'var(--accent)' }}>crescere</span><br />la tua azienda
                </h1>
                <p style={{ ...SUB, fontSize: 'clamp(16px,1.7vw,19px)', margin: '26px 0 0', color: 'rgba(255,255,255,0.85)' }}>
                  Prima analizziamo i dati. Poi costruiamo la strategia. Brand, web e advertising della tua media impresa sotto un’unica regia.
                </p>

                {/* Badge Trustpilot statico cliccabile → punta esattamente all'URL fornito */}
                <a
                  href="https://it.trustpilot.com/review/piraweb.it?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', padding: '10px 16px', borderRadius: 8, textDecoration: 'none', cursor: 'none' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden style={{ flexShrink: 0 }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" />
                  </svg>
                  <span style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 15, color: '#191919', letterSpacing: '-0.01em' }}>Trustpilot</span>
                  <span style={{ display: 'inline-flex', gap: 2 }} aria-label="Valutazione 5 su 5">
                    {[0, 1, 2, 3, 4].map(i => (
                      <span key={i} style={{ background: '#00b67a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fff" />
                        </svg>
                      </span>
                    ))}
                  </span>
                </a>
              </div>

              {/* Destra: form */}
              <div id="form" style={{ scrollMarginTop: 88 }}>
                <div style={{ border: '0.5px solid rgba(255,255,255,0.14)', background: 'rgba(15,15,15,0.7)', backdropFilter: 'blur(6px)', padding: 'clamp(22px,2.6vw,36px)' }}>
                  <h2 style={{ fontFamily: SYNE, fontWeight: 600, fontSize: 'clamp(22px,2.2vw,28px)', lineHeight: 1.15, color: '#fff', marginBottom: 8 }}>Parlaci della tua azienda</h2>
                  <p style={{ fontFamily: SYNE, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(240,237,230,0.6)', marginBottom: 26 }}>
                    Compila il form: ti ricontattiamo entro 24 ore.
                  </p>
                  <LandingForm />
                </div>
              </div>
            </div>
          </section>

          {/* ── Ti riconosci? ── */}
          <section style={SECTION(false)}>
            <div style={WRAP}>
              <Eyebrow>Ti riconosci?</Eyebrow>
              <h2 style={{ ...H2, marginBottom: 16, maxWidth: 760 }}>I problemi che frenano la crescita della tua azienda</h2>
              <p style={{ ...SUB, marginBottom: 50 }}>Se ti rivedi anche solo in un paio di questi punti, probabilmente ti serve un partner diverso.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
                {painPoints.map((p, i) => (
                  <div key={i} className="lp-card" style={{ ...CARD, padding: 28, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent-red)', fontSize: 20, lineHeight: 1.2, flexShrink: 0 }}>✕</span>
                    <p style={{ fontFamily: SYNE, fontSize: 16, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Perché Pira (verticale) ── */}
          <section style={SECTION()}>
            <div style={WRAP}>
              <Eyebrow>Perché Pira</Eyebrow>
              <h2 style={{ ...H2, marginBottom: 56, maxWidth: 820 }}>Un partner unico per crescere davvero</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                {differenziatori.map(d => (
                  <div key={d.n} className="lp-card" style={{ ...CARD, padding: 32 }}>
                    <div style={{ fontFamily: BEBAS, fontSize: 44, color: 'var(--accent)', lineHeight: 1 }}>{d.n}</div>
                    <h3 style={{ fontFamily: SYNE, fontSize: 20, fontWeight: 600, margin: '16px 0 10px', color: '#fff' }}>{d.t}</h3>
                    <p style={{ fontFamily: SYNE, fontSize: 15, lineHeight: 1.6, color: 'rgba(240,237,230,0.6)' }}>{d.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Servizi (sezione reale del sito) ── */}
          <ServicesSection />

          {/* ── Metodo PIRA (sezione reale del sito) ── */}
          <MetodoSection />

          {/* ── Progetti (sezione reale del sito, immagini incluse) ── */}
          <ProjectsSection projects={projects} />

          {/* ── FAQ ── */}
          <section style={SECTION()}>
            <div style={{ ...WRAP, maxWidth: 860 }}>
              <Eyebrow>Domande frequenti</Eyebrow>
              <h2 style={{ ...H2, marginBottom: 40 }}>Le risposte alle domande più comuni</h2>
              <div>
                {faq.map((f, i) => (
                  <details key={i} style={{ borderBottom: '0.5px solid rgba(255,255,255,0.14)', padding: '24px 0' }}>
                    <summary style={{ fontFamily: SYNE, fontSize: 18, fontWeight: 600, color: '#fff', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', cursor: 'none' }}>
                      {f.q}
                      <span className="lp-faqicon" style={{ color: 'var(--accent)', fontSize: 26, flexShrink: 0, transition: 'transform .3s', lineHeight: 1 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 16, fontFamily: SYNE, fontSize: 15.5, lineHeight: 1.65, color: 'rgba(240,237,230,0.62)' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pulsante WhatsApp fisso ── */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-wa"
            aria-label="Contattaci su WhatsApp"
            style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 160, width: 58, height: 58, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.35)', cursor: 'none' }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" aria-hidden>
              <path d="M16.04 3C9.42 3 4.05 8.37 4.05 14.99c0 2.11.55 4.17 1.6 5.99L4 29l8.2-1.6c1.76.96 3.74 1.47 5.84 1.47h.01c6.62 0 11.99-5.37 11.99-11.99C30.04 8.37 24.67 3 18.05 3h-2.01Zm.01 2.4h1.99c5.29 0 9.59 4.3 9.59 9.59 0 5.29-4.3 9.59-9.59 9.59h-.01c-1.87 0-3.7-.5-5.3-1.45l-.38-.22-3.94.77.78-3.84-.25-.4a9.53 9.53 0 0 1-1.46-5.06c0-5.29 4.3-9.58 9.57-9.58Zm-3.49 4.4c-.26 0-.68.1-1.04.49-.36.39-1.37 1.34-1.37 3.27 0 1.93 1.4 3.79 1.6 4.05.2.26 2.76 4.22 6.79 5.76 3.35 1.28 4.03 1.03 4.76.96.73-.07 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.75-.46-.39-.2-2.35-1.16-2.71-1.29-.36-.13-.63-.2-.89.2-.26.39-1.02 1.29-1.25 1.55-.23.26-.46.3-.85.1-.39-.2-1.65-.61-3.14-1.94-1.16-1.04-1.95-2.32-2.18-2.71-.23-.39-.02-.6.17-.8.18-.18.39-.46.59-.69.2-.23.26-.39.39-.65.13-.26.07-.49-.03-.69-.1-.2-.88-2.13-1.23-2.91-.32-.74-.65-.64-.89-.65-.23-.01-.49-.01-.75-.01Z"/>
            </svg>
          </a>

          {/* ── Sticky CTA mobile ── */}
          <a href="#form" className="lp-sticky" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150, background: 'var(--accent)', color: '#0a0a0a', justifyContent: 'center', alignItems: 'center', display: 'none', padding: '16px', fontFamily: SYNE, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'none' }}>
            Richiedi consulenza gratuita
          </a>
        </div>
      </main>

      {/* Footer reale del sito (CTA verso il form della landing) */}
      <Footer ctaTitle={<>Prenota la tua<br />consulenza gratuita.</>} ctaHref="#form" />
    </>
  )
}

