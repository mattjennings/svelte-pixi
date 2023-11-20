import remark from './remark.mjs'
import recast from 'recast'
import vite from './vite.mjs'
import mdx from '@astrojs/mdx'

/**
 * @typedef {{
 * layout?: string
 * wrapper?: string
 * theme?: string
 * commonMeta?: string
 * }} LiveExamplesOptions
 */

/**
 *
 * @param {LiveExamplesOptions} options
 * @returns {import('astro').AstroIntegration}
 */
export default function (options) {
  return {
    name: 'live-examples',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          integrations: [
            mdx({
              syntaxHighlight: 'shiki',
              shikiConfig: {
                theme: 'dracula',
              },
              remarkPlugins: [[remark, options]],
              recmaPlugins: [
                () => (tree) => {
                  console.log(
                    recast.prettyPrint(tree, {
                      tabWidth: 2,
                      quote: 'single',
                    }),
                  )
                },
              ],
            }),
          ],
          vite: {
            plugins: [vite(options)],
          },
        })
      },
    },
  }
}
