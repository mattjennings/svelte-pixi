import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import liveExamples from './integrations/live-examples/index.mjs'
import vercel from '@astrojs/vercel/static'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const codeTheme = 'poimandres'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: codeTheme,
    },
  },
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
      expressiveCode: false,
      social: {
        github: 'https://github.com/mattjennings/svelte-pixi',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'API',
          items: [
            {
              label: 'Components',
              autogenerate: {
                directory: 'api/components',
              },
            },
          ],
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: {
                directory: 'guides/migrations',
              },
            },
          ],
        },
      ],
    }),
    svelte({
      extensions: ['.svelte'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
