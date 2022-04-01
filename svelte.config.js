import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import sveld from 'vite-plugin-sveld'
import path from 'path'
import { fileURLToPath } from 'url'
import examples from 'mdsvexamples/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: vercel(),
    package: {
      files: (file) => !file.includes('website'),
    },
    vite: {
      ssr: {
        // external: ['@pixi/core'],
      },
      optimizeDeps: {
        // include: ['@pixi/core'],
      },
      resolve: {
        alias: {
          'svelte-pixi': path.resolve(__dirname, './src/lib'),
        },
      },
      plugins: [sveld(), examples],
    },
  },
}

export default config