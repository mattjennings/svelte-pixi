import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    // required so svelte-pixi will use pixi.js alias
    exclude: ['svelte-pixi'],
  },
  resolve: {
    alias: {
      'pixi.js': '/src/pixi.js',
    },
  },
})
