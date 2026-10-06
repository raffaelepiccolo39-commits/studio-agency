'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cursor from '@/components/ui/Cursor'
import Footer from '@/components/layout/Footer'
import type { Project } from '@/data/projects'
import { coverFor } from '@/data/homeCovers'
import AnteprimaForm from './AnteprimaForm'
import { ORE_CONSEGNA, SETTIMANE_VALIDITA_LINK } from './offerta'
import { useSiteSettings } from '@/components/SiteSettingsProvider'

/* ──────────────────────────────────────────────────────────
   Anteprima gratuita — "Prima il sito, poi il preventivo"
   Pagina a obiettivo unico: far compilare il percorso a passi.
   Impianto: hero a due colonne con il modulo già nel primo
   schermo, contenitore stretto (1120px), fasce alternate
   bianco/crema, un solo gradiente giallo dietro l'hero,
   Boldonse SOLO nel titolo, un solo colore per l'azione.
   Identità Pira (Boldonse/Syne/Bebas/giallo) su fondo chiaro.
   ────────────────────────────────────────────────────────── */

const garanzie = [
  'Nessun costo, nessuna firma, nessuna telefonata obbligatoria',
  'Testi, colori e versione per telefono già inclusi',
  'Prezzo chiuso e tempi di consegna insieme al link',
]

const cosaRicevi = [
  { t: 'Una pagina vera, non un disegno', d: 'Si apre nel browser, scorre, risponde al tocco. Non è un’immagine né una bozza grafica: è la prima pagina del tuo sito, costruita davvero.' },
  { t: 'Con la tua identità', d: 'Logo, colori e tono della tua attività. Se un logo non ce l’hai ancora, ne prepariamo una versione di partenza da cui ragionare insieme.' },
  { t: 'Testi scritti da noi', d: 'Partiamo dalle tue risposte e dai tuoi profili social per scrivere testi di prova sensati. Niente righe segnaposto da riempire dopo.' },
  { t: 'Nata per il telefono', d: 'La maggior parte dei tuoi clienti arriverà da smartphone. L’anteprima è pensata prima per lo schermo piccolo, poi per quello grande.' },
]

const passaggi = [
  { quando: 'Adesso · tre minuti', t: 'Ci racconti la tua attività', d: 'Rispondi a una domanda alla volta: chi sei, cosa fai, cosa deve fare il sito, che stile ti piace. Se hai un sito vecchio o un profilo social, ci metti il link.' },
  { quando: `Entro ${ORE_CONSEGNA} ore`, t: 'Ricevi il link privato', d: 'Ti arriva su WhatsApp o via email. Lo apri quando vuoi, lo giri a chi vuoi, lo guardi dal telefono e dal computer. Insieme trovi il prezzo chiuso e i tempi di consegna.' },
  { quando: 'Quando decidi tu', t: 'Si va avanti, o finisce lì', d: 'Se ti convince, partiamo dal lavoro già fatto e completiamo il sito. Se non fa per te, chiudi il link e non succede nient’altro: nessun sollecito, nessun costo.' },
]

const costruiamo = [
  'Siti vetrina', 'E-commerce Shopify', 'Landing per campagne', 'Prenotazioni online', 'Menù digitali e QR',
  'Gestionali su misura', 'Portali clienti', 'Branding e logo', 'Social media', 'Foto e video', 'Testi e SEO', 'Advertising',
]

const perNoi = [
  { t: 'Meno riunioni, decisioni più veloci', d: 'Chi guarda la pagina già fatta sa esattamente cosa sta comprando. Si risparmiano settimane di preventivi, confronti e incontri che non portano da nessuna parte.' },
  { t: 'Clienti che ci scelgono con cognizione', d: 'Lavoriamo meglio con chi ci ha visti all’opera prima di firmare. I progetti nati così durano di più e finiscono quasi sempre in una collaborazione che continua.' },
  { t: 'Un investimento fatto con criterio', d: 'Un’anteprima ci costa una giornata di lavoro di una persona del team. Per questo il percorso fa qualche domanda in più: la prepariamo solo per attività che possiamo aiutare davvero.' },
]

const perTe = [
  'Hai un’attività locale o una piccola impresa e il sito è vecchio, lento, oppure non c’è.',
  'Vuoi vedere qualcosa di concreto prima di decidere quanto investire.',
  'Ti serve un sito che faccia arrivare richieste e prenotazioni, non solo “esserci”.',
  'Preferisci giudicare un lavoro fatto piuttosto che leggere una proposta di dieci pagine.',
]

