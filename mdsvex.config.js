import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import sveld from 'mdsvex-sveld'

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [sveld],

  rehypePlugins: [],
})

export default config
