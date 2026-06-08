'use client'

import { useEffect, useRef, useState } from 'react'
import { trackLead } from '@/lib/gtag'

type Props = { open: boolean; position: string; onClose: () => void }

const MAX_MB = 4

export default function CandidaturaModal({ open, position, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Reset quando si apre / chiude
  useEffect(() => {
    if (open) {
      setStatus('idle')
      setError('')
      setFileName('')
      formRef.current?.reset()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC per chiudere
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) {
      setFileName('')
      return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`Il file supera i ${MAX_MB} MB`)
      e.target.value = ''
      setFileName('')
      return
    }
    setError('')
    setFileName(f.name)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')
    try {
      const data = new FormData(e.currentTarget)
      data.set('posizione', position)
      const res = await fetch('/api/candidatura', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) {
        setStatus('ok')
        trackLead('candidatura')
      } else {
        setStatus('error')
        setError(json.error || 'Invio non riuscito, riprova.')
      }
    } catch {
      setStatus('error')
      setError('Errore di rete, riprova.')
    }
  }

  return (
    <div className="cand-backdrop" onClick={onClose}>
      <div className="cand-modal" role="dialog" aria-modal="true" aria-label="Candidatura" onClick={(e) => e.stopPropagation()}>
        <button className="cand-close" onClick={onClose} aria-label="Chiudi">
          ✕
        </button>

        {status === 'ok' ? (
          <div className="cand-success">
            <div className="cand-success-mark">✓</div>
            <h3 className="cand-title">Candidatura inviata!</h3>
            <p className="cand-sub">Grazie — ti ricontatteremo presto all&apos;indirizzo che hai indicato.</p>
            <button className="cand-submit" onClick={onClose}>
              Chiudi
            </button>
          </div>
        ) : (
          <>
            <p className="cand-eyebrow">Candidatura</p>
            <h3 className="cand-title">{position}</h3>
            <p className="cand-sub">Compila il form e allega il tuo CV/portfolio. Ti ricontattiamo noi.</p>

            <form ref={formRef} className="cand-form" onSubmit={onSubmit}>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="cand-gotcha" aria-hidden />

              <div className="cand-row2">
                <label className="cand-field">
                  <span>Nome *</span>
                  <input type="text" name="nome" required autoComplete="given-name" />
                </label>
                <label className="cand-field">
                  <span>Cognome *</span>
                  <input type="text" name="cognome" required autoComplete="family-name" />
                </label>
              </div>

              <label className="cand-field">
                <span>Email *</span>
                <input type="email" name="email" required autoComplete="email" placeholder="nome@email.it" />
              </label>

              <label className="cand-field">
                <span>Anni di esperienza</span>
                <select name="esperienza" defaultValue="">
                  <option value="" disabled>
                    Seleziona…
                  </option>
                  <option>Meno di 1 anno</option>
                  <option>1–3 anni</option>
                  <option>3–5 anni</option>
                  <option>Più di 5 anni</option>
                </select>
              </label>

              <label className="cand-field">
                <span>Messaggio (facoltativo)</span>
                <textarea name="messaggio" rows={3} placeholder="Due righe su di te…" />
              </label>

              <label className="cand-file">
                <input type="file" name="cv" accept=".pdf,.doc,.docx,application/pdf" onChange={handleFile} />
                <span className="cand-file-btn">Carica CV / Portfolio</span>
                <span className="cand-file-name">{fileName || `PDF o Word · max ${MAX_MB} MB`}</span>
              </label>

              {error && <p className="cand-error">{error}</p>}

              <button type="submit" className="cand-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Invio in corso…' : 'Invia candidatura'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
