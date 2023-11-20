import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import remarkExamples, {
  EXAMPLE_MODULE_PREFIX,
} from './remark-svelte-example.mjs'
import recast from 'recast'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [examplesVite()],
    resolve: {
      alias: {
        'svelte-pixi': path.resolve(__dirname, '../src/lib'),
        $lib: path.resolve(__dirname, '../src/lib'),
        $src: path.resolve(__dirname, './src'),
      },
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'dracula',
      },
      // remarkPlugins: [plug],
      remarkPlugins: [remarkExamples],
      recmaPlugins: [
        () => (tree) => {
          console.log(
            recast.print(tree, {
              tabWidth: 2,
              quote: 'single',
            }),
          )
        },
      ],
    }),
    starlight({
      title: 'My Docs',
      customCss: ['./src/tailwind.css'],
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              link: '/guides/example/',
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference',
          },
        },
      ],
    }),
    svelte({
      extensions: ['.svelte'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
function examplesVite() {
  const virtualFiles = new Map()

  /**
   * @type {import('vite').Plugin}
   */
  return {
    name: 'astro-examples',
    resolveId(id) {
      if (id.includes(EXAMPLE_MODULE_PREFIX) && id.includes('?src=')) {
        const [name, srcAttr] = id.split('?src=')

        // decode from base64
        const src = Buffer.from(srcAttr, 'base64').toString('utf8')
        virtualFiles.set(name, src)
        return name
      }
    },
    load(id) {
      if (virtualFiles.has(id)) {
        return virtualFiles.get(id)
      }
    },
    handleHotUpdate(ctx) {
      const { server } = ctx
      const modules = []
      const extensions = ['.md', '.mdx']

      // return virtual file modules for parent file
      if (extensions.some((ext) => ctx.file.endsWith(ext))) {
        const files = [...virtualFiles.entries()]
        files
          .map(([id, file]) => ({
            id,
            parent: id.split(EXAMPLE_MODULE_PREFIX)[0],
            updated: file.updated,
          }))
          .filter((file) => {
            return ctx.file.endsWith(file.parent)
          })
          .forEach((file) => {
            const mod = server.moduleGraph.getModuleById(file.id)
            if (mod) {
              modules.push(
                mod,
                ...mod.clientImportedModules,
                ...mod.ssrImportedModules,
              )
            }
          })
      }
      return [...modules, ...ctx.modules]
    },
  }
}
