import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Eliminazione account — App Pira Web',
  description: 'Come richiedere l’eliminazione del tuo account e dei tuoi dati dall’applicazione Pira Web.',
  robots: { index: false, follow: true },
}

const h2 = {
  fontFamily: 'var(--font-bebas)',
  fontSize: 'clamp(24px,3vw,32px)',
  letterSpacing: '0.02em',
  marginTop: '48px',
  marginBottom: '16px',
} as const

export default function EliminaAccountPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,40px)' }}>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,7vw,80px)', letterSpacing: '0.01em', lineHeight: 1, marginBottom: '32px' }}>
            ELIMINAZIONE <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>account</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Applicazione &ldquo;Pira Web&rdquo; &middot; Ultimo aggiornamento: 26 luglio 2026
          </p>

          <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.75)' }}>
            <p style={{ marginBottom: '32px' }}>
              Questa pagina spiega come richiedere l&apos;eliminazione del tuo account dell&apos;applicazione
              <strong> Pira Web</strong> e dei dati personali a esso associati.
            </p>

            <h2 style={h2}>Come richiedere l&apos;eliminazione</h2>
            <p style={{ marginBottom: '16px' }}>
              Invia una richiesta via email a&nbsp;
              <a href="mailto:info@piraweb.it?subject=Richiesta%20eliminazione%20account%20app" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>,
              indicando come oggetto <strong>&ldquo;Richiesta eliminazione account app&rdquo;</strong> e specificando
              l&apos;indirizzo email con cui accedi all&apos;app. Per motivi di sicurezza potremmo chiederti di
              confermare la tua identità prima di procedere.
            </p>

            <h2 style={h2}>Quali dati vengono eliminati</h2>
            <p style={{ marginBottom: '16px' }}>
              A seguito della richiesta vengono eliminati il tuo account e i dati personali a esso collegati, tra cui:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Dati dell&apos;account (nome, cognome, email, ruolo)</li>
              <li style={{ marginBottom: '8px' }}>Dati di presenza e di posizione registrati con le timbrature</li>
              <li style={{ marginBottom: '8px' }}>Dati di lavoro personali associati al tuo profilo, ove non necessari ad altri utenti o al Titolare</li>
            </ul>

            <h2 style={h2}>Dati eventualmente conservati e tempi</h2>
            <p style={{ marginBottom: '16px' }}>
              Alcune informazioni possono essere conservate per il periodo previsto dagli obblighi di legge,
              contabili e fiscali (ad esempio dati relativi a fatture, contratti o adempimenti), anche dopo
              l&apos;eliminazione dell&apos;account. La richiesta viene evasa entro <strong>30 giorni</strong>.
            </p>

            <h2 style={h2}>Contatti</h2>
            <p style={{ marginBottom: '16px' }}>
              Titolare del trattamento: <strong>Pira Web S.r.l.</strong> — Via A. Petrillo n° 171,
              81030 Casapesenna (CE), Italia — P.IVA IT04891370613. Email:&nbsp;
              <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Per il trattamento dei dati personali consulta la&nbsp;
              <a href="/privacy-app" style={{ color: 'var(--accent)' }}>Privacy Policy dell&apos;app</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
