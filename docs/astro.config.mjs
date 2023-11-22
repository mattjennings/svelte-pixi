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
    resolve: {
      alias: {
        // in docs examples, we'll use $lib/components to point to /src/components
        // because this is the most familiar convention for svelte users
        '$lib/components': path.resolve(__dirname, './src/components'),

        // but we also need to alias $lib to svelte-pixi/src/liv so we can load from svelte-pixi
        // directly without building. so as long as $lib/components is not used in svelte-pixi,
        // this is OK.
        'svelte-pixi': path.resolve(__dirname, '../src/lib'),
        $lib: path.resolve(__dirname, '../src/lib'),
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
