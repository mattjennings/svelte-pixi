import MagicString from 'magic-string'
import { virtualFiles } from './virtual-files.mjs'

/**
 * @returns {import('vite').Plugin}
 */
export default function liveExamplesVitePlugin() {
  return {
    name: 'live-examples',
    resolveId(id) {
      if (virtualFiles.has(id)) {
        return id
      }
    },
    async load(id) {
      if (virtualFiles.has(id)) {
        const s = new MagicString(virtualFiles.get(id).src)

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
            parent: file.parent,
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
