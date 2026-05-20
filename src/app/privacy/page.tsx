import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Pira Web',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679).',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,40px)' }}>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,7vw,80px)', letterSpacing: '0.01em', lineHeight: 1, marginBottom: '32px' }}>
            PRIVACY <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>policy</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Ultimo aggiornamento: 19 maggio 2026
          </p>

          <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.75)' }}>
            <p style={{ marginBottom: '32px' }}>
              La presente informativa descrive le modalità di trattamento dei dati personali degli utenti
              che consultano il sito <strong>piraweb.it</strong>, ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR).
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>1. Titolare del trattamento</h2>
            <p style={{ marginBottom: '16px' }}>
              Il Titolare del trattamento è <strong>Pira Web Creative Agency</strong>, con sede in Casapesenna (CE).
              {/* TODO: aggiungere ragione sociale completa, indirizzo legale e P.IVA */}
            </p>
            <p style={{ marginBottom: '16px' }}>
              Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile contattare il Titolare all&apos;indirizzo email:&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>2. Dati raccolti</h2>
            <p style={{ marginBottom: '16px' }}>
              Il sito raccoglie i dati personali forniti volontariamente dall&apos;utente tramite i form di contatto
              (nome, indirizzo email, numero di telefono ove indicato, messaggio) e i dati di navigazione raccolti
              automaticamente dai sistemi informatici (indirizzo IP, tipo di browser, sistema operativo, pagine visitate,
              orari di accesso).
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>3. Finalità e base giuridica</h2>
            <p style={{ marginBottom: '16px' }}>I dati sono trattati per le seguenti finalità:</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Rispondere alle richieste di informazioni o preventivo inviate tramite i form (base giuridica: misure precontrattuali, art. 6.1.b GDPR).</li>
              <li style={{ marginBottom: '8px' }}>Adempiere agli obblighi di legge (art. 6.1.c GDPR).</li>
              <li style={{ marginBottom: '8px' }}>Garantire la sicurezza tecnica del sito e prevenire abusi (legittimo interesse, art. 6.1.f GDPR).</li>
            </ul>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>4. Modalità e tempi di conservazione</h2>
            <p style={{ marginBottom: '16px' }}>
              I dati sono trattati con strumenti informatici, adottando misure tecniche e organizzative adeguate
              a garantirne riservatezza e integrità. I dati raccolti tramite form di contatto sono conservati
              per il tempo strettamente necessario a evadere la richiesta e, successivamente, per un massimo
              di 24 mesi, salvo obblighi di legge che impongano tempi diversi.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>5. Destinatari dei dati</h2>
            <p style={{ marginBottom: '16px' }}>
              I dati possono essere comunicati a soggetti che svolgono attività strumentali al funzionamento del sito
              e dei servizi connessi, nominati responsabili del trattamento ex art. 28 GDPR, tra cui:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Vercel Inc.</strong> — hosting del sito.</li>
              <li style={{ marginBottom: '8px' }}><strong>Formspree</strong> — gestione degli invii dei form di contatto.</li>
              {/* TODO: aggiungere altri responsabili se attivi (Sanity, Resend, Google Analytics, Meta Pixel...) */}
            </ul>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>6. Diritti dell&apos;interessato</h2>
            <p style={{ marginBottom: '16px' }}>
              In ogni momento l&apos;utente può esercitare i diritti previsti dagli artt. 15-22 del GDPR: accesso ai dati,
              rettifica, cancellazione, limitazione del trattamento, portabilità, opposizione. Per esercitare tali diritti
              o presentare reclamo è possibile contattare il Titolare all&apos;indirizzo&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a> o rivolgersi al&nbsp;
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Garante per la protezione dei dati personali</a>.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>7. Cookie</h2>
            <p style={{ marginBottom: '16px' }}>
              Per informazioni sull&apos;utilizzo dei cookie consulta la&nbsp;
              <a href="/cookie" style={{ color: 'var(--accent)' }}>Cookie Policy</a>.
            </p>

            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '0.02em', marginTop: '48px', marginBottom: '16px' }}>8. Modifiche</h2>
            <p style={{ marginBottom: '16px' }}>
              Il Titolare si riserva il diritto di modificare la presente informativa pubblicandone la versione aggiornata
              su questa pagina. Si invita l&apos;utente a consultarla periodicamente.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
