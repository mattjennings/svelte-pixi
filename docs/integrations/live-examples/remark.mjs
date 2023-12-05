import { visitParents as unistVisit } from 'unist-util-visit-parents'
import { visit as estreeVisit } from 'estree-util-visit'
import { virtualFiles } from './virtual-files.mjs'
import path from 'path'

export const EXAMPLE_COMPONENT_PREFIX = 'AstroExample_'

/**
 *
 * @param {import('./index.mjs').LiveExamplesOptions} options
 * @returns
 */
export default function examples(options) {
  return function transformer(tree, file) {
    let examples = []

    ensureImport(tree, { from: 'astro:components', name: 'Code' })

    unistVisit(tree, 'code', (node, parents) => {
      const parent = parents[parents.length - 1]
      const childIndex = parent.children.indexOf(node)

      if (node.meta && node.meta.split(' ').includes('live')) {
        const meta = node.meta

        const src = node.value
        const i = examples.length

        const parentId = toPOSIX(
          file.history[0].split(process.cwd())[1].slice(1),
        )
        const mdFilename = toPOSIX(
          path.basename(parentId, path.extname(parentId)),
        )

        const exampleComponentName = EXAMPLE_COMPONENT_PREFIX + i
        const filename = toPOSIX(
          `${parentId.replace(
            path.extname(parentId),
            '',
          )}-${exampleComponentName}.${node.lang}`,
        )

        const layout = toPOSIX(getLayoutPathFromMeta(meta) || options.layout)
        const layoutName = layout === options.layout ? 'Example' : `Example${i}`

        const wrapper = toPOSIX(getWrapperPathFromMeta(meta) || options.wrapper)
        const wrapperFilename = wrapper
          ? filename.replace(`.${node.lang}`, `.w.${node.lang}`)
          : null

        examples.push({ filename, src })
        virtualFiles.set(filename, {
          src,
          parent: parentId,
          updated: Date.now(),
        })

        if (wrapper) {
          virtualFiles.set(wrapperFilename, {
            src: createWrapperSrc({
              lang: node.lang,
              inner: filename,
              outer: wrapper,
            }),
            parent: parentId,
            updated: Date.now(),
          })
        }

        ensureImport(tree, {
          default: true,
          name: exampleComponentName,
          from: wrapper ? wrapperFilename : filename,
        })

        ensureImport(tree, {
          from: layout,
          name: layoutName,
          default: true,
        })

        const codeNode = { ...node }

        const props = {
          ...(options?.defaultProps ?? {}),
          ...parsePropsFromString(meta),
        }

        const commonPropAttributes = [
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
          // filename of the markdown file
          {
            type: 'mdxJsxAttribute',
            name: 'filename',
            value: mdFilename,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'ExampleComponent',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Identifier',
                        name: exampleComponentName,
                      },
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          },
        ]

        const componentPropAttributes = [
          ...commonPropAttributes,
          ...propsToJSXAttributes(props),
        ]

        const layoutPropAttributes = [
          ...commonPropAttributes,
          {
            type: 'mdxJsxAttribute',
            name: 'componentProps',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: valueToEstreeExpression(
                        // filter out client:xyz props
                        Object.entries(props).reduce((acc, [key, value]) => {
                          if (key.startsWith('client:')) {
                            return acc
                          }

                          acc[key] = value

                          return acc
                        }, {}),
                      ),
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          },
        ]

        node = {
          type: 'mdxJsxFlowElement',
          name: layoutName,
          data: { _mdxExplicitJsx: true, _example: true },
          attributes: layoutPropAttributes,
          children: [
            {
              type: 'mdxJsxFlowElement',
              name: 'slot',
              data: { _mdxExplicitJsx: true },
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'slot',
                  value: 'example',
                },
              ],
              children: [
                {
                  type: 'mdxJsxFlowElement',
                  name: exampleComponentName,
                  attributes: componentPropAttributes,
                  children: [],
                },
              ],
            },
            {
              type: 'mdxJsxFlowElement',
              name: 'slot',
              data: { _mdxExplicitJsx: true },
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'slot',
                  value: 'code',
                },
              ],
              children: [codeNode],
            },
          ],
        }

        parent.children.splice(childIndex, 1, node)
      }
    })
  }
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

