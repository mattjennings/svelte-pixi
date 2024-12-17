import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@astrojs/tailwind'
import liveCode from 'astro-live-code'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: 'https://svelte-pixi.mattjennin.gs',
  // markdown: {
  //   shikiConfig: {
  //     theme: codeTheme,
  //   },
  // },
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
      title: 'SveltePixi',
      customCss: ['./src/tailwind.css'],
      expressiveCode: {
        themes: ['poimandres', 'material-theme-lighter'],
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

      tableOfContents: {
        minHeadingLevel: 1,
        maxHeadingLevel: 6,
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'Releases',
          autogenerate: {
            directory: 'releases',
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
          ],
        },
        {
          label: 'Older Documentation',
          collapsed: true,
          items: [
            {
              label: 'v0.1.3 (PixiJS v6)',
              link: 'https://v0.svelte-pixi.mattjennin.gs',
            },
          ],
        },
      ],
    }),
    liveCode({
      defaultProps: {
        'client:only': 'svelte',
      },
      layout: '/src/layouts/examples/ExampleLayout.astro',
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
