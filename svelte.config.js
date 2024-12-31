import { sveltePreprocess } from 'svelte-preprocess'

const config = {
  extensions: ['.svelte'],
  preprocess: [
    sveltePreprocess({
      typescript: true,
      sourceMap: true,
    }),
    svelte4(),
  ],
}

// svelte 5 preserves these but it breaks svelte 4 preprocessor by
// causing it to preprocess when installed via pnpm... i dont know why/how,
// but this fixes it and they dont need to be there in svelte 4 anyways
function svelte4() {
  const { script, style, markup } = sveltePreprocess({
    replace: [
      [/lang="ts"/g, ''],
      [/generics=".*"/g, ''],
    ],
  })

  return {
    markup: async (...args) => {
      const { filename, content } = args[0]
      if (filename.includes('svelte-4')) {
        return await markup(...args)
      }
      return { code: content }
    },
    script,
    style,
  }
}

export default config
