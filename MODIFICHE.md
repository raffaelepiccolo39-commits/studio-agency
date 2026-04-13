# 🛠️ GUIDA ALLE MODIFICHE — Studio Agency

Questa guida ti dice **esattamente quale file aprire** per modificare ogni parte del sito.

---

## 📁 Struttura rapida

```
studio-agency/
│
├── 📄 package.json              ← dipendenze npm
├── 📄 .env.local.example        ← copia in .env.local e compila
│
└── src/
    ├── app/
    │   ├── 📄 layout.tsx        ← <head>, font, metadata SEO
    │   ├── 📄 page.tsx          ← homepage (assembla le sezioni)
    │   ├── 📄 globals.css       ← colori, font, animazioni base
    │   └── api/contact/
    │       └── 📄 route.ts      ← API email (Resend)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── 📄 Navbar.tsx    ← logo, voci menu, menu mobile
    │   │   └── 📄 Footer.tsx    ← link, copyright, social
    │   │
    │   └── sections/
    │       ├── 📄 HeroSection.tsx       ← testo grande, CTA
    │       ├── 📄 MarqueeSection.tsx    ← ticker servizi
    │       ├── 📄 ProjectsSection.tsx   ← griglia portfolio
    │       ├── 📄 ServicesSection.tsx   ← lista servizi
    │       ├── 📄 AboutSection.tsx      ← chi siamo, stats
    │       └── 📄 ContactSection.tsx    ← form + email
    │
    └── lib/sanity/
        └── 📄 queries.ts        ← query al CMS Sanity
```

---

## ✏️ MODIFICHE COMUNI

---

### 🔤 Cambiare il nome dell'agenzia

**File:** `src/components/layout/Navbar.tsx` → cerca `STUDIO©`
**File:** `src/components/layout/Footer.tsx` → cerca `STUDIO©`
**File:** `src/app/layout.tsx` → campo `title` nel metadata

---

### 🎨 Cambiare i colori

**File:** `src/app/globals.css`

```css
:root {
  --bg: #0a0a0a;          /* Sfondo principale */
  --surface: #111111;      /* Sfondo secondario */
  --border: #1e1e1e;       /* Bordi */
  --text: #f0ede6;         /* Testo principale */
  --muted: #555;           /* Testo secondario / grigio */
  --accent: #c8f55a;       /* ⭐ Colore principale (verde acido) */
  --accent-red: #ff4d1c;   /* Colore hover cursor */
}
```

Cambia `--accent` con qualsiasi colore HEX e tutto si aggiorna automaticamente.

---

### 🦸 Modificare il testo dell'Hero

**File:** `src/components/sections/HeroSection.tsx`

Cerca queste righe e modifica i testi:
```tsx
<div className="hero-line-1">WE BUILD</div>
<div className="hero-line-2">digital</div>       {/* ← questo è in corsivo */}
<div className="hero-line-3">EXPERIENCES</div>
```

E il sottotitolo:
```tsx
<p>Unifichiamo brand direction...</p>
```

E i pulsanti:
```tsx
<a href="#projects">Vedi Progetti</a>
<a href="#contact">Parliamo →</a>
```

---

### 📋 Cambiare i servizi nel marquee (ticker)

**File:** `src/components/sections/MarqueeSection.tsx`

```tsx
const items = [
  'Brand Direction',       // ← modifica questi
  'UX / UI Design',
  'Web Development',
  'Performance Marketing',
  'System Integration',
  'SEO & Analytics',
  'E-commerce',
]
```

---

### 🗂️ Aggiungere / modificare i progetti

**Senza Sanity** (subito, senza CMS):
**File:** `src/components/sections/ProjectsSection.tsx`

