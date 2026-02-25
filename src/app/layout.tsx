import type { Metadata } from 'next'
import { Bebas_Neue, DM_Serif_Display, Syne } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pira Web Creative Agency',
  description: 'Unifichiamo brand direction, tecnologia e performance marketing in un\'unica visione operativa per brand visionari.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Pira Web Creative Agency',
    description: 'Brand direction, advanced tech, performance marketing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}