/**
 * Sostituisce su Sanity gli articoli del blog con quelli canonici di
 * src/data/posts.ts: carica le cover da public/, converte i blocchi in
 * Portable Text e cancella i documenti `post` non più previsti.
 *
 * Uso:
 *   set -a; . ./.env.local; set +a
 *   node_modules/.bin/sanity exec scripts/sync-posts.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
import { posts, type PostBlock } from '../src/data/posts'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = getCliClient({ apiVersion: '2024-01-01' })

// I blocchi dell'app diventano blocchi Portable Text: h2/h3 come style,
// li come listItem 'bullet' dentro uno style normale.
function toPortableText(content: PostBlock[]) {
  return content.map((b, i) => {
    const base = {
      _type: 'block',
      _key: `b${i}`,
      markDefs: [],
      children: [{ _type: 'span', _key: `s${i}`, text: b.text, marks: [] }],
    }
    if (b.type === 'li') return { ...base, style: 'normal', listItem: 'bullet', level: 1 }
    return { ...base, style: b.type === 'p' ? 'normal' : b.type }
  })
}

async function run() {
  const keep: string[] = []

  for (const p of posts) {
    const existingId: string | null = await client.fetch(
      `*[_type=="post" && slug.current==$slug][0]._id`,
      { slug: p.slug }
    )
    const _id = existingId || `post-${p.slug}`
    keep.push(_id)

    let coverRef: string | undefined
    if (p.coverImage) {
      const buf = readFileSync(join(process.cwd(), 'public', p.coverImage))
      const filename = p.coverImage.split('/').pop() || `${p.slug}.jpg`
      const asset = await client.assets.upload('image', buf, { filename })
      coverRef = asset._id
    }

    const doc = {
      _id,
      _type: 'post',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      excerpt: p.excerpt,
      category: p.category,
      readTime: p.readTime,
      featured: p.featured,
      publishedAt: new Date(`${p.publishedAt}T09:00:00Z`).toISOString(),
      author: p.author,
      ...(coverRef ? { coverImage: { _type: 'image', asset: { _type: 'reference', _ref: coverRef } } } : {}),
      body: toPortableText(p.content),
    }

    await client.createOrReplace(doc)
    console.log(`ok  ${p.slug}  (${p.content.length} blocchi${coverRef ? ', cover' : ''})`)
  }

  // Via i vecchi articoli demo rimasti sul dataset.
  const stale: string[] = await client.fetch(`*[_type=="post" && !(_id in $keep)]._id`, { keep })
  for (const id of stale) {
    await client.delete(id)
    console.log('eliminato articolo obsoleto:', id)
  }

  console.log(`\nFatto: ${posts.length} articoli su Sanity, ${stale.length} rimossi.`)
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
