import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import sveld from 'vite-plugin-sveld'
import path from 'path'
import { fileURLToPath } from 'url'
import examples from 'mdsvexamples/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [sveltekit(), sveld(), examples],
  ssr: {
    external: ['sveld', 'svelte-preprocess'],
  },
  optimizeDeps: {
    exclude: ['sveld', 'svelte-preprocess'],
  },
  resolve: {
    alias: {
      'svelte-pixi': path.resolve(__dirname, './src/lib'),
    },
  },
})
