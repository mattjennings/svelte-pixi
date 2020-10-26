import marked from 'marked'
import fs from 'fs-extra'
import { PROPS_CMP } from './../../constants'
import { getRealImportedPath } from './../../utils'
import { getInterface } from './parser'
import sveltePreprocess from 'svelte-preprocess'
import svelte from 'svelte/compiler'

import('svelte/register')

export default (content, params, name) => async () => {
  let props = []
  if (!/[|\n]/.test(content) && /\//.test(content)) {
    const filepath = getRealImportedPath(content.trim())

    if (filepath) {
      const source = fs.readFileSync(filepath, { encoding: 'utf-8' })
      const { code } = await svelte.preprocess(
        source,
        sveltePreprocess({
          sourceMap: false,
          typescript: {
            compilerOptions: {
              sourceMap: false,
            },
          },
        }),
        {
          filename: filepath,
        }
      )
      props = getInterface(code)
    }
  } else {
    props = content
      .split('\n')
      .map((line) => line.split('|').map((cell) => cell.trim())) //<3 <3 <3 Love will save the World !
      .filter((line) => !(line.length < 3))
      .map((line) => {
        return { name: line[0], description: line[1], attr: line[2] }
      })
      .map((line) => {
        const parsed = /([^\(\)]+)(\((.+)\))?/.exec(line.attr)

        line.attr = {
          default: parsed[3],
          types: parsed[1].split('/').map((type) => {
            type = type.trim()
            type = type.split(',').map((i) => i.trim())
            return type.length === 1 ? type[0] : type
          }),
        }

        line.description = marked(line.description).replace(/<\/?p>\n?/g, '')

        return line
      })
  }

  const App = require(PROPS_CMP).default
  const { html } = App.render({ data: props, ...params })
  return html
}
