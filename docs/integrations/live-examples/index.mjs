import remark from './remark.mjs'
import vite from './vite.mjs'
import recast from 'recast'

/**
 * @typedef {{
 * layout?: string
 * wrapper?: string
 * commonMeta?: string
 * }} LiveExamplesOptions
 */

/**
 *
 * @param {LiveExamplesOptions} options
 * @returns {import('astro').AstroIntegration}
 */
export default function (options) {
  Object.assign(
    options,
    {
      // TODO: replace with :components alias?
      layout: '/src/layouts/examples/ExampleLayout.astro',
    },
    { ...options },
  )

  return {
    name: 'live-examples',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [[remark, options]],
          },
          vite: {
            plugins: [vite(options)],
          },
        })
      },
    },
  }
}
