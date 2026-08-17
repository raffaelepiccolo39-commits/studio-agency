/**
 * Genera il file NDJSON per popolare Sanity dai dati locali.
 *
 *   npx tsx scripts/generate-sanity-seed.ts
 *   npx sanity dataset import sanity/seed.ndjson production
 *
 * Le immagini sono referenziate via `_sanityAsset` con percorso assoluto ai
 * file in /public: l'import le carica come asset (nessun token necessario).
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { projects } from '../src/data/projects'
import { posts, type PostBlock } from '../src/data/posts'
import { servizi } from '../src/data/servizi'
import { siteSettings } from '../src/data/site'
import { pagine } from '../src/data/pagine'

const ROOT = process.cwd()
const PUBLIC = join(ROOT, 'public')
const OUT_DIR = join(ROOT, 'sanity')
const OUT = join(OUT_DIR, 'seed.ndjson')
// Secondo file con i SOLI documenti introdotti dopo il primo popolamento.
// Serve per non reimportare progetti e articoli, che su Sanity esistono già e
// potrebbero essere stati modificati dallo Studio: reimportarli li sovrascrive.
const OUT_NUOVI = join(OUT_DIR, 'seed-nuovi-contenuti.ndjson')
const TIPI_NUOVI = ['service', 'siteSettings', 'pagina']

const key = (prefix: string, i: number) => `${prefix}${i.toString(36)}`

function imageRef(publicPath: string, i: number) {
  const abs = resolve(PUBLIC, '.' + publicPath) // publicPath inizia con "/"
  return { _type: 'image', _key: key('img', i), _sanityAsset: `image@file://${abs}` }
}

const docs: any[] = []
const missing: string[] = []

for (const p of projects) {
  const gallery = (p.immagini ?? []).map((src, i) => {
    const abs = resolve(PUBLIC, '.' + src)
    if (!existsSync(abs)) missing.push(src)
    return imageRef(src, i)
  })

  docs.push({
    _id: `project-${p.slug}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    platform: p.platform,
    services: p.services,
    color: p.color,
    accent: p.accent,
    year: p.year,
    cliente: p.cliente,
    descrizione: p.descrizione,
    sfida: p.sfida,
    soluzione: p.soluzione,
    risultati: (p.risultati ?? []).map((r, i) => ({ _key: key('kpi', i), label: r.label, value: r.value })),
    ...(gallery.length ? { gallery } : {}),
    ...(p.seo
      ? {
          seo: {
            metaTitle: p.seo.metaTitle,
            metaDescription: p.seo.metaDescription,
            settore: p.seo.settore,
            approccio: p.seo.approccio,
            processo: p.seo.processo,
            ...(p.seo.testimonial
              ? { testimonial: { testo: p.seo.testimonial.testo, autore: p.seo.testimonial.autore, ruolo: p.seo.testimonial.ruolo } }
              : {}),
          },
        }
      : {}),
  })
}

function toPortableText(content: PostBlock[]) {
  return content.map((b, i) => ({
    _type: 'block',
    _key: key('blk', i),
    style: b.type === 'h2' ? 'h2' : 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key('spn', i), text: b.text, marks: [] }],
  }))
}

for (const post of posts) {
  docs.push({
    _id: `post-${post.slug}`,
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    featured: post.featured,
    publishedAt: new Date(post.publishedAt + 'T09:00:00.000Z').toISOString(),
    author: { name: post.author.name, role: post.author.role },
    body: toPortableText(post.content),
  })
}


// ── Servizi ───────────────────────────────────────────────────────────────────
servizi.forEach((s, i) => {
  docs.push({
    _id: `service-${s.id}`,
    _type: 'service',
    ordine: i + 1,
    titoloRiga1: s.titolo[0],
    titoloRiga2: s.titolo[1],
    voci: s.voci,
    paragrafi: s.paragrafi,
    immagine: imageRef(s.immagine, 900 + i),
  })
})

// ── Pagine (SEO + intestazione) ───────────────────────────────────────────────
pagine.forEach((pg) => {
  docs.push({
    _id: `pagina-${pg.percorso === '/' ? 'home' : pg.percorso.slice(1)}`,
    _type: 'pagina',
    percorso: pg.percorso,
    titoloSeo: pg.titoloSeo,
    descrizioneSeo: pg.descrizioneSeo,
    ...(pg.intestazione ? { intestazione: pg.intestazione } : {}),
  })
})

// ── Impostazioni sito (singleton: _id fisso, come si aspetta lo Studio) ───────
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  ragioneSociale: siteSettings.ragioneSociale,
  nomeCommerciale: siteSettings.nomeCommerciale,
  email: siteSettings.email,
  telefoni: siteSettings.telefoni.map((t, i) => ({ _key: key('tel', i), ...t })),
  whatsapp: siteSettings.whatsapp,
  indirizzo: siteSettings.indirizzo,
  partitaIva: siteSettings.partitaIva,
  social: siteSettings.social,
  trustpilot: siteSettings.trustpilot,
})

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT, docs.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8')

const nuovi = docs.filter((d) => TIPI_NUOVI.includes(d._type))
writeFileSync(OUT_NUOVI, nuovi.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8')

console.log(`✓ Scritti ${docs.length} documenti in ${OUT}`)
console.log(`✓ Scritti ${nuovi.length} documenti (solo i contenuti nuovi) in ${OUT_NUOVI}`)
console.log(`  (${projects.length} progetti, ${posts.length} articoli, ${servizi.length} servizi, ${pagine.length} pagine, 1 impostazioni sito)`)
if (missing.length) {
  console.warn(`\n⚠ ${missing.length} immagini referenziate ma non trovate in /public:`)
  missing.forEach((m) => console.warn('   ' + m))
  console.warn('  Verranno saltate dall\'import. Controlla i percorsi.')
}
