import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      // ssr: {
      //   external: ['@pixi/polyfill', 'es6-promise-polyfill'],
      // },
      // optimizeDeps: {
      //   exclude: ['@pixi/polyfill', 'es6-promise-polyfill'],
      // },
    },
  },
}

export default config