function propsToJSXAttributes(props) {
  return Object.entries(props ?? {}).map(([key, value]) => {
    const type = typeof value
    const isArray = Array.isArray(value)

    switch (type) {
      case 'string':
      case 'number':
      case 'boolean':
        return {
          type: 'mdxJsxAttribute',
          name: key,
          value,
        }
      case 'object':
        if (isArray) {
          return {
            type: 'mdxJsxAttribute',
            name: key,
            value: {
              type: 'mdxJsxAttributeValueExpression',
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: valueToEstreeExpression(value),
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          }
        } else {
          return {
            type: 'mdxJsxAttribute',
            name: key,
            value: {
              type: 'mdxJsxAttributeValueExpression',
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: valueToEstreeExpression(value),
                    },
                  ],
                  sourceType: 'module',
                },
              },
            },
          }
        }
      default:
        throw new Error(`Unsupported prop type: ${type}`)
    }
  }, [])
}

function valueToEstreeExpression(value) {
  const type = typeof value
  const isArray = Array.isArray(value)

  switch (type) {
    case 'string':
    case 'number':
    case 'boolean':
      return {
        type: 'Literal',
        value,
      }
    case 'object':
      if (isArray) {
        return {
          type: 'ArrayExpression',
          elements: value.map(valueToEstreeExpression),
        }
      } else {
        return {
          type: 'ObjectExpression',
          properties: Object.entries(value).map(([key, value]) => {
            return {
              type: 'Property',
              kind: 'init',
              key: {
                type: 'Identifier',
                name: key,
              },
              value: valueToEstreeExpression(value),
            }
          }),
        }
      }
  }
}

function parsePropsFromString(string) {
  const regex = /props={{(.*?)}}/g
  const matches = []
  let match

  while ((match = regex.exec(string)) !== null) {
    matches.push(match[1])
  }

  // Check if a match is found
  if (matches.length) {
    // Use the Function constructor to create a function that returns the "props" object
    const getProps = new Function(`return {${matches.join(' ')}}`)

    // Call the function to get the parsed "props" object
    const props = getProps()

    return props
  } else {
    // Return null if no match is found
    return null
  }
}

function getLayoutPathFromMeta(meta) {
  const part = meta.split(' ').find((part) => part.startsWith('layout='))

  if (part) {
    return part.split('=')[1]
  }
}

function getWrapperPathFromMeta(meta) {
  const part = meta.split(' ').find((part) => part.startsWith('wrapper='))

  if (part) {
    return part.split('=')[1]
  }
}

function toPOSIX(path) {
  if (!path) return path

  return path.replace(/\\/g, '/')
}

function createWrapperSrc({ lang, inner, outer }) {
  switch (lang) {
    case 'svelte':
      return `\
<script>
    import Inner from ${JSON.stringify(inner)}
    import Outer from ${JSON.stringify(outer)}
</script>

<Outer {...$$restProps}>    
    <Inner {...$$restProps}/>
</Outer>`
    case 'jsx':
      return `\
import Inner from ${JSON.stringify(inner)}
import Outer from ${JSON.stringify(outer)}

export default (props) => <Outer {...props}><Inner {...props} /></Outer>`
    case 'vue':
      // TODO: verify, i just used copilot for this
      return `\
<script>
import Inner from ${JSON.stringify(inner)}
import Outer from ${JSON.stringify(outer)}

export default {
    components: {
        Inner,
        Outer
    },
    props: {
        ...Outer.props,
        ...Inner.props
    },
    render() {
        return <Outer {...this.$props}><Inner /></Outer>
    }    
}`
  }
}
