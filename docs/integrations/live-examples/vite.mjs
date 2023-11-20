import { EXAMPLE_MODULE_PREFIX } from './remark.mjs'
import MagicString from 'magic-string'
export const virtualFiles = new Map()
/**
 * @returns {import('vite').Plugin}
 */
export default function liveExamplesVitePlugin() {
  return {
    name: 'live-examples',
    resolveId(id) {
      if (id.includes(EXAMPLE_MODULE_PREFIX)) {
        return id
      }
    },
    async load(id) {
      if (virtualFiles.has(id)) {
        const s = new MagicString(virtualFiles.get(id))

        return {
          code: s.toString(),
          map: s.generateMap({
            source: id,
            file: `${id}.map`,
            includeContent: true,
          }),
        }
      }
    },
    handleHotUpdate(ctx) {
      const { server } = ctx
      const modules = []
      const extensions = ['.md', '.mdx']

      // return virtual file modules for parent file
      if (extensions.some((ext) => ctx.file.endsWith(ext))) {
        const files = [...virtualFiles.entries()]
        files
          .map(([id, file]) => ({
            id,
            parent: id.split(EXAMPLE_MODULE_PREFIX)[0],
            updated: file.updated,
          }))
          .filter((file) => {
            return ctx.file.endsWith(file.parent)
          })
          .forEach((file) => {
            const mod = server.moduleGraph.getModuleById(file.id)
            if (mod) {
              modules.push(
                mod,
                ...mod.clientImportedModules,
                ...mod.ssrImportedModules,
              )
            }
          })
      }
      return [...modules, ...ctx.modules]
    },
  }
}
