import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      'pixi.js': 'src/pixi.js',
    },
  },
  optimizeDeps: {
    include: ['pixi.js'],
  },
})
