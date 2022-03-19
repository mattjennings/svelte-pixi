import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import sveld from 'vite-plugin-sveld'
import path from 'path'
import { fileURLToPath } from 'url'

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
    adapter: adapter(),
    package: {
      files: (file) => !file.includes('website'),
    },
    vite: {
      resolve: {
        alias: {
          'svelte-pixi': path.resolve(__dirname, './src/lib'),
        },
      },
      plugins: [sveld()],
    },
  },
}

export default config
