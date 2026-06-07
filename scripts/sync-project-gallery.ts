/**
 * Carica su Sanity le immagini gallery (da public/, elencate in src/data/projects.ts)
 * di UN progetto e ne aggiorna il campo `gallery`.
 *
 * Uso:
 *   SLUG=maestri-cotonieri NEXT_PUBLIC_SANITY_PROJECT_ID=fwuvugpl NEXT_PUBLIC_SANITY_DATASET=production \
 *   node_modules/.bin/sanity exec scripts/sync-project-gallery.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
import { projects } from '../src/data/projects'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = getCliClient({ apiVersion: '2024-01-01' })
const slug = process.env.SLUG || 'maestri-cotonieri'

async function run() {
  const p = projects.find((x) => x.slug === slug)
  if (!p) throw new Error('Progetto non trovato nel mock: ' + slug)

  const id: string | null = await client.fetch(`*[_type=="project" && slug.current==$slug][0]._id`, { slug })
  if (!id) throw new Error('Documento Sanity non trovato: ' + slug)

  const gallery: any[] = []
  let i = 0
  for (const rel of p.immagini) {
    const filePath = join(process.cwd(), 'public', rel)
    const buf = readFileSync(filePath)
    const filename = rel.split('/').pop() || `img-${i}.jpg`
    const asset = await client.assets.upload('image', buf, { filename })
    gallery.push({ _type: 'image', _key: `g${i}`, asset: { _type: 'reference', _ref: asset._id } })
    console.log(`uploaded [${i + 1}/${p.immagini.length}]:`, filename)
    i++
  }

  await client.patch(id).set({ gallery }).commit()
  console.log(`\nGallery aggiornata per "${slug}": ${gallery.length} immagini.`)
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
