import type { RequestHandler } from '@sveltejs/kit'
import path from 'path'

export interface Link {
  title: string
  href?: string
  base?: string
  links?: Link[]
}

const order = [
  '/docs/intro',
  '/docs/components',
  '/docs/animation',
  '/docs/advanced',
]

// group /docs pages into categories (by folder) of links
const links = Object.entries(import.meta.globEager('./docs/**/*.svx'))
  .reduce((acc, [filepath, mod]) => {
    const href = filepath.slice(1)
    const { dir: base, ext } = path.parse(href)

    const link = {
      href: href.replace(ext, ''),
      title: mod.metadata?.title,
    }

    if (!acc.find((link) => link.base === base)) {
      const { name } = path.parse(base)
      // use folder name as category title
      const title = toCapitalizedWords(name)

      acc.push({
        title,
        base,
        links: [link],
      })
      return acc
    } else {
      const parent = acc.find((link) => link.base === base)
      parent.links.push(link)
      return acc
    }
  }, [])
  .sort((a, b) => order.indexOf(a.base) - order.indexOf(b.base))

function toCapitalizedWords(name) {
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.substring(1)

  const words = name.match(/[A-Za-z][a-z]*/g) || []

  return words.map(capitalize).join(' ')
}

export const get: RequestHandler = async () => {
  return {
    status: 200,
    body: links,
  }
}
