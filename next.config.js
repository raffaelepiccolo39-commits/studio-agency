/** @type {import('next').NextConfig} */

// Header di sicurezza applicati a tutte le risposte.
// In produzione il sito emetteva solo HSTS (aggiunto da Vercel): questi tre
// sono a rischio zero e chiudono altrettante classi di attacco banali.
//
// NB: qui NON c'è la Content-Security-Policy, ed è voluto. Il sito ha script
// inline propri (consent mode, GA4) e carica da googletagmanager, Meta,
// Trustpilot e TikTok: una CSP scritta di getta romperebbe analytics, pixel,
// recensioni e la sezione video. Va costruita e distribuita prima in
// Report-Only, ed è un lavoro a sé.
const securityHeaders = [
  {
    // Impedisce al browser di "indovinare" il tipo di un file ignorando quello
    // che dichiariamo noi: è la base degli attacchi che fanno passare un
    // contenuto per un altro.
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Niente clickjacking: nessuno può incorniciare le nostre pagine in un
    // iframe sul proprio sito per far cliccare l'utente a sua insaputa.
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    // Verso siti esterni mandiamo solo il dominio di provenienza, non l'URL
    // completo: le pagine nascoste (landing ADV, questionario) non finiscono
    // nei log di chi riceve il clic.
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Nessuna pagina del sito usa fotocamera, microfono o posizione: le
    // neghiamo esplicitamente, così non possono essere richieste nemmeno da
    // contenuti di terze parti incorporati.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig = {
  // Toglie l'header X-Powered-By, che annunciava lo stack a chiunque senza
  // servire a niente.
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig
