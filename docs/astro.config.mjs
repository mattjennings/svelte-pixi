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
  markdown: {
    shikiConfig: {
      theme: codeTheme,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['pixi.js', 'svelte-pixi'],
    },
    resolve: {
      alias: {
        $lib: path.resolve(__dirname, './src'),

        'svelte-pixi': path.resolve(__dirname, '../src/lib'),
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
