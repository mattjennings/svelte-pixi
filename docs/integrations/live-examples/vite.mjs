import { EXAMPLE_MODULE_PREFIX } from './remark.mjs'

export const virtualFiles = new Map()
export default function liveExamplesVitePlugin() {
  /**
   * @type {import('vite').Plugin}
   */
  return {
    name: 'live-examples',
    resolveId(id) {
      if (id.includes(EXAMPLE_MODULE_PREFIX)) {
        return id
      }
    },
    load(id) {
      if (virtualFiles.has(id)) {
        return virtualFiles.get(id)
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
