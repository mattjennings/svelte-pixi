import path from 'path'
import {
  Project,
  type Symbol as MorphSymbol,
  type JSDocableNode,
  ScriptTarget,
  SymbolFlags,
} from 'ts-morph'

const project = new Project({
  tsConfigFilePath: path.resolve(process.cwd(), '../tsconfig.json'),
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
})

export function parseComponent(name: string) {
  const componentPath = path.resolve(process.cwd(), '../dist/svelte-5', name)

  const sourceFile = project.addSourceFileAtPath(
    componentPath.replace('.d.ts', '') + '.d.ts',
  )

  let propsSymbols: MorphSymbol[] = []

  // try to parse svelte class declarations (when they use generics)
  const componentClass = sourceFile.getClass('__sveltets_Render')
  if (componentClass) {
    const componentProps = componentClass.getInstanceMethod('props')
    if (!componentProps) {
      throw new Error('No instance method named "props" found')
    }

    const returnType = componentProps.getReturnType()

    propsSymbols = returnType.getProperties()
  }

  // try to parse svelte.Component
  const varStatements = sourceFile.getVariableDeclarations()
  for (const v of varStatements) {
    const initializerType = v.getType()
    const text = initializerType.getText()

    if (text.startsWith('import("svelte").Component<')) {
      const typeArgs = initializerType.getTypeArguments()
      if (typeArgs.length) {
        const propsType = typeArgs[0] // first generic of svelte Component, which is props

        const p = propsType.getProperties()

        if (p) {
          propsSymbols = p
          break
        }
      }
    }
  }

  const instanceSymbol = propsSymbols
    .find((s) => s.getName() === 'instance')
    ?.getDeclarations()[0]
    ?.getType()
    ?.getUnionTypes()
    ?.find((u) => !u.isUndefined() && !u.isNull())
    ?.getConstraint()
    ?.getSymbol()

  const props: Array<ReturnType<typeof getPropsData>> = []
  const snippets: Array<ReturnType<typeof getPropsData>> = []

  for (const propSymbol of propsSymbols) {
    const info = getPropsData(propSymbol)
    if (info.isSnippet) {
      snippets.push(info)
    } else {
      props.push(info)
    }
  }

  return {
    props: props.sort((a, b) => {
      if (a.isRequired && !b.isRequired) return -1
      if (!a.isRequired && b.isRequired) return 1

      return a.name.localeCompare(b.name)
    }),
    snippets: snippets.sort((a, b) => {
      if (a.isRequired && !b.isRequired) return -1
      if (!a.isRequired && b.isRequired) return 1

      return a.name.localeCompare(b.name)
    }),
    instance: {
      name: instanceSymbol?.getName() || '',
      description: (
        instanceSymbol?.getValueDeclaration() as JSDocableNode | undefined
      )
        ?.getJsDocs()
        .map((t) => t.getCommentText() || '')
        .join('\n'),
    },
  }
}

function getPropsData(symbol: MorphSymbol): {
  name: string
  type: string[]
  description: string
  isSnippet?: boolean
  isEvent?: boolean
  isRequired?: boolean
} {
  let decl = symbol.getValueDeclaration()
  if (!decl) {
    const [firstDecl] = symbol.getDeclarations()
    if (firstDecl) decl = firstDecl
  }

  if (!decl) {
    const aliasedSymbol = symbol.getAliasedSymbol()
    if (aliasedSymbol) {
      let aliasDecl = aliasedSymbol.getValueDeclaration()
      if (!aliasDecl) {
        const [firstAliasDecl] = aliasedSymbol.getDeclarations()
        if (firstAliasDecl) aliasDecl = firstAliasDecl
      }
      if (aliasDecl) decl = aliasDecl
    }
  }

  if (!decl) {
    return { name: symbol.getName(), type: ['unknown'], description: '' }
  }

  const name = symbol.getName()
  const jsDocs = (decl as any as JSDocableNode).getJsDocs?.()

  let unions = decl
    .getType()
    .getUnionTypes()
    .map((t) => t.getText())

  // remove true | false unions with boolean
  if (unions.includes('true') && unions.includes('false')) {
    unions.push('boolean')
    unions = unions.filter((t) => t !== 'true' && t !== 'false')
  }

  if (unions.length === 0) {
    unions = [decl.getType().getText()]
  }

  const type = unions
    .map((t) => t.replace(/import\(.*?\/node_modules\/pixi\.js.*?"\)/g, 'PIXI'))
    .map((t) => t.replace(/import\(.*?\/node_modules\/@pixi.*?"\)/g, 'PIXI'))
    .map((t) => t.replace(/import\("svelte"\)\.Snippet/g, 'Snippet'))
    // replace points with PointLike, unsure why they dont get picked up
    .flatMap((t) => {
      if (t === 'PIXI.Point' || t === 'PIXI.ObservablePoint') {
        return [
          'number',
          '[number, number]',
          '{ x: number; y: number }',
          'PIXI.Point',
        ]
      }

      return t
    })
    .filter((t) => t !== 'undefined')

  const isEvent = name.startsWith('on')
  const isSnippet = type.some((t) => t.startsWith('Snippet'))

  // must check original symbol to make sure we're checking the prop and not the alias
  const isRequired = !isSymbolOptional(symbol)

  return {
    isSnippet,
    isEvent,
    type,
    name,
    description:
      jsDocs?.map((doc) => doc.getCommentText() || '').join('\n') || '',
    isRequired,
  }
}

function isSymbolOptional(symbol: MorphSymbol): boolean {
  const decl = symbol.getValueDeclaration() || symbol.getDeclarations()[0]
  if (!decl) return false

  const type = decl.getType()
  if (type.isUnion()) {
    if (type.getUnionTypes().some((t) => t.isUndefined())) {
      return true
    }
  }

  return (symbol.getFlags() & SymbolFlags.Optional) !== 0
}
