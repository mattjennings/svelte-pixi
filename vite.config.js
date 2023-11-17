import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import sveld from 'vite-plugin-sveld'
import path from 'path'
import { fileURLToPath } from 'url'
import examples from 'mdsvexamples/vite'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

export default defineConfig({
  plugins: [
    // https://github.com/sveltejs/svelte/issues/9288#issuecomment-1748034687
    {
      resolveId(id) {
        if (id === 'css-tree') {
          return require.resolve('./node_modules/css-tree/dist/csstree.esm.js')
        }
      },
    },
    sveltekit(),
    sveld(),
    examples,
  ],
  ssr: {
    external: ['sveld', 'svelte-preprocess'],
  },
  optimizeDeps: {
    exclude: ['sveld', 'svelte-preprocess'],
  },
  resolve: {
    alias: {
      'svelte-pixi': path.resolve(__dirname, './src/lib'),
      '$lib-site': path.resolve(__dirname, './src/lib-site'),
    },
  },
})
