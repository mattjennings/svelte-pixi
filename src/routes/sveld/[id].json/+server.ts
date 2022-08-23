import type { RequestHandler } from '@sveltejs/kit'
import { ComponentParser } from 'sveld'
import path from 'path'
import sveltePreprocess from 'svelte-preprocess'
import * as svelte from 'svelte/compiler'

const raw = Object.entries(
  import.meta.glob('../../../lib/*.svelte', {
    as: 'raw',
    eager: true,
  })
).reduce(
  (acc, [filepath, mod]) => ({
    ...acc,
    [path.parse(filepath).name]: mod,
  }),
  {}
)

export const GET: RequestHandler = async ({ params }) => {
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

  return new Response(
    JSON.stringify({
      ...data,
      props: data.props.sort((a, b) => a.name.localeCompare(b.name)),
      slots: data.slots.sort((a, b) => {
        if (a.default) return -1
        if (b.default) return 1
        return a.name!.localeCompare(b.name!)
      }),
      events: data.events.sort((a, b) => a.name.localeCompare(b.name)),
      typedefs: data.typedefs.sort((a, b) => a.name.localeCompare(b.name)),
    })
  )
}
