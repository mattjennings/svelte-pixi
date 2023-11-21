import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import liveExamples from './integrations/live-examples/index.mjs'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        'svelte-pixi': path.resolve(__dirname, '../src/lib'),
        $lib: path.resolve(__dirname, '../src/lib'),
        $src: path.resolve(__dirname, './src'),
      },
    },
    dedupe: ['svelte-pixi', 'pixi.js'],
  },
  integrations: [
    liveExamples({
      commonMeta: 'client:only',
      wrapper: '/src/layouts/examples/wrappers/WithApp.svelte',
    }),
    starlight({
      title: 'Svelte Pixi',
      customCss: ['./src/tailwind.css'],
      social: {
        github: 'https://github.com/mattjennings/svelte-pixi',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'API',
          items: [
            {
              label: 'Components',
              autogenerate: { directory: 'api/components' },
            },
          ],
        },

        {
          label: 'Guides',
          items: [
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: { directory: 'guides/migrations' },
            },
          ],
        },
      ],
      expressiveCode: false,
    }),

    svelte({
      extensions: ['.svelte'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
