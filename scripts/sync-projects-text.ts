/**
 * Sincronizza i testi dei progetti (descrizione, sfida, soluzione) da
 * src/data/projects.ts verso i documenti Sanity, patchando per slug.
 *
 * Uso:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=fwuvugpl NEXT_PUBLIC_SANITY_DATASET=production \
 *   npx sanity exec scripts/sync-projects-text.ts --with-user-token
 *
 * Ripetibile/idempotente: rilancialo dopo aver aggiornato i testi nel file dati.
 */
import { getCliClient } from 'sanity/cli'
import { projects } from '../src/data/projects'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function run() {
  let patched = 0
  for (const p of projects) {
    const id: string | null = await client.fetch(
      `*[_type=="project" && slug.current==$slug][0]._id`,
      { slug: p.slug }
    )
    if (!id) {
      console.log('SKIP (nessun doc Sanity):', p.slug)
      continue
    }
    await client
      .patch(id)
      .set({
        descrizione: p.descrizione,
        sfida: p.sfida,
        soluzione: p.soluzione,
      })
      .commit({ autoGenerateArrayKeys: true })
    patched++
    console.log('patched:', p.slug)
  }
  console.log(`\nFatto. Documenti aggiornati: ${patched}/${projects.length}`)
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
