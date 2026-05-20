import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy — Pira Web',
  description: 'Informativa sull’utilizzo dei cookie e di tecnologie analoghe sul sito piraweb.it.',
  robots: { index: false, follow: true },
}

export default function CookiePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,40px)' }}>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,7vw,80px)', letterSpacing: '0.01em', lineHeight: 1, marginBottom: '32px' }}>
            COOKIE <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>policy</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Ultimo aggiornamento: 19 maggio 2026
          </p>

          <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.75)' }}>
            <p style={{ marginBottom: '32px' }}>
              Questa Cookie Policy descrive i cookie e le tecnologie analoghe utilizzati dal sito <strong>piraweb.it</strong>,
              ai sensi del Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021 e delle Linee guida EDPB.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>1. Cosa sono i cookie</h2>
            <p style={{ marginBottom: '16px' }}>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell&apos;utente,
              dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva.
              Tecnologie analoghe (pixel tag, web beacon, local storage) possono svolgere funzioni simili.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>2. Cookie utilizzati</h2>
            <p style={{ marginBottom: '16px' }}>
              Il sito utilizza esclusivamente <strong>cookie tecnici</strong>, necessari al funzionamento del sito stesso
              e all&apos;erogazione dei servizi richiesti dall&apos;utente. Per questi cookie non è richiesto il consenso
              preventivo dell&apos;utente, ai sensi dell&apos;art. 122 del Codice Privacy.
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Cookie di sessione tecnici</strong> — utilizzati per garantire la corretta navigazione e l&apos;invio dei form di contatto.
                Durata: sessione.
              </li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              {/* TODO: se in futuro saranno attivati Google Analytics, Meta Pixel, hotjar, GTM o simili,
                  aggiornare questa sezione e implementare un banner di consenso conforme al provvedimento Garante 2021. */}
              Il sito <strong>non utilizza</strong> cookie di profilazione, di marketing o di analisi di terze parti.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>3. Servizi di terze parti</h2>
            <p style={{ marginBottom: '16px' }}>
              I form di contatto sono gestiti tramite <strong>Formspree</strong>, che può impostare cookie tecnici necessari
              all&apos;invio dei messaggi. L&apos;hosting è fornito da <strong>Vercel</strong>, che può impostare cookie tecnici
              di sicurezza e funzionamento dell&apos;infrastruttura.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>4. Come gestire i cookie</h2>
            <p style={{ marginBottom: '16px' }}>
              L&apos;utente può in qualsiasi momento gestire o disattivare i cookie dal proprio browser. Le istruzioni sono disponibili sui siti ufficiali:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Google Chrome</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Mozilla Firefox</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Safari</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Microsoft Edge</a></li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              La disattivazione dei cookie tecnici può comportare il malfunzionamento di alcune sezioni del sito.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>5. Contatti</h2>
            <p style={{ marginBottom: '16px' }}>
              Per qualsiasi richiesta scrivi a&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>.
              Per maggiori informazioni sul trattamento dei dati personali consulta la&nbsp;
              <a href="/privacy" style={{ color: 'var(--accent)' }}>Privacy Policy</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
