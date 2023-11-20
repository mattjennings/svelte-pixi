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
  },
  integrations: [
    liveExamples({
      commonMeta: 'client:only',
    }),
    starlight({
      title: 'My Docs',
      customCss: ['./src/tailwind.css'],
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Components',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Animated Sprite',
              link: '/components/animated-sprite',
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference',
          },
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