const nonPerTe = [
  'Cerchi solo il prezzo più basso sul mercato: lavoriamo bene, non al ribasso.',
  'Ti serve un negozio online con centinaia di prodotti: quello si progetta insieme da zero, non si anticipa in un’anteprima.',
  'Vuoi soltanto un preventivo da mettere in fila con altri tre.',
]

const faq = [
  { q: 'L’anteprima è davvero gratuita?', a: 'Sì, completamente. Non chiediamo carta di credito, caparre né firme. È il nostro modo di presentarci: invece di raccontarti come lavoriamo, te lo facciamo vedere.' },
  { q: 'Quanto costerà poi il sito completo?', a: 'Dipende da quante pagine servono e da cosa deve fare. Insieme al link dell’anteprima ricevi un prezzo chiuso e una data di consegna: niente stime a spanne e niente voci che spuntano dopo.' },
  { q: 'E se non mi piace?', a: `Ce lo dici, oppure non ci dici niente: il link resta attivo per ${SETTIMANE_VALIDITA_LINK} settimane e poi scade da solo. Se invece ti piace in parte e in parte no, è il caso più comune: l’anteprima serve proprio a ragionare su qualcosa di concreto.` },
  { q: 'Quante anteprime fate?', a: 'Un numero limitato ogni settimana, perché ognuna è costruita a mano dal nostro team e non esce da un modello preconfezionato. Se la settimana è piena, ti diciamo subito quando arriva la tua.' },
  { q: 'Devo avere già foto, testi o logo?', a: 'No. Bastano le risposte del percorso e, se li hai, i tuoi profili social. Per il sito definitivo ci occupiamo noi di testi, fotografie e grafica.' },
  { q: 'Il sito poi è mio?', a: 'Sì. Dominio, contenuti e accessi sono intestati a te. Dopo la consegna puoi affidarci aggiornamenti e manutenzione, oppure fare da solo: nessun vincolo.' },
  { q: 'Dove siete?', a: 'A Casapesenna, in provincia di Caserta. Seguiamo attività in tutta Italia e, per chi è in zona, ci incontriamo volentieri di persona.' },
]

// ── token ──
const SYNE = 'var(--font-syne), sans-serif'
const BEBAS = 'var(--font-bebas), sans-serif'
const BOLDONSE = 'var(--font-boldonse), sans-serif'

const WRAP: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px,4vw,32px)' }
const SECTION = (alt = false): React.CSSProperties => ({
  background: alt ? 'var(--surface)' : 'var(--bg)',
  padding: 'clamp(56px,7vw,104px) 0',
})
const EYEBROW: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  fontFamily: SYNE, fontWeight: 600, fontSize: 12, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--text)', marginBottom: 18,
}
const H2: React.CSSProperties = {
  fontFamily: SYNE, fontWeight: 500,
  fontSize: 'clamp(28px,3.4vw,46px)', lineHeight: 1.05, letterSpacing: '-0.015em',
  color: 'var(--text)', margin: 0,
}
const H3: React.CSSProperties = { fontFamily: SYNE, fontWeight: 600, fontSize: 'clamp(17px,1.4vw,19px)', lineHeight: 1.25, color: 'var(--text)', margin: 0 }
const P: React.CSSProperties = { fontFamily: SYNE, fontWeight: 400, fontSize: 'clamp(15px,1.15vw,17px)', lineHeight: 1.6, color: 'var(--ink-70)', margin: 0 }
const LEAD: React.CSSProperties = { ...P, fontSize: 'clamp(16px,1.3vw,19px)', color: 'var(--ink-70)', maxWidth: 560 }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span style={EYEBROW}><span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />{children}</span>
}

