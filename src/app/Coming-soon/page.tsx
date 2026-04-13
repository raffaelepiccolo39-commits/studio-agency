export default function ComingSoonPage() {
  return (
    <main style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px', textAlign: 'center',
      fontFamily: 'sans-serif',
    }}>
      <img src="/logo.png" alt="Pira Web" style={{ height: '80px', marginBottom: '48px' }} />

      <h1 style={{
        fontSize: 'clamp(48px,8vw,100px)',
        fontWeight: 900, letterSpacing: '-0.02em',
        color: '#f0ede6', lineHeight: 1, marginBottom: '24px',
        textTransform: 'uppercase',
      }}>
        Stiamo<br />
        <span style={{ color: '#c8f55a' }}>Arrivando</span>
      </h1>

      <p style={{
        fontSize: '16px', color: 'rgba(240,237,230,0.5)',
        maxWidth: '400px', lineHeight: 1.7, marginBottom: '48px',
      }}>
        Stiamo lavorando a qualcosa di straordinario.<br />
        Stay tuned — sarà presto online.
      </p>

      <a href="mailto:info@piraweb.it" style={{
        color: '#c8f55a', fontSize: '14px',
        letterSpacing: '0.1em', textDecoration: 'none',
        borderBottom: '1px solid #c8f55a', paddingBottom: '4px',
      }}>
        info@piraweb.it
      </a>
    </main>
  )
}