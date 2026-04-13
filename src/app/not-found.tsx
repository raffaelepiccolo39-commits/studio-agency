import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: 'clamp(120px, 15vw, 200px) clamp(24px, 5vw, 40px)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(120px, 20vw, 280px)',
          lineHeight: 0.9,
          color: 'var(--accent)',
          letterSpacing: '-0.02em',
        }}>
          404
        </h1>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          color: 'rgba(240,237,230,0.55)',
          marginTop: '16px',
          marginBottom: '48px',
          letterSpacing: '0.02em',
        }}>
          Pagina non trovata
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: 'var(--accent)',
            color: '#0a0a0a',
            padding: '14px 32px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            &larr; Torna alla home
          </Link>
          <Link href="/progetti" style={{
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '14px 32px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Vedi i progetti &rarr;
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
