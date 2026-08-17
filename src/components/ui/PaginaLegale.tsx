import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

/**
 * Impaginazione comune di privacy policy e cookie policy.
 *
 * Prima ogni paragrafo e ogni titolo di quelle pagine si portava dietro il
 * proprio blocco di stili inline, ripetuto identico decine di volte: il testo
 * era illeggibile in mezzo al markup, e aggiornare l'informativa — cosa che va
 * fatta ogni volta che cambia un servizio — era più difficile del necessario.
 */

const TESTO: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.8,
  color: 'rgba(240,237,230,0.75)',
}

const TITOLO_SEZIONE: React.CSSProperties = {
  fontFamily: 'var(--font-bebas)',
  fontSize: 'clamp(24px,3vw,32px)',
  letterSpacing: '0.02em',
  marginTop: '48px',
  marginBottom: '16px',
}

export function PaginaLegale({
  titolo,
  titoloCorsivo,
  aggiornata,
  introduzione,
  children,
}: {
  titolo: string
  /** La seconda parola, in corsivo giallo. */
  titoloCorsivo: string
  /** Data dell'ultimo aggiornamento, già scritta per esteso. */
  aggiornata: string
  introduzione: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px,5vw,40px)' }}>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(40px,7vw,80px)',
            letterSpacing: '0.01em',
            lineHeight: 1,
            marginBottom: '32px',
          }}>
            {titolo}{' '}
            <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>
              {titoloCorsivo}
            </span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            Ultimo aggiornamento: {aggiornata}
          </p>

          <div style={TESTO}>
            <p style={{ marginBottom: '32px' }}>{introduzione}</p>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function Sezione({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <>
      <h2 style={TITOLO_SEZIONE}>{titolo}</h2>
      {children}
    </>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: '16px' }}>{children}</p>
}

export function Elenco({ children }: { children: React.ReactNode }) {
  return <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>{children}</ul>
}

export function Voce({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: '8px' }}>{children}</li>
}

export function Collegamento({ href, children }: { href: string; children: React.ReactNode }) {
  const esterno = href.startsWith('http')
  return (
    <a
      href={href}
      style={{ color: 'var(--accent)' }}
      {...(esterno ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/**
 * Tabella dei cookie: su schermo stretto scorre da sola invece di far
 * scorrere tutta la pagina di lato.
 */
export function Tabella({ intestazioni, righe }: { intestazioni: string[]; righe: React.ReactNode[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '520px' }}>
        <thead>
          <tr>
            {intestazioni.map(t => (
              <th
                key={t}
                style={{
                  textAlign: 'left',
                  padding: '0 12px 10px 0',
                  borderBottom: '1px solid rgba(240,237,230,0.2)',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,230,0.55)',
                  fontWeight: 600,
                }}
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {righe.map((riga, i) => (
            <tr key={i}>
              {riga.map((cella, j) => (
                <td
                  key={j}
                  style={{
                    padding: '12px 12px 12px 0',
                    borderBottom: '1px solid rgba(240,237,230,0.08)',
                    verticalAlign: 'top',
                  }}
                >
                  {cella}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
