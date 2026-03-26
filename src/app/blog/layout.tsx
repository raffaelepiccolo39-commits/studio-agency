import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Pira Web Creative Agency',
  description: 'Insights su design, tecnologia e marketing digitale dal team Pira Web. Articoli su e-commerce, SEO, branding e molto altro.',
  openGraph: {
    title: 'Blog — Pira Web Creative Agency',
    description: 'Insights su design, tecnologia e marketing digitale dal team Pira Web.',
    url: 'https://www.piraweb.it/blog',
    images: [{ url: 'https://www.piraweb.it/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.piraweb.it/blog' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
