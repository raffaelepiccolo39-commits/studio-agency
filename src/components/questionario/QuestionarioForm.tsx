'use client'

import { useMemo, useState } from 'react'
import { trackLead } from '@/lib/gtag'
import s from './questionario.module.css'
import {
  CAMPO_GATE,
  SOGLIA_FUORI_TARGET,
  esiti,
  sezioni,
  type Campo,
} from './domande'

type Valore = string | string[]
type Risposte = Record<string, Valore>
type Esito = 'in target' | 'fuori target'
type Stato = 'compilazione' | 'invio' | 'in target' | 'fuori target'

/**
 * Le risposte passano dalla stessa rotta degli altri form del sito: mail via
 * Resend + lead nel gestionale + copia su Formspree, con il "verde" mostrato
 * solo se la mail è partita davvero. Prima si sparava a un endpoint preso da
 * NEXT_PUBLIC_QUESTIONARIO_ENDPOINT che in produzione non è mai stato
 * configurato: il form diceva "inviato" e i questionari si perdevano.
 */
const ENDPOINT = '/api/contact'

/** Indice della sezione che contiene il campo di scarto. */
const INDICE_GATE = sezioni.findIndex(sez => sez.campi.some(c => c.id === CAMPO_GATE))

function vuoto(valore: Valore | undefined): boolean {
  if (valore === undefined) return true
  return Array.isArray(valore) ? valore.length === 0 : valore.trim() === ''
}

function testoLeggibile(campo: Campo, valore: Valore): string {
  const etichettaDi = (v: string) =>
    campo.opzioni?.find(o => o.valore === v)?.etichetta ?? v
  return Array.isArray(valore)
    ? valore.map(etichettaDi).join(', ')
    : campo.opzioni
      ? etichettaDi(valore)
      : valore.trim()
}

function messaggioErrore(campo: Campo, valore: Valore | undefined): string | null {
  if (vuoto(valore)) {
    if (!campo.obbligatorio) return null
    if (campo.tipo === 'multipla') return 'Scegli almeno una voce.'
    if (campo.tipo === 'scelta' || campo.tipo === 'menu') return 'Seleziona una risposta.'
    return 'Campo obbligatorio.'
  }
  const testo = String(valore).trim()
  if (campo.tipo === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(testo)) {
    return 'Controlla l\'indirizzo email.'
  }
  if (campo.tipo === 'tel' && testo.replace(/[^\d]/g, '').length < 8) {
    return 'Controlla il numero di telefono.'
  }
  return null
}

export default function QuestionarioForm() {
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState<Risposte>({})
  const [errori, setErrori] = useState<Record<string, string>>({})
  const [privacy, setPrivacy] = useState(false)
  const [stato, setStato] = useState<Stato>('compilazione')
  const [erroreInvio, setErroreInvio] = useState(false)

  const sezione = sezioni[indice]
  const ultima = indice === sezioni.length - 1
  const isGate = indice === INDICE_GATE
  const fuoriTarget = risposte[CAMPO_GATE] === SOGLIA_FUORI_TARGET
  /** Nell'ultima schermata utile va chiesto il consenso e va inviato. */
  const chiude = ultima || (isGate && fuoriTarget)

  const passiTotali = sezioni.length
  const avanzamento = useMemo(
    () => Math.round(((indice + 1) / passiTotali) * 100),
    [indice, passiTotali],
  )

  const scrivi = (campo: Campo, valore: Valore) => {
    setRisposte(prec => ({ ...prec, [campo.id]: valore }))
    setErrori(prec => {
      if (!prec[campo.id]) return prec
      const { [campo.id]: _rimosso, ...resto } = prec
      return resto
    })
  }

  const spuntaMultipla = (campo: Campo, valore: string, attivo: boolean) => {
    const correnti = (risposte[campo.id] as string[] | undefined) ?? []
    scrivi(campo, attivo ? [...correnti, valore] : correnti.filter(v => v !== valore))
  }

  const valida = (): boolean => {
    const trovati: Record<string, string> = {}
    for (const campo of sezione.campi) {
      const errore = messaggioErrore(campo, risposte[campo.id])
      if (errore) trovati[campo.id] = errore
    }
    // Il consenso si chiede una volta sola, sulla schermata che invia.
    if (chiude && !privacy) trovati.privacy = 'Serve il consenso per ricontattarti.'
    setErrori(trovati)
    return Object.keys(trovati).length === 0
  }

  const costruisciPayload = (esito: Esito) => {
    const dati: Record<string, string> = {}
    const righe: string[] = []
    for (const sez of sezioni) {
      for (const campo of sez.campi) {
        const valore = risposte[campo.id]
        if (vuoto(valore)) continue
        const testo = testoLeggibile(campo, valore as Valore)
        dati[campo.id] = testo
        righe.push(`${campo.etichetta}: ${testo}`)
      }
    }
    righe.push(`Consenso privacy: ${privacy ? 'sì' : 'no'}`)

    // Forma attesa da /api/contact: i campi identificativi in chiaro, tutto il
    // resto nel messaggio (che è il questionario completo, domanda per domanda).
    // NIENTE honeypot _gotcha: l'autofill del browser lo riempiva e gli invii
    // veri venivano scartati in silenzio con un falso "inviato" (vedi c8afba5,
    // rimosso per la stessa ragione da contact e candidatura).
    return {
      formType: 'questionario',
      source: 'website',
      esito,
      name: dati.nome ?? '',
      surname: '',
      company: dati.azienda ?? '',
      email: dati.email ?? '',
      phone: dati.telefono ?? '',
      service: dati.servizi ?? '',
      budget: dati[CAMPO_GATE] ?? '',
      message: righe.join('\n'),
    }
  }

  const invia = async (esito: Esito) => {
    setErroreInvio(false)
    setStato('invio')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(costruisciPayload(esito)),
      })
      if (!res.ok) throw new Error(String(res.status))
      if (esito === 'in target') trackLead('questionario')
      setStato(esito)
    } catch {
      setErroreInvio(true)
      setStato('compilazione')
    }
  }

  const avanti = () => {
    if (!valida()) return
    if (chiude) {
      void invia(isGate && fuoriTarget ? 'fuori target' : 'in target')
      return
    }
    setIndice(i => i + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const indietro = () => {
    setErrori({})
    setErroreInvio(false)
    setIndice(i => Math.max(0, i - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ─── Schermate di esito ───
  if (stato === 'in target' || stato === 'fuori target') {
    const testi = stato === 'in target' ? esiti.inTarget : esiti.fuoriTarget
    return (
      <div className={s.esito}>
        <div className={`${s.esitoSegno} ${stato === 'fuori target' ? s.esitoSegnoSpento : ''}`}>
          {stato === 'in target' ? '✓' : '—'}
        </div>
        <h2 className={s.esitoTitolo}>{testi.titolo}</h2>
        <p className={s.esitoTesto}>{testi.testo}</p>
        <p className={s.esitoNota}>{testi.nota}</p>
        <a href="/" className={s.esitoLink}>
          Torna al sito
        </a>
      </div>
    )
  }

  return (
    <>
      <div className={s.barra} aria-hidden="true">
        <div className={s.barraPieno} style={{ width: `${avanzamento}%` }} />
      </div>

      <div className={s.griglia}>
        <ol className={s.rail} aria-hidden="true">
          {sezioni.map((sez, i) => (
            <li
              key={sez.id}
              className={`${s.railVoce} ${i === indice ? s.railAttiva : ''} ${i < indice ? s.railFatta : ''}`}
            >
              <span className={s.railNumero}>{String(i + 1).padStart(2, '0')}</span>
              <span>{sez.passo}</span>
            </li>
          ))}
        </ol>

        <form
          className={s.sezione}
          key={sezione.id}
          onSubmit={e => {
            e.preventDefault()
            avanti()
          }}
          noValidate
        >
          <p className={s.passo}>
            Passo {indice + 1} di {passiTotali}
          </p>
          <h1 className={s.titolo}>{sezione.titolo}</h1>
          {sezione.sottotitolo && <p className={s.sottotitolo}>{sezione.sottotitolo}</p>}

          <div className={s.campi}>
            {sezione.campi.map(campo => (
              <CampoRender
                key={campo.id}
                campo={campo}
                valore={risposte[campo.id]}
                errore={errori[campo.id]}
                onTesto={valore => scrivi(campo, valore)}
                onMultipla={(valore, attivo) => spuntaMultipla(campo, valore, attivo)}
              />
            ))}

            {chiude && (
              <>
                <label className={s.consenso}>
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={e => {
                      setPrivacy(e.target.checked)
                      setErrori(({ privacy: _p, ...resto }) => resto)
                    }}
                    aria-invalid={Boolean(errori.privacy)}
                  />
                  <span>
                    Ho letto la{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>{' '}
                    e autorizzo Pira Web a usare questi dati per ricontattarmi.
                    {errori.privacy && <span className={s.errore}>{errori.privacy}</span>}
                  </span>
                </label>
              </>
            )}

            {erroreInvio && (
              <p className={s.erroreInvio} role="alert">
                Non siamo riusciti a inviare le risposte. Riprova, oppure scrivici a{' '}
                <a href="mailto:info@piraweb.it">info@piraweb.it</a>.
              </p>
            )}
          </div>

          <div className={s.azioni}>
            <button type="submit" className={s.avanti} disabled={stato === 'invio'}>
              <span>{stato === 'invio' ? 'Invio in corso' : chiude ? 'Invia le risposte' : 'Continua'}</span>
              <span className={s.freccia} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </button>
            {indice > 0 && (
              <button type="button" className={s.indietro} onClick={indietro}>
                Indietro
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function CampoRender({
  campo,
  valore,
  errore,
  onTesto,
  onMultipla,
}: {
  campo: Campo
  valore: Valore | undefined
  errore?: string
  onTesto: (valore: string) => void
  onMultipla: (valore: string, attivo: boolean) => void
}) {
  const classi = `${s.campo} ${campo.larghezza === 'meta' ? s.campoMeta : ''}`
  const idErrore = `${campo.id}-errore`
  const etichetta = (
    <>
      {campo.etichetta}
      {campo.obbligatorio && <span className={s.obbligo}> *</span>}
    </>
  )

  // Radio e checkbox: fieldset + legend, così il gruppo è annunciato per intero.
  if (campo.tipo === 'scelta' || campo.tipo === 'multipla') {
    const selezionati = Array.isArray(valore) ? valore : valore ? [valore] : []
    const multipla = campo.tipo === 'multipla'
    return (
      <fieldset className={`${classi} ${s.gruppo}`}>
        <legend className={`${s.etichetta} ${s.legenda}`}>{etichetta}</legend>
        {campo.aiuto && <p className={s.aiuto}>{campo.aiuto}</p>}
        <div className={s.opzioni}>
          {campo.opzioni?.map(opzione => {
            const attiva = selezionati.includes(opzione.valore)
            return (
              <label
                key={opzione.valore}
                className={`${s.opzione} ${attiva ? s.opzioneAttiva : ''} ${errore ? s.opzioneErrata : ''}`}
              >
                <input
                  className={s.controllo}
                  type={multipla ? 'checkbox' : 'radio'}
                  name={campo.id}
                  value={opzione.valore}
                  checked={attiva}
                  onChange={e =>
                    multipla ? onMultipla(opzione.valore, e.target.checked) : onTesto(opzione.valore)
                  }
                  aria-describedby={errore ? idErrore : undefined}
                />
                <span className={`${s.segno} ${multipla ? '' : s.segnoTondo}`} aria-hidden="true" />
                <span>{opzione.etichetta}</span>
              </label>
            )
          })}
        </div>
        {errore && (
          <span className={s.errore} id={idErrore} role="alert">
            {errore}
          </span>
        )}
      </fieldset>
    )
  }

  const comuni = {
    id: campo.id,
    value: typeof valore === 'string' ? valore : '',
    'aria-invalid': Boolean(errore),
    'aria-describedby': errore ? idErrore : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onTesto(e.target.value),
  }

  return (
    <div className={classi}>
      <label className={s.etichetta} htmlFor={campo.id}>
        {etichetta}
      </label>
      {campo.aiuto && <p className={s.aiuto}>{campo.aiuto}</p>}

      {campo.tipo === 'paragrafo' && (
        <textarea
          {...comuni}
          rows={3}
          placeholder={campo.placeholder}
          className={`${s.textarea} ${errore ? s.inputErrato : ''}`}
        />
      )}

      {campo.tipo === 'menu' && (
        <select {...comuni} className={`${s.select} ${errore ? s.inputErrato : ''}`}>
          <option value="">Seleziona…</option>
          {campo.opzioni?.map(o => (
            <option key={o.valore} value={o.valore}>
              {o.etichetta}
            </option>
          ))}
        </select>
      )}

      {(campo.tipo === 'testo' || campo.tipo === 'email' || campo.tipo === 'tel') && (
        <input
          {...comuni}
          type={campo.tipo === 'testo' ? 'text' : campo.tipo}
          inputMode={campo.tipo === 'tel' ? 'tel' : undefined}
          autoComplete={
            campo.tipo === 'email' ? 'email' : campo.tipo === 'tel' ? 'tel' : undefined
          }
          placeholder={campo.placeholder}
          className={`${s.input} ${errore ? s.inputErrato : ''}`}
        />
      )}

      {errore && (
        <span className={s.errore} id={idErrore} role="alert">
          {errore}
        </span>
      )}
    </div>
  )
}
