const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  preprocess: sveltePreprocess({
    sourceMap: true,
    typescript: {
      compilerOptions: {
        sourceMap: true,
        inlineSources: true,
      },
    },
  }),
}