```tsx
const MOCK_PROJECTS = [
  {
    _id: '1',
    title: 'Nome Progetto',         // ← nome visualizzato
    slug: { current: 'nome-url' },  // ← URL della pagina
    platform: 'Shopify Plus',       // ← badge piattaforma
    services: ['UX/UI', 'Dev'],     // ← lista servizi
    coverColor: '#0f1a0a',          // ← colore sfondo se no immagine
    accentColor: '#c8f55a',         // ← colore accent del progetto
  },
  // aggiungi altri oggetti qui...
]
```

**Con Sanity** (produzione):
Vai su sanity.io → Studio → crea documento "Progetto" → carica immagine e compila campi.

---

### 🔧 Cambiare i servizi nella sezione servizi

**File:** `src/components/sections/ServicesSection.tsx`

```tsx
const services = [
  {
    id: 'a',
    name: 'BRAND DIRECTION',          // ← nome grande
    items: [                          // ← sottocategorie (appaiono sull'hover)
      'Brand Strategy',
      'Visual Identity',
      // aggiungi/rimuovi...
    ],
  },
  // aggiungi altri servizi...
]
```

---

### 👤 Modificare la sezione "Chi Siamo"

**File:** `src/components/sections/AboutSection.tsx`

- Anno fondazione → cerca `2024` e cambia
- Città → cerca `📍 Milano, Italia`
- Testo descrizione → cerca `Siamo un'agenzia digitale...`
- Statistiche → modifica l'array `stats`:

```tsx
const stats = [
  { num: '40+', label: 'Progetti completati' },
  { num: '12+', label: 'Anni di esperienza' },
  { num: '98%', label: 'Clienti soddisfatti' },
  { num: '3x',  label: 'ROI medio clienti' },
]
```

---

### 📧 Cambiare l'email di contatto

**File:** `src/components/sections/ContactSection.tsx`
```tsx
<a href="mailto:hello@tuostudio.com">hello@tuostudio.com</a>
```

**File:** `src/app/api/contact/route.ts`
```ts
from: 'Studio <noreply@TUODOMINIO.com>',
to: ['hello@TUODOMINIO.com'],          // ← dove arrivano le email
```

---

### 🔗 Cambiare i link social nel footer

**File:** `src/components/layout/Footer.tsx`

```tsx
{ label: 'Instagram', href: 'https://instagram.com/TUOPROFILO' },
{ label: 'LinkedIn',  href: 'https://linkedin.com/company/TUAAGENZIA' },
```

---

### 🏷️ Cambiare SEO / metadata

**File:** `src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Studio — Digital Agency',        // ← titolo tab browser
  description: 'La tua descrizione...',    // ← descrizione Google
}
```

---

### 🔢 Cambiare le voci del menu di navigazione

**File:** `src/components/layout/Navbar.tsx`

```tsx
const links = [
  { label: 'Progetti', href: '#projects' },
  { label: 'Servizi',  href: '#services' },
  { label: 'Chi Siamo', href: '#about' },
  { label: 'Contatti', href: '#contact' },
]
```

---

## 🚀 Avvio rapido in VSCode

```bash
# 1. Apri la cartella in VSCode
code studio-agency/

# 2. Apri il terminale integrato (Ctrl+` oppure Cmd+`)

# 3. Installa dipendenze
npm install

# 4. Copia il file ambiente
cp .env.local.example .env.local

# 5. Avvia il server di sviluppo
npm run dev

# 6. Apri nel browser
# → http://localhost:3000
```

Ogni volta che salvi un file, la pagina si aggiorna automaticamente! ⚡

---

## 📦 Build per produzione

```bash
npm run build    # controlla errori e ottimizza
npm start        # avvia in modalità produzione locale
```

---

## 🌐 Deploy su Vercel (gratuito)

```bash
# Installa Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (dalla cartella del progetto)
vercel

# Segui le istruzioni → in 2 minuti il sito è online
```

Poi torna su vercel.com → Settings → Environment Variables
e aggiungi le stesse variabili che hai in `.env.local`.

---

*Hai domande su una sezione specifica? Chiedimi pure!*
