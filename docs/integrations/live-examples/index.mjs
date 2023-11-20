import remark from './remark.mjs'
import recast from 'recast'
import vite from './vite.mjs'
import mdx from '@astrojs/mdx'

/**
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function () {
  return {
    name: 'live-examples',
    hooks: {
      'astro:config:setup': ({ config, updateConfig }) => {
        updateConfig({
          integrations: [
            mdx({
              syntaxHighlight: 'shiki',
              shikiConfig: {
                theme: 'dracula',
              },
              remarkPlugins: [remark],
              recmaPlugins: [
                () => (tree) => {
                  console.log(
                    recast.print(tree, {
                      tabWidth: 2,
                      quote: 'single',
                    }),
                  )
                },
              ],
            }),
          ],
          vite: {
            plugins: [vite()],
          },
        })
      },
    },
  }
}
