import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import svelte from '@astrojs/svelte'
import examples from 'mdsvexamples/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import remarkExamples from './remark-svelte-example.mjs'
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
      shikiConfig: { theme: 'dracula' },
      // remarkPlugins: [plug],
      remarkPlugins: [remarkExamples],
      recmaPlugins: [
        () => (tree) => {
          // console.log(recast.print(tree, { tabWidth: 2, quote: 'single' }))
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
      extensions: ['.svelte', '.svx', '.svelte'],
      preprocess: mdsvex(mdsvexConfig),
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
    name: 'my-plugin', // required, will show up in warnings and errors
    resolveId(id) {
      if (id.includes(`?src=`)) {
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
  }
}