function Check() {
  return (
    <span aria-hidden style={{ width: 22, height: 22, flexShrink: 0, marginTop: 1, background: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5l2.6 2.5L10 3.5" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="square" /></svg>
    </span>
  )
}

// ⚠️ Iniettato con dangerouslySetInnerHTML (vedi LandingClient della consulenza).
const PAGE_CSS = `
  .ap-light {
    --bg: #ffffff; --surface: #f7f5ef; --surface-2: #ece9e0;
    --border: #e4e0d6; --border-strong: #c9c4b9;
    --text: #0a0a0a; --muted: #6b6b6b; --ink-70: rgba(10,10,10,0.72);
  }
  .ap-header { position: sticky; top: 0; z-index: 200; background: rgba(10,10,10,0.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 14px 0; }
  .ap-header-cta { background: var(--accent); color: #0a0a0a; padding: 11px 28px; font-family: var(--font-syne), sans-serif; font-size: 14px; font-weight: 600; letter-spacing: .02em; text-transform: uppercase; text-decoration: none; cursor: none; white-space: nowrap; transition: background .3s, color .3s; }
  .ap-header-cta:hover { background: #ffffff; }
  @media (max-width: 600px){ .ap-header { padding: 10px 0; } .ap-header-cta { padding: 9px 14px; font-size: 11.5px; } }

  .ap-mark { background: var(--accent); color: #0a0a0a; padding: 0.04em .16em 0; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .ap-h1 .ap-mark { display:inline-block; line-height: 1.08; padding: .14em .16em .04em; margin-top: .14em; white-space: nowrap; }

  /* Hero */
  .ap-hero { position: relative; overflow: hidden; padding: clamp(48px,6vw,88px) 0 clamp(56px,7vw,96px); }
  .ap-hero::before { content:''; position:absolute; top:-30%; right:-10%; width: 62vw; height: 62vw; max-width: 900px; max-height: 900px; border-radius:50%; pointer-events:none;
    background: radial-gradient(circle, rgba(255,209,8,0.42) 0%, rgba(255,209,8,0.14) 40%, rgba(255,209,8,0) 68%); filter: blur(8px); }
  .ap-hero-grid { position:relative; display:grid; grid-template-columns: 1.02fr 0.98fr; grid-template-rows: auto 1fr; column-gap: clamp(32px,5vw,72px); row-gap: 32px; align-items:start; }
  .ap-hero-copy { grid-column:1; grid-row:1; }
  .ap-hero-proof { grid-column:1; grid-row:2; }
  .ap-hero-card { grid-column:2; grid-row: 1 / span 2; align-self:center; padding-top: 8px; }
  .ap-h1 { font-family: var(--font-boldonse), sans-serif; font-weight:400; text-transform: uppercase; color: var(--text); margin:0;
    font-size: clamp(24px, 3vw, 44px); line-height: 1.28; letter-spacing: -0.01em; }
  /* Scheda del questionario: forme che la staccano dal resto */
  .ap-card-wrap { position:relative; padding: 18px 18px 22px 0; }
  .ap-card-wrap::before { content:''; position:absolute; inset: 0 0 0 18px; transform: translate(18px, 18px); background: var(--accent); z-index:0; }
  .ap-card-wrap::after { content:''; position:absolute; left:-56px; bottom:-40px; width: 180px; height: 180px; z-index:0; pointer-events:none;
    background-image: radial-gradient(#0a0a0a 1.4px, transparent 1.6px); background-size: 14px 14px; opacity: .22; }
  .ap-card { position:relative; z-index:1; background: #ffffff; border: 1.5px solid #0a0a0a; box-shadow: 0 32px 80px rgba(10,10,10,0.14); padding: clamp(26px,2.8vw,40px) clamp(22px,2.6vw,36px) clamp(22px,2.6vw,32px); }
  .ap-card-tag { position:absolute; top: -2px; left: 26px; z-index:2; transform: translateY(-50%); background:#0a0a0a; color: var(--accent); font-family: var(--font-bebas), sans-serif; font-size: 17px; letter-spacing: .12em; padding: 8px 14px 6px; line-height:1; }
  .ap-card-float { position:absolute; right: -14px; bottom: 2px; z-index:3; background:#ffffff; border: 1.5px solid #0a0a0a; padding: 10px 14px; display:inline-flex; align-items:center; gap: 10px; font-family: var(--font-syne), sans-serif; font-size: 12.5px; font-weight: 600; color:#0a0a0a; box-shadow: 6px 6px 0 var(--accent); }
  .ap-card-float i { width: 8px; height: 8px; background: var(--accent); display:inline-block; }
  @media (max-width: 900px){
    .ap-card-wrap { padding: 14px 14px 18px 0; }
    .ap-card-wrap::before { inset: 0 0 0 14px; transform: translate(12px, 12px); }
    .ap-card-wrap::after { display:none; }
    .ap-card-float { right: 4px; bottom: -6px; }
  }
  .ap-form-grid { grid-template-columns: 0.9fr 1.1fr; }
  .ap-form-copy { position: sticky; top: 100px; }
  @media (max-width: 900px){
    .ap-form-copy { position: static; }
    .ap-hero { padding-top: 40px; }
    .ap-hero-grid { grid-template-columns: 1fr; grid-template-rows: none; }
    .ap-hero-copy, .ap-hero-proof, .ap-hero-card { grid-column: 1; grid-row: auto; }
    .ap-hero-card { order: 2; } .ap-hero-proof { order: 3; }
  }

  /* Griglie */
  .ap-2col { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,5vw,72px); align-items:center; }
  .ap-3col { display:grid; grid-template-columns: repeat(3,1fr); gap: clamp(24px,3vw,40px); }
  .ap-list { display:grid; gap: 22px; }
  @media (max-width: 900px){ .ap-2col, .ap-3col { grid-template-columns: 1fr; } }

  /* Mockup: portatile + telefono con un sito vero fatto da noi */
  .ap-mock { position:relative; padding-bottom: 12%; }
  .ap-laptop { position:relative; border: 10px solid #141414; border-bottom-width: 18px; border-radius: 14px; background:#141414; overflow:hidden; box-shadow: 0 30px 70px rgba(10,10,10,0.18); }
  .ap-laptop img { display:block; width:100%; height:auto; }
  .ap-phone { position:absolute; left: -4%; bottom: 0; width: 28%; border: 7px solid #141414; border-radius: 26px; background:#141414; overflow:hidden; box-shadow: 0 24px 50px rgba(10,10,10,0.25); }
  .ap-phone img { display:block; width:100%; height:auto; }
  .ap-mock-cap { margin-top: 18px; font-family: var(--font-syne), sans-serif; font-size: 12.5px; color: var(--muted); letter-spacing: .02em; }
  @media (max-width: 900px){ .ap-phone { left: 0; width: 32%; } }

  /* Progetti */
  .ap-projects { display:grid; grid-template-columns: repeat(3,1fr); gap: clamp(16px,2.4vw,28px); }
  .ap-project { display:block; text-decoration:none; color:inherit; cursor:none; }
  .ap-project-img { position:relative; aspect-ratio: 4/5; overflow:hidden; background: var(--surface-2); }
  .ap-project-img img { object-fit: cover; transition: transform .8s cubic-bezier(.16,1,.3,1); }
  .ap-project:hover .ap-project-img img { transform: scale(1.04); }
  @media (max-width: 900px){ .ap-projects { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px){ .ap-projects { grid-template-columns: 1fr; } .ap-project-img { aspect-ratio: 4/3; } }

  /* Blocco scuro: cosa costruiamo */
  .ap-dark { position:relative; overflow:hidden; background:#0a0a0a; color:#f0ede6; padding: clamp(40px,5vw,72px) clamp(24px,4vw,64px); }
  .ap-dark::after { content:''; position:absolute; right:-20%; top:-40%; width: 60%; aspect-ratio:1; border-radius:50%; pointer-events:none;
    background: radial-gradient(circle, rgba(255,209,8,0.22) 0%, rgba(255,209,8,0.06) 40%, rgba(255,209,8,0) 68%); }
  .ap-dark > * { position:relative; z-index:1; }
  .ap-pills { display:flex; flex-wrap:wrap; gap: 10px; margin-top: 32px; max-width: 880px; }
  .ap-pill { display:inline-flex; align-items:center; gap:10px; padding: 11px 18px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); color:#f0ede6; font-family: var(--font-syne), sans-serif; font-size: 14.5px; font-weight: 500; line-height:1; transition: border-color .3s, background .3s; }
  .ap-pill::before { content:''; width:7px; height:7px; background: var(--accent); display:inline-block; }
  .ap-pill:hover { border-color: var(--accent); background: rgba(255,209,8,0.08); }

  /* FAQ */
  .ap-root details > summary::-webkit-details-marker { display:none; }
  .ap-root details[open] .ap-faqicon { transform: rotate(45deg); }

  /* Pulsanti: un solo colore per l'azione */
  .ap-light .consulenza-cta-bar { background: var(--accent); border-color: var(--accent); color: #0a0a0a; }
  .ap-light .consulenza-cta-bar::before { background: #0a0a0a; }
  .ap-light .consulenza-cta-bar:hover:not(:disabled) { color: #ffffff; border-color: #0a0a0a; }
  .ap-light .btn-accent:hover { background: #0a0a0a; color: #ffffff; }

  /* Barra fissa solo su telefono, e solo quando il modulo non è in vista */
  .ap-sticky { display:none; }
  @media (max-width:900px){ .ap-sticky { display:flex; transition: transform .35s cubic-bezier(.16,1,.3,1); } .ap-sticky.nascosta { transform: translateY(110%); } }
`

export default function AnteprimaClient({ projects }: { projects: Project[] }) {
  const { whatsapp } = useSiteSettings()
  const esempi = projects.filter(p => p.immagini.length > 0).slice(0, 3)
  const [formInVista, setFormInVista] = useState(true)

  useEffect(() => {
    const el = document.getElementById('form')
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setFormInVista(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      {/* Intestazione essenziale: niente menu, logo e pulsante allineati al contenuto */}
      <header className="ap-header">
        <div style={{ ...WRAP, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" aria-label="Pira Web, torna alla home" style={{ display: 'inline-flex', cursor: 'none' }}>
            <Image src="/logo.png" alt="Pira Web" width={82} height={41} priority style={{ height: 38, width: 'auto' }} />
          </Link>
          <a href="#form" className="ap-header-cta">Voglio l’anteprima</a>
        </div>
      </header>
      <main className="ap-root ap-light" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: SYNE }}>
        <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

        {/* ── Hero: promessa + modulo nel primo schermo ── */}
        <section className="ap-hero">
          <div style={WRAP}>
            <div className="ap-hero-grid">
              <div className="ap-hero-copy">
                <Eyebrow>Anteprima gratuita · entro {ORE_CONSEGNA} ore</Eyebrow>
                <h1 className="ap-h1">Prima il sito,<br /><span className="ap-mark">poi il preventivo.</span></h1>
                <p style={{ ...LEAD, marginTop: 22 }}>
                  Rispondi a qualche domanda. Entro {ORE_CONSEGNA} ore ricevi un link privato con la prima pagina del tuo nuovo sito, già navigabile dal telefono. Se ti convince si va avanti. Se no, finisce lì.
                </p>
              </div>

              <div className="ap-hero-proof">
                <a href="#form" className="btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 13, padding: '18px 34px' }}>Voglio l’anteprima →</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 12 }}>
                  {garanzie.map(g => (
                    <li key={g} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', ...P, color: 'var(--text)' }}><Check />{g}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <a
                    href="https://it.trustpilot.com/review/piraweb.it?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--border)', padding: '9px 14px', borderRadius: 8, textDecoration: 'none', cursor: 'none' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" /></svg>
                    <span style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 14, color: '#191919' }}>Trustpilot</span>
                    <span style={{ display: 'inline-flex', gap: 2 }} aria-label="Valutazione 5 su 5">
                      {[0, 1, 2, 3, 4].map(i => (
                        <span key={i} style={{ background: '#00b67a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fff" /></svg>
                        </span>
                      ))}
                    </span>
                  </a>
                  <span style={{ fontFamily: SYNE, fontSize: 13, color: 'var(--muted)' }}>Recensioni verificate dei nostri clienti</span>
                </div>
              </div>

              <div className="ap-hero-card">
                <div className="ap-mock" aria-label="Esempio di sito realizzato da Pira Web, su computer e telefono">
                  <div className="ap-laptop">
                    <Image src="/anteprima/esempio-desktop.jpg" alt="Homepage dell’e-commerce Biancheria da Sogno Pedata su computer" width={1600} height={1250} priority sizes="(max-width: 900px) 100vw, 560px" />
                  </div>
                  <div className="ap-phone">
                    <Image src="/anteprima/esempio-mobile.jpg" alt="La stessa homepage vista dal telefono" width={520} height={1000} sizes="(max-width: 900px) 32vw, 160px" />
                  </div>
                </div>
                <p className="ap-mock-cap">Esempio: biancheriadasognopedata.com, e-commerce realizzato da noi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cosa trovi nel link ── */}
        <section style={SECTION(true)}>
          <div style={WRAP}>
            <Eyebrow>Cosa trovi nel link</Eyebrow>
            <h2 style={{ ...H2, maxWidth: 680 }}>La prima pagina del tuo sito, fatta davvero.</h2>
            <p style={{ ...LEAD, marginTop: 20, marginBottom: 'clamp(36px,4vw,52px)' }}>Non una presentazione, non un elenco di cose che faremo. Una pagina che apri, scorri e fai vedere a chi vuoi.</p>
            <div className="ap-2col" style={{ alignItems: 'start', rowGap: 32 }}>
              {cosaRicevi.map((c, i) => (
                <div key={c.t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: BEBAS, fontSize: 30, lineHeight: 1, color: 'var(--accent)', minWidth: 36, paddingTop: 2 }}>0{i + 1}</span>
                  <div>
                    <h3 style={H3}>{c.t}</h3>
                    <p style={{ ...P, marginTop: 6 }}>{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Come funziona ── */}
        <section style={SECTION()}>
          <div style={WRAP}>
            <Eyebrow>Come funziona</Eyebrow>
            <h2 style={{ ...H2, maxWidth: 640, marginBottom: 'clamp(36px,4vw,56px)' }}>Tre passaggi. Uno solo tocca a te.</h2>
            <div className="ap-3col">
              {passaggi.map((p, i) => (
                <div key={i} style={{ borderTop: '2px solid var(--text)', paddingTop: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontFamily: BEBAS, fontSize: 56, lineHeight: 0.9, color: 'var(--accent)' }}>0{i + 1}</span>
                    <span style={{ fontFamily: SYNE, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'right' }}>{p.quando}</span>
                  </div>
                  <h3 style={{ ...H3, fontSize: 'clamp(19px,1.6vw,22px)' }}>{p.t}</h3>
                  <p style={{ ...P, marginTop: 10 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cosa costruiamo ── */}
        <section style={{ ...SECTION(), paddingTop: 0 }}>
          <div style={WRAP}>
            <div className="ap-dark">
              <span style={{ ...EYEBROW, color: '#f0ede6' }}><span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />Cosa costruiamo</span>
              <h2 style={{ ...H2, color: '#ffffff', maxWidth: 760 }}>Il sito è l’inizio. <span style={{ color: 'var(--accent)' }}>Il resto lo facciamo in casa.</span></h2>
              <p style={{ ...LEAD, color: 'rgba(240,237,230,0.72)', marginTop: 18, maxWidth: 640 }}>
                Negozi online, prenotazioni, gestionali, contenuti e campagne: tutto dallo stesso team, con un solo referente e nessun fornitore da rincorrere.
              </p>
              <ul className="ap-pills" style={{ listStyle: 'none', padding: 0 }}>
                {costruiamo.map(c => <li key={c} className="ap-pill">{c}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Perché gratis ── */}
        <section style={SECTION(true)}>
          <div style={WRAP}>
            <div className="ap-2col" style={{ alignItems: 'start' }}>
              <div>
                <Eyebrow>La domanda legittima</Eyebrow>
                <h2 style={H2}>Perché lavorare gratis prima ancora di conoscerci? <span className="ap-mark">Perché conviene anche a noi.</span></h2>
                <p style={{ ...LEAD, marginTop: 20 }}>Non è un regalo, è un modo diverso di iniziare un rapporto di lavoro.</p>
                <a href="#form" className="btn-accent" style={{ marginTop: 32 }}>Voglio l’anteprima →</a>
              </div>
              <div className="ap-list" style={{ gap: 26 }}>
                {perNoi.map(p => (
                  <div key={p.t} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 18 }}>
                    <h3 style={H3}>{p.t}</h3>
                    <p style={{ ...P, marginTop: 6 }}>{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Per chi ── */}
        <section style={SECTION()}>
          <div style={WRAP}>
            <Eyebrow>Prima di compilare</Eyebrow>
            <h2 style={{ ...H2, maxWidth: 640, marginBottom: 'clamp(36px,4vw,56px)' }}>Per chi ha senso, e per chi no.</h2>
            <div className="ap-2col" style={{ alignItems: 'start' }}>
              <div>
                <h3 style={{ ...H3, marginBottom: 18 }}>Fa per te se</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {perTe.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--border)', ...P, color: 'var(--text)' }}><Check />{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ ...H3, marginBottom: 18, color: 'var(--muted)' }}>Non fa per te se</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {nonPerTe.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--border)', ...P }}>
                      <span aria-hidden style={{ width: 22, height: 22, flexShrink: 0, marginTop: 1, border: '1px solid var(--border-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 12 }}>✕</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Il questionario: dopo aver detto per chi è, si chiede ── */}
        <section id="form" style={{ ...SECTION(true), scrollMarginTop: 90, position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', left: '-15%', bottom: '-40%', width: '55vw', maxWidth: 820, aspectRatio: '1', borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(255,209,8,0.30) 0%, rgba(255,209,8,0.10) 40%, rgba(255,209,8,0) 68%)', filter: 'blur(8px)' }} />
          <div style={{ ...WRAP, position: 'relative' }}>
            <div className="ap-2col ap-form-grid" style={{ alignItems: 'start' }}>
              <div className="ap-form-copy">
                <Eyebrow>Si parte da qui</Eyebrow>
                <h2 style={H2}>Raccontaci la tua attività. <span className="ap-mark">Tre minuti.</span></h2>
                <p style={{ ...LEAD, marginTop: 20 }}>Una domanda alla volta, quasi tutto a scelta multipla. Entro {ORE_CONSEGNA} ore ricevi il link alla tua anteprima su WhatsApp o via email.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 12 }}>
                  {garanzie.map(g => (
                    <li key={g} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', ...P, color: 'var(--text)' }}><Check />{g}</li>
                  ))}
                </ul>
              </div>
              <div className="ap-card-wrap">
                <div className="ap-card">
                  <span className="ap-card-tag" aria-hidden>GRATIS · ENTRO {ORE_CONSEGNA} ORE</span>
                  <AnteprimaForm whatsapp={whatsapp} />
                </div>
                <span className="ap-card-float" aria-hidden><i />19 domande · 3 minuti</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Progetti ── */}
        {esempi.length > 0 && (
          <section style={SECTION()}>
            <div style={WRAP}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 'clamp(28px,3vw,44px)' }}>
                <div>
                  <Eyebrow>Lavori recenti</Eyebrow>
                  <h2 style={H2}>Alcuni siti usciti dal nostro studio.</h2>
                </div>
                <Link href="/progetti" style={{ fontFamily: SYNE, fontSize: 14, fontWeight: 600, color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: 4, cursor: 'none' }}>Tutti i progetti →</Link>
              </div>
              <div className="ap-projects">
                {esempi.map(p => (
                  <Link key={p.slug} href={`/progetti/${p.slug}`} className="ap-project">
                    <div className="ap-project-img">
                      <Image src={coverFor(p)} alt={p.title} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 360px" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 14, alignItems: 'baseline' }}>
                      <h3 style={{ ...H3, fontSize: 17 }}>{p.title}</h3>
                      <span style={{ fontFamily: SYNE, fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{p.services.slice(0, 2).join(' · ')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section style={SECTION(true)}>
          <div style={{ ...WRAP, maxWidth: 820 }}>
            <Eyebrow>Domande frequenti</Eyebrow>
            <h2 style={{ ...H2, marginBottom: 'clamp(28px,3vw,40px)' }}>Quello che ci chiedono prima di compilare.</h2>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              {faq.map((f, i) => (
                <details key={i} style={{ borderTop: '1px solid var(--border)', padding: '20px 0' }}>
                  <summary style={{ fontFamily: SYNE, fontSize: 'clamp(16px,1.3vw,18px)', fontWeight: 600, color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', cursor: 'none' }}>
                    {f.q}
                    <span className="ap-faqicon" style={{ color: 'var(--text)', fontFamily: BEBAS, fontSize: 28, flexShrink: 0, transition: 'transform .3s', lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ ...P, marginTop: 14 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Barra fissa (solo telefono, sparisce quando il modulo è in vista) ── */}
        <a href="#form" className={`ap-sticky ${formInVista ? 'nascosta' : ''}`} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150, background: 'var(--accent)', color: '#0a0a0a', justifyContent: 'center', alignItems: 'center', padding: '16px', fontFamily: SYNE, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'none' }}>
          Voglio l’anteprima gratuita
        </a>
      </main>

      <Footer ctaTitle={<>Prima il sito,<br />poi il preventivo.</>} ctaHref="#form" ctaLabel="Voglio l’anteprima" />
    </>
  )
}
