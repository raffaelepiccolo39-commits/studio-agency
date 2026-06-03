# Setup & Migrazione Sanity — runbook

Lo scaffold del CMS è completo e il sito funziona **sui dati locali (mock)** finché
Sanity non è configurato: `src/lib/sanity/queries.ts` fa fallback automatico ai
dati in `src/data/`. Niente si rompe in nessun momento.

Questi sono i passi **interattivi** (richiedono il tuo login) per attivare Sanity.

## 1. Login + creazione progetto

```bash
cd ~/Desktop/studio-agency
npx sanity login          # apre il browser
npx sanity init           # crea il progetto su sanity.io
#  → "Create new project", nome: "Pira Web", dataset: production (public)
#  → quando chiede di aggiungere config/output: NON sovrascrivere i file esistenti
```

`init` stampa il **Project ID**. Annotalo.

## 2. Variabili d'ambiente (locale)

Crea `.env.local` (vedi `.env.local.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Da questo momento `isSanityConfigured()` diventa `true` e le query leggono da Sanity
(con fallback ai mock se il dataset è ancora vuoto).

## 3. Migrazione contenuti (15 progetti + 4 articoli)

```bash
npx tsx scripts/generate-sanity-seed.ts        # rigenera sanity/seed.ndjson
npx sanity dataset import sanity/seed.ndjson production
```

L'import carica anche le immagini dei progetti da `/public` (via `_sanityAsset`).
Verifica su `http://localhost:3000/studio` (dopo `npm run dev`).

## 4. Deploy env su Vercel

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production   # incolla il valore
vercel env add NEXT_PUBLIC_SANITY_DATASET production       # production
vercel env add NEXT_PUBLIC_SANITY_API_VERSION production   # 2024-01-01
```

(ripeti per `preview`/`development` se vuoi parità).

## 5. Swap dei consumer (passo successivo, lato codice)

Finché non fatto, le pagine leggono ancora i mock locali. Lo swap consiste nel far
leggere a queste pagine `getProjects()/getProjectBySlug()/getPosts()/getPostBySlug()`:

- `src/app/progetti/page.tsx` → fetch e passa a `ProgettiClient` come prop
- `src/app/progetti/[slug]/page.tsx` (server async + generateStaticParams da Sanity)
- `src/components/sections/ProjectsSection.tsx` (riceve i progetti come prop)
- `src/app/blog/page.tsx` e `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`

Il fallback garantisce che lo swap non rompa nulla anche a dataset vuoto.

## Note

- Schema progetti = superset lossless dei case study (sfida/soluzione/seo/testimonial).
- Schema blog allineato alle pagine (categoria, readTime, featured, autore, body).
- `@sanity/client` è a v6; `next-sanity` v9 suggerisce v7 (solo warning di peer).
```
