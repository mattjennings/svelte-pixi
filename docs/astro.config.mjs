import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import liveExamples from './integrations/live-examples/index.mjs'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const codeTheme = 'poimandres'

// https://astro.build/config
export default defineConfig({
  site: 'https://svelte-pixi.mattjennin.gs',
  markdown: {
    shikiConfig: {
      theme: codeTheme,
    },
  },
  vite: {
    optimizeDeps: {
      exclude:
        process.env.NODE_ENV === 'production' ? ['pixi.js', 'svelte-pixi'] : [],
    },
    resolve: {
      alias: {
        $lib: path.resolve(__dirname, './src'),

        'svelte-pixi': path.resolve(__dirname, '../src/lib'),
      },
    },
  },
  integrations: [
    starlight({
      title: 'Svelte Pixi',
      customCss: ['./src/tailwind.css'],
      expressiveCode: {
        themes: [codeTheme],
      },
      social: {
        github: 'https://github.com/mattjennings/svelte-pixi',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en', // lang is required for root locales
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          collapsed: true,
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'API',
          items: [
            {
              label: 'Components',
              collapsed: true,
              autogenerate: {
                directory: 'api/components',
              },
            },
            {
              label: 'Utilities',
              collapsed: true,
              autogenerate: {
                directory: 'api/utilities',
              },
            },
          ],
        },
        {
          label: 'Guides',
          collapsed: true,
          items: [
            {
              label: 'Animation with svelte/motion',
              link: '/guides/animation',
            },
            {
              label: 'Binding props',
              link: '/guides/binding-props',
            },
            {
              label: 'Optimizing performance',
              link: '/guides/optimizing-performance',
            },
            {
              label: 'Reducing bundle size',
              link: '/guides/reducing-bundle-size',
            },
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: {
                directory: 'guides/migrations',
              },
            },
          ],
        },
        {
          label: 'Older Versions',
          items: [
            {
              label: 'v0.1.3 (PixiJS v6)',
              link: 'https://v0.svelte-pixi.mattjennin.gs',
            },
          ],
        },
      ],
    }),
    liveExamples({
      commonMeta: 'client:only',
      wrapper: '/src/layouts/examples/wrappers/WithApp.svelte',
    }),
    svelte({
      extensions: ['.svelte'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
