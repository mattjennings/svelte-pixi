import path from 'path'

export interface Link {
  title: string
  href: string
  order?: number
}
export interface Category {
  title: string
  base: string
  links: Link[]
}

const order = [
  '/docs/getting-started',
  '/docs/components',
  '/docs/utilities',
  '/docs/animation',
  '/docs/advanced',
]

// group /docs pages into categories (by folder) of links
const links = Object.entries(
  import.meta.glob('../docs/**/+page.svx', { eager: true })
)
  .reduce((acc: Category[], [filepath, mod]) => {
    const href = filepath.slice(2, -10)

    const { dir: base, ext } = path.parse(href)

    const link = {
      href: href.replace(ext, ''),
      title: (mod as any).metadata?.title,
      order: (mod as any).metadata?.order,
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
      if (parent?.links) {
        parent.links.push(link)
      }
      return acc
    }
  }, [])
  .map((category) => {
    category.links.sort((a, b) => {
      const aOrder = a.order ?? 0
      const bOrder = b.order ?? 0

      if (aOrder || bOrder) {
        return aOrder - bOrder
      }

      return a.title.localeCompare(b.title)
    })
    return category
  })
  .sort((a, b) => order.indexOf(a.base) - order.indexOf(b.base))

function toCapitalizedWords(name) {
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.substring(1)

  const words = name.match(/[A-Za-z][a-z]*/g) || []

  return words.map(capitalize).join(' ')
}

export const GET = async () => {
  return new Response(JSON.stringify(links))
}
