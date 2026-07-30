import type { Metadata } from 'next'
import Cursor from '@/components/ui/Cursor'
import QuestionarioForm from '@/components/questionario/QuestionarioForm'
import s from '@/components/questionario/questionario.module.css'

// Questionario di qualificazione: raggiungibile solo via link diretto.
// Non indicizzabile, non in sitemap, non collegato dal menu.
// Eredita i font globali (Bebas / DM Serif / Syne) dal RootLayout.
export const metadata: Metadata = {
  title: 'Questionario — Pira Web',
  description: 'Raccontaci il tuo progetto in tre minuti: capiamo se possiamo aiutarti davvero.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function Page() {
  return (
    <main className={s.pagina}>
      <Cursor />
      <header className={s.testata}>
        <a href="/" className={s.marchio}>
          PIRA WEB
        </a>
        <span className={s.contatore}>Questionario di qualificazione</span>
      </header>
      <QuestionarioForm />
    </main>
  )
}
