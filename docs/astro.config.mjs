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
    starlight({
      title: 'My Docs',
      customCss: ['./src/tailwind.css'],
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
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
