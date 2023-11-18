import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ['pixi.js', '../../../src/lib'],
  },
  resolve: {
    alias: {
      'pixi.js': 'src/pixi.js',
      $lib: '../../../src/lib',
    },
  },
})
