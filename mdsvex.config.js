import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import sveld from 'mdsvex-sveld'
import examples from 'mdsvexamples'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'

const config = defineConfig({
  layout: {
    _: './src/lib/site/mdsvex.svelte',
  },
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [
    [examples, { defaults: { Wrapper: '/src/lib/site/Example.svelte' } }],
    sveld,
  ],

  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap',
      },
    ],
  ],
})

export default config
