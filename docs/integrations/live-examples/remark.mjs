import { visitParents as unistVisit } from 'unist-util-visit-parents'
import { visit as estreeVisit } from 'estree-util-visit'

export const EXAMPLE_MODULE_PREFIX = '___astro_example___'
export const EXAMPLE_COMPONENT_PREFIX = 'AE___'

/**
 * @typedef {{
 * layout?: string
 * theme?: string
 * }} Options
 */

/**
 *
 * @param {Options} options
 * @returns
 */
export default function examples(
  options = {
    layout: '/src/components/ExampleLayout.astro',
    wrapper: '/src/components/ExampleWrapper.svelte',
  },
) {
  return function transformer(tree, file) {
    let examples = []

    ensureImport(tree, { from: 'astro:components', name: 'Code' })

    unistVisit(tree, 'code', (node, parents) => {
      const parent = parents[parents.length - 1]
      const childIndex = parent.children.indexOf(node)

      if (node.meta && node.meta.includes('example')) {
        const mainFilename = toPOSIX(file.history[0]).split('/').pop()
        const filename = `${mainFilename}${EXAMPLE_MODULE_PREFIX}${examples.length}.${node.lang}`

        const layout = getLayoutPathFromMeta(node.meta) || options.layout
        const layoutName =
          layout === options.layout ? 'Example' : `Example${examples.length}`

        const wrapper = getWrapperPathFromMeta(node.meta) || options.wrapper

        examples.push({ filename, src: node.value })

        ensureImport(tree, {
          from: layout,
          name: layoutName,
          default: true,
        })

        // base64 encode src
        const src = Buffer.from(node.value).toString('base64')
        const exampleComponentName = EXAMPLE_COMPONENT_PREFIX + examples.length
        ensureImport(tree, {
          default: true,
          name: exampleComponentName,
          from: `${filename}?src=${src}`,
        })

        node = {
          type: 'mdxJsxFlowElement',
          name: layoutName,
          data: { _mdxExplicitJsx: true, _example: true },
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'src',
              value: node.value,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'lang',
              value: node.lang,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'filename',
              value: filename,
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
            {
              type: 'mdxJsxAttribute',
              name: 'meta',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'ArrayExpression',
                          elements: node.meta.split(' ').map((value) => ({
                            type: 'Literal',
                            value,
                          })),
                        },
                      },
                    ],
                    sourceType: 'module',
                  },
                },
              },
            },
          ],
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
                  attributes: [
                    ...(node.meta.includes('client:load')
                      ? [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'client:load',
                            value: 'true',
                          },
                        ]
                      : []),
                    ...(node.meta.includes('client:idle')
                      ? [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'client:idle',
                            value: 'true',
                          },
                        ]
                      : []),
                    ...(node.meta.includes('client:visible')
                      ? [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'client:visible',
                            value: 'true',
                          },
                        ]
                      : []),
                    ...(node.meta.includes('client:only')
                      ? [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'client:only',
                            value: node.lang,
                          },
                        ]
                      : []),
                    ...(node.meta.includes('client:media')
                      ? [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'client:media',
                            value: node.meta
                              .split(' ')
                              .find((m) => m.startsWith('client:media'))
                              .split('=')[1],
                          },
                        ]
                      : []),
                  ],
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
              children: [
                {
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
                  data: {
                    _mdxExplicitJsx: true,
                    _src: node.value,
                  },
                },
              ],
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
  return path.replace(/\\/g, '/')
}
