import type { RequestHandler } from '@sveltejs/kit'
import { ComponentParser } from 'sveld'
import path from 'path'
import sveltePreprocess from 'svelte-preprocess'
import * as svelte from 'svelte/compiler'

const raw = Object.entries(
  import.meta.globEager('../../lib/*.svelte', {
    as: 'raw',
  })
).reduce(
  (acc, [filepath, mod]) => ({
    ...acc,
    [path.parse(filepath).name]: mod,
  }),
  {}
)

export const get: RequestHandler = async ({ params }) => {
  const { id } = params
  const { code } = await svelte.preprocess(raw[id], sveltePreprocess(), {
    filename: id,
  })
  const data = new ComponentParser({
    verbose: false,
  }).parseSvelteComponent(code, {
    filePath: id,
    moduleName: id,
  })

  return {
    status: 200,
    body: JSON.stringify(data),
  }
}
