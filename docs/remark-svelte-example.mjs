import { visitParents as unistVisit } from 'unist-util-visit-parents'
import { visit as estreeVisit } from 'estree-util-visit'
import path from 'upath'
import { fileURLToPath } from 'url'

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// regex to find <script> block in svelte
const RE_SCRIPT_START =
  /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/
const RE_SCRIPT_BLOCK = /(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/g
const RE_STYLE_BLOCK = /(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/g

// parses key=value pairs from a string. supports strings, numbers, booleans, and arrays
const RE_PARSE_META = /(\w+=\d+|\w+="[^"]*"|\w+=\[[^\]]*\]|\w+)/g

export const EXAMPLE_MODULE_PREFIX = '___astro_example___'
export const EXAMPLE_COMPONENT_PREFIX = 'AE___'

/**
 * @typedef {{
 * theme?: string
 * }} Options
 */

/**
 *
 * @param {Options} options
 * @returns
 */
export default function examples(options = {}) {
  return function transformer(tree, file) {
    const examples = processExamples(tree, options)

    const generatedFiles = examples.map((example, i) => {
      const filename = `${EXAMPLE_MODULE_PREFIX}${i}.svelte`
      const src = example.data._src

      return {
        filename,
        src,
      }
    })

    generatedFiles.forEach((file, i) => {
      // base64 encode src
      const src = Buffer.from(file.src).toString('base64')
      ensureImport(tree, {
        default: true,
        name: EXAMPLE_COMPONENT_PREFIX + i,
        from: `${file.filename}?src=${src}`,
      })
    })
  }
}

/**
 *
 * @param {*} tree
 * @param {Options} options
 */
function processExamples(tree, options) {
  let examples = []

  ensureImport(tree, { from: 'astro:components', name: 'Code' })

  // find all code blocks and turn into <Code src={content} lang={lang} />
  unistVisit(tree, 'code', (node, parents) => {
    const parent = parents[parents.length - 1]
    const childIndex = parent.children.indexOf(node)

    if (node.meta && node.meta.includes('example')) {
      node = {
        type: 'mdxJsxFlowElement',
        name: 'Code',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'code',
            value: node.value,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'lang',
            value: node.lang,
          },
          ...(options.theme
            ? [
                {
                  type: 'mdxJsxAttribute',
                  name: 'theme',
                  value: options.theme,
                },
              ]
            : []),
        ],
        children: [],
        data: { _mdxExplicitJsx: true, _codeBlock: true, _src: node.value },
      }

      parent.children.splice(childIndex, 1, node)

      examples.push(node)
    }
  })

  // console.log(tree)

  unistVisit(tree, 'mdxJsxFlowElement', (node, parents) => {
    if (node.name === 'div') {
      // console.log(node)
    }
  })

  return examples
}

function ensureImport(tree, imp) {
  let importExists = false

  unistVisit(tree, 'mdxjsEsm', (node) => {
    estreeVisit(node.data.estree, (node) => {
      if (node.type === 'ImportDeclaration') {
        if (node.source.value === imp.from) {
          if (
            imp.default &&
            node.specifiers.find((s) => s.local.name === imp.default)
          ) {
            importExists = true
          }
          if (
            imp.name &&
            node.specifiers.find((s) => s.imported.name === imp.name)
          ) {
            importExists = true
          }
        }
      }
    })
  })

  if (!importExists) {
    tree.children.push({
      type: 'mdxjsEsm',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: imp.default
                    ? 'ImportDefaultSpecifier'
                    : 'ImportSpecifier',
                  imported: {
                    type: 'Identifier',
                    name: imp.name,
                  },
                  local: {
                    type: 'Identifier',
                    name: imp.name,
                  },
                },
              ],
              source: {
                type: 'Literal',
                value: imp.from,
              },
            },
          ],
        },
      },
    })
  }
}

function old(options = {}) {
  const { defaults = {} } = options

  return function transformer(tree, file) {
    let examples = []
    unist.visit(tree, 'code', (node) => {
      const languages = ['svelte', 'html']
      /**
       * @type {Record<string, any>}
       */
      const meta = {
        Wrapper: path.resolve(_dirname, 'Example.svelte'),
        cwd: file.cwd,
        ...defaults,
        ...parseMeta(node.meta || ''),
      }
      const { csr, example, Wrapper } = meta

      // find svelte code blocks with meta to trigger example
      if (example && languages.includes(node.lang)) {
        const value = createExampleComponent(node.value, meta, examples.length)
        examples.push({ csr, Wrapper: meta.Wrapper || Wrapper, value })
        node.type = 'paragaph'
        node.children = [
          {
            type: 'text',
            value,
          },
        ]
        delete node.lang
        delete node.meta
        delete node.value
      }
    })

    console.log(examples)
    // // add imports for each generated example
    // let imports = []
    // examples.forEach((example, i) => {
    //   const imp =
    //     typeof example.Wrapper === 'string'
    //       ? `import Example from "${example.Wrapper}"`
    //       : `import { ${example.Wrapper[1]} as Example } from "${example.Wrapper[0]}"`
    //   if (!imports.includes(imp)) {
    //     imports.push(imp)
    //   }
    //   if (!example.csr) {
    //     imports.push(
    //       `import ${EXAMPLE_COMPONENT_PREFIX}${i} from "${EXAMPLE_MODULE_PREFIX}${i}.svelte"`,
    //     )
    //   }
    // })
    // unist.visit(tree, 'mdxFlowExpression', (node) => {
    //   estree.visit(node.data.estree, (node) => {
    //     if (node.value === 'abc') {
    //       node.raw = "'hello'"
    //     }
    //   })
    // })
    // imports.forEach((imp) => {
    //   tree.children.unshift({
    //     type: 'mdxjsEsm',
    //     value: imp,
    //   })
    // })
    // tree.children.push({
    //   type: 'mdxFlowExpression',
    //   value: 'console.log("hello world")',
    // })
  }
}

function parseMeta(meta) {
  const result = {}
  const meta_parts = meta.match(RE_PARSE_META) ?? []

  for (let i = 0; i < meta_parts.length; i++) {
    const [key, value = 'true'] = meta_parts[i].split('=')

    try {
      result[key] = JSON.parse(value)
    } catch (e) {
      const error = new Error(
        `Unable to parse meta \`${key}=${value}\` - ${e.message}`,
      )
      error.stack = e.stack
      throw error
    }
  }

  return result
}

function formatCode(code, meta) {
  if (meta.hideScript) {
    code = code.replace(RE_SCRIPT_BLOCK, '')
  }

  if (meta.hideStyle) {
    code = code.replace(RE_STYLE_BLOCK, '')
  }

  // remove leading/trailing whitespace and line breaks
  return code.replace(/^\s+|\s+$/g, '')
}

function createExampleComponent(value, meta, index) {
  const mdsvexampleComponentName = `${EXAMPLE_COMPONENT_PREFIX}${index}`

  const code = formatCode(value, meta)

  const props = {
    src: `String.raw\`${escape(code)}\``,
    meta: escape(JSON.stringify(meta)),
  }

  return `<Example
						src={${props.src}}
						meta={${props.meta}}
					>
						<slot slot="example">${`<${mdsvexampleComponentName} />`}</slot
			</Example>`
}

function toPOSIX(path) {
  return path.replace(/\\/g, '/')
}

function escape(src) {
  const res = src.replace(/`/g, '\\`').replace(/\$\{/g, '\\$\\{')
  return res
}

function unescape(src) {
  const res = src.replace(/\\`/g, '`').replace(/\\\$\\\{/g, '${')
  return res
}
