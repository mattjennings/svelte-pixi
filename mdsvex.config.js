import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import sveld from 'mdsvex-sveld'
import examples from 'mdsvexamples'

const config = defineConfig({
  layout: {
    _: './src/lib/website/mdsvex.svelte',
  },
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [
    [examples, { ExampleComponent: '/src/lib/website/Example.svelte' }],
    sveld,
  ],

  rehypePlugins: [],
})

export default config
