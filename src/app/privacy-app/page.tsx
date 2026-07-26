import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy App — Pira Web',
  description: 'Informativa privacy dell’applicazione Pira Web (gestionale) ai sensi del GDPR (Reg. UE 2016/679).',
  robots: { index: false, follow: true },
}

const h2 = {
  fontFamily: 'var(--font-bebas)',
  fontSize: 'clamp(24px,3vw,32px)',
  letterSpacing: '0.02em',
  marginTop: '48px',
  marginBottom: '16px',
} as const

export default function PrivacyAppPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,40px)' }}>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,7vw,80px)', letterSpacing: '0.01em', lineHeight: 1, marginBottom: '32px' }}>
            PRIVACY <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>policy app</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Applicazione &ldquo;Pira Web&rdquo; &middot; Ultimo aggiornamento: 26 luglio 2026
          </p>

          <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.75)' }}>
            <p style={{ marginBottom: '32px' }}>
              La presente informativa descrive le modalità di trattamento dei dati personali degli utenti
              dell&apos;applicazione <strong>Pira Web</strong> (di seguito &ldquo;l&apos;App&rdquo;), disponibile per dispositivi
              iOS e Android, ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR). L&apos;App è un
              gestionale ad accesso riservato destinato al personale di Pira Web e ai suoi clienti; l&apos;accesso
              avviene esclusivamente tramite credenziali fornite su invito.
            </p>

            <h2 style={h2}>1. Titolare del trattamento</h2>
            <p style={{ marginBottom: '16px' }}>
              Il Titolare del trattamento è <strong>Pira Web S.r.l.</strong>, con sede legale in Via A. Petrillo n° 171,
              81030 Casapesenna (CE), Italia — P.IVA IT04891370613.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile contattare il Titolare all&apos;indirizzo email:&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
            </p>

            <h2 style={h2}>2. Dati raccolti</h2>
            <p style={{ marginBottom: '16px' }}>L&apos;App tratta le seguenti categorie di dati:</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Dati dell&apos;account</strong>: nome, cognome, indirizzo email e ruolo, necessari per l&apos;autenticazione e l&apos;accesso all&apos;App.</li>
              <li style={{ marginBottom: '8px' }}><strong>Dati di lavoro</strong>: progetti, attività (task), ore lavorate, clienti, scadenze, note e contenuti inseriti dagli utenti nell&apos;ambito dell&apos;uso del gestionale.</li>
              <li style={{ marginBottom: '8px' }}><strong>Dati di presenza e posizione</strong>: in occasione della timbratura di entrata e di uscita, l&apos;App registra la posizione geografica (GPS) del dispositivo. La posizione è rilevata <strong>esclusivamente nel momento della timbratura</strong> — non è previsto alcun tracciamento continuo o in background — ed è utilizzata al solo fine di documentare il luogo di svolgimento della prestazione lavorativa.</li>
              <li style={{ marginBottom: '8px' }}><strong>Dati amministrativi</strong>: informazioni relative a pagamenti, contratti e stato dei servizi, per gli utenti a cui tali funzioni sono rese disponibili.</li>
              <li style={{ marginBottom: '8px' }}><strong>Dati tecnici</strong>: informazioni necessarie al funzionamento e alla sicurezza dell&apos;App, quali identificativo di sessione, tipo di dispositivo e log di accesso.</li>
            </ul>

            <h2 style={h2}>3. Finalità e base giuridica</h2>
            <p style={{ marginBottom: '16px' }}>I dati sono trattati per le seguenti finalità:</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Fornire le funzionalità dell&apos;App e consentire la gestione delle attività lavorative (esecuzione del rapporto contrattuale/di lavoro, art. 6.1.b GDPR).</li>
              <li style={{ marginBottom: '8px' }}>Gestire la rilevazione delle presenze e delle timbrature, inclusa la posizione al momento della timbratura, per finalità organizzative e di documentazione della prestazione (adempimento di obblighi e legittimo interesse del Titolare, art. 6.1.b, 6.1.c e 6.1.f GDPR, nel rispetto dell&apos;art. 4 della Legge 300/1970 — Statuto dei Lavoratori).</li>
              <li style={{ marginBottom: '8px' }}>Adempiere agli obblighi di legge, contabili e fiscali (art. 6.1.c GDPR).</li>
              <li style={{ marginBottom: '8px' }}>Garantire la sicurezza tecnica dell&apos;App e prevenire abusi (legittimo interesse, art. 6.1.f GDPR).</li>
            </ul>

            <h2 style={h2}>4. Natura del conferimento</h2>
            <p style={{ marginBottom: '16px' }}>
              Il conferimento dei dati dell&apos;account e dei dati di lavoro è necessario per l&apos;utilizzo dell&apos;App;
              il mancato conferimento comporta l&apos;impossibilità di accedere al servizio. Per la rilevazione della
              posizione, al primo utilizzo della funzione di timbratura viene richiesta all&apos;utente l&apos;autorizzazione
              di sistema all&apos;accesso alla posizione: tale autorizzazione può essere negata o revocata in qualsiasi
              momento dalle impostazioni del dispositivo, con la conseguenza che la timbratura potrà essere registrata
              senza il dato di posizione.
            </p>

            <h2 style={h2}>5. Modalità e tempi di conservazione</h2>
            <p style={{ marginBottom: '16px' }}>
              I dati sono trattati con strumenti informatici, adottando misure tecniche e organizzative adeguate
              a garantirne riservatezza e integrità, incluso il trasferimento cifrato delle comunicazioni. I dati sono
              conservati per il tempo necessario alle finalità per cui sono raccolti e, ove applicabile, per i termini
              previsti dagli obblighi di legge, contabili e fiscali. Alla cessazione del rapporto i dati non più necessari
              vengono cancellati o resi anonimi.
            </p>

            <h2 style={h2}>6. Destinatari dei dati</h2>
            <p style={{ marginBottom: '16px' }}>
              I dati possono essere trattati da soggetti che svolgono attività strumentali al funzionamento dell&apos;App,
              nominati responsabili del trattamento ex art. 28 GDPR, tra cui:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Vercel Inc.</strong> — hosting e distribuzione dell&apos;applicazione.</li>
              <li style={{ marginBottom: '8px' }}><strong>Supabase</strong> — servizio di database e autenticazione in cui sono conservati i dati dell&apos;App.</li>
              <li style={{ marginBottom: '8px' }}><strong>Fornitore del servizio email</strong> — invio delle comunicazioni di servizio (es. inviti e notifiche) tramite i sistemi di posta del Titolare.</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              I dati non sono ceduti a terzi per finalità di marketing e non sono oggetto di diffusione.
            </p>

            <h2 style={h2}>7. Cancellazione dell&apos;account e dei dati</h2>
            <p style={{ marginBottom: '16px' }}>
              L&apos;utente può richiedere in qualsiasi momento la cancellazione del proprio account e dei relativi dati
              personali scrivendo a&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>. La richiesta sarà
              evasa nei termini di legge, fatti salvi i dati che il Titolare è tenuto a conservare per obblighi normativi.
            </p>

            <h2 style={h2}>8. Diritti dell&apos;interessato</h2>
            <p style={{ marginBottom: '16px' }}>
              In ogni momento l&apos;utente può esercitare i diritti previsti dagli artt. 15-22 del GDPR: accesso ai dati,
              rettifica, cancellazione, limitazione del trattamento, portabilità, opposizione. Per esercitare tali diritti
              o presentare reclamo è possibile contattare il Titolare all&apos;indirizzo&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a> o rivolgersi al&nbsp;
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Garante per la protezione dei dati personali</a>.
            </p>

            <h2 style={h2}>9. Modifiche</h2>
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
