import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({})],
  test: {
    browser: {
      name: 'chromium',
      provider: 'playwright',
      enabled: true,
    },
  },
  // Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
  resolve: process.env.VITEST
    ? {
        conditions: ['browser'],
      }
    : undefined,
})
