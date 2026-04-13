# 🖤 Studio Agency — Next.js

Sito web per agenzia digitale con design dark, animazioni GSAP, CMS Sanity e form contatti Resend.

## Stack tecnico

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom variables
- **Animazioni:** GSAP + @gsap/react
- **CMS:** Sanity.io (gestisci portfolio e blog senza toccare codice)
- **Email:** Resend (form contatti)
- **Deploy:** Vercel (gratuito)
- **Font:** Bebas Neue + DM Serif Display + Syne

---

## Setup in 10 minuti

### 1. Installa dipendenze
```bash
npm install
```

### 2. Configura variabili d'ambiente
```bash
cp .env.local.example .env.local
```
Poi compila i valori in `.env.local`

### 3. Crea progetto Sanity

Vai su [sanity.io](https://sanity.io) → crea account → nuovo progetto → copia il **Project ID**

```bash
# Installa Sanity CLI globalmente
npm install -g @sanity/cli

# Inizializza studio Sanity nella cartella sanity/
sanity init --project <YOUR_PROJECT_ID>
```

Poi incolla gli schemi da `src/lib/sanity/schemas.ts` nel tuo studio Sanity.

### 4. Configura Resend per le email

Vai su [resend.com](https://resend.com) → crea account gratuito → genera API key → incollala in `.env.local`

Cambia anche il dominio in `src/app/api/contact/route.ts`:
```ts
from: 'Studio <noreply@TUODOMINIO.com>',
to: ['hello@TUODOMINIO.com'],
```

### 5. Avvia in sviluppo
```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

---

## Deploy su Vercel

```bash
# Installa Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Poi aggiungi le variabili d'ambiente nella dashboard Vercel (Settings → Environment Variables).

**Costo finale: ~0€/mese** (dominio a parte, ~10-15€/anno)

---

## Struttura progetto

```
src/
├── app/
│   ├── layout.tsx          # Root layout + font
│   ├── page.tsx            # Homepage (assembla le sezioni)
│   ├── globals.css         # CSS globale + animazioni
│   └── api/
│       └── contact/
│           └── route.ts    # API endpoint form contatti
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero animato con GSAP
│   │   ├── MarqueeSection.tsx     # Ticker dei servizi
│   │   ├── ProjectsSection.tsx    # Griglia portfolio
│   │   ├── ServicesSection.tsx    # Lista servizi interattiva
│   │   ├── AboutSection.tsx       # Chi siamo + stats
│   │   └── ContactSection.tsx     # Form + email grossa
│   └── ui/
│       └── Cursor.tsx             # Cursor personalizzato
├── lib/
│   └── sanity/
│       ├── client.ts       # Client Sanity
│       ├── queries.ts      # Query GROQ per progetti e blog
│       └── schemas.ts      # Schemi Sanity (copia in sanity studio)
└── types/
    └── index.ts            # TypeScript types
```

---

## Personalizzazione rapida

### Cambia colori
In `src/app/globals.css`:
```css
:root {
  --accent: #c8f55a;       /* Verde acido → cambia qui */
  --accent-red: #ff4d1c;   /* Rosso hover */
}
```

### Cambia testi hero
In `src/components/sections/HeroSection.tsx`:
```tsx
<div className="hero-line-1">WE BUILD</div>    {/* Cambia qui */}
<div className="hero-line-2">digital</div>     {/* Cambia qui */}
<div className="hero-line-3">EXPERIENCES</div> {/* Cambia qui */}
```

### Aggiungi progetti (senza Sanity)
In `src/components/sections/ProjectsSection.tsx`, modifica `MOCK_PROJECTS`.

---

## Aggiungere pagine

### Pagina progetto singolo
Crea `src/app/projects/[slug]/page.tsx`

### Blog
Crea `src/app/blog/page.tsx` e `src/app/blog/[slug]/page.tsx`

---

## Licenza
Progetto privato — tutti i diritti riservati.
# studio-agency
