const esbuild = require('esbuild')
const path = require('path')
const { performance } = require('perf_hooks')
const { green, red, cyan } = require('kleur')
const fs = require('fs-extra')
const outdir = path.join(__dirname, '../dist')
const start = performance.now()
const chokidar = require('chokidar')
const svelte = require('svelte/compiler')
const sveltePreprocess = require('svelte-preprocess')
const glob = require('glob')
const ts = require('typescript')

const basePath = path.resolve(__dirname, '../')
const srcPath = path.resolve(basePath, 'src')
const distPath = path.resolve(basePath, 'dist')

build()

async function build() {
  const componentBuilder = await esbuild.build({
    platform: 'browser',
    format: 'esm',
    bundle: false,
    incremental: process.env.NODE_ENV !== 'production',
    outdir,
    entryPoints: getTypescriptEntrypoints(),
    sourcemap: true,
    loader: { '.svelte': 'file' },
  })

  generateTypes({ dir: srcPath })
  copySvelteFiles()

  console.log(green(`Built in ${Math.floor(performance.now() - start)}ms`))

  if (process.env.NODE_ENV !== 'production') {
    chokidar
      .watch(srcPath, {
        ignoreInitial: true,
        ignored: '**/*.spec.ts',
      })
      .on('add', async (filePath) => {
        if (filePath.endsWith('.svelte')) {
          await copySvelteFile(filePath)
        } else if (filePath.endsWith('.ts')) {
          generateTypes({ file: filePath })
          await componentBuilder.rebuild()
        }
        console.log(green(`added ${cyan(filePath)}`))
      })
      .on('change', async (filePath) => {
        if (filePath.endsWith('.svelte')) {
          await copySvelteFile(filePath)
        } else if (filePath.endsWith('.ts')) {
          generateTypes({ file: filePath })
          await componentBuilder.rebuild()
        }
        console.log(green(`Rebuilt ${cyan(filePath)}`))
      })

    process.on('exit', () => {
      if (componentBuilder.stop) {
        componentBuilder.stop()
      }
    })
  }
}

/**
 * Gets all .ts files in src/components for entrypoints
 * so esbuild keeps them as separate files
 */
function getTypescriptEntrypoints(dir = path.resolve(__dirname, '../src')) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() && dirent.name !== '__mocks__'
      ? getTypescriptEntrypoints(res)
      : res
  })

  return files
    .flat()
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.spec.ts'))
}

/**
 * Generates types for .ts files and puts them in dist/components/ts
 */
function generateTypes({ dir, file } = {}) {
  // Extract configuration from config file
  let config = getTsConfig({ dir, file })

  // Compile
  let program = ts.createProgram(config.fileNames, {
    ...config.options,
    skipLibCheck: true,
    noEmit: false,
    emitDeclarationOnly: true,
    declaration: true,
    rootDir: './src',
    outDir: './dist/ts',
  })
  let emitResult = program.emit()

  // Report errors
  reportDiagnostics(
    ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
  )
}

/**
 * Processes .svelte file and writes it to /dist, also copies the original .svelte file to /dist/ts
 */
async function copySvelteFile(filePath) {
  const srcCode = await fs.readFile(filePath, { encoding: 'utf-8' })
  let { code } = await svelte.preprocess(
    srcCode,
    sveltePreprocess(require('../svelte.config.js').preprocess),
    {
      filename: filePath,
    }
  )

  // remove lang=ts from processed .svelte files
  code = code.replace(/script lang="ts"/g, 'script')

  const relativePath = filePath.split(srcPath)[1]
  const destination = path.join(distPath, filePath.split(srcPath)[1])

  // write preprocessed svelte file to /dist
  await fs.ensureFile(destination)
  await fs.writeFile(destination, code, { encoding: 'utf-8' })

  // write the unprocessed svelte component to /dist/ts/ so we can have correct types for ts users
  const tsDest = path.join(distPath, 'ts', relativePath)
  await fs.ensureFile(tsDest)
  await fs.writeFile(tsDest, srcCode, {
    encoding: 'utf-8',
  })
}

/**
 *
 */
async function copySvelteFiles() {
  glob(path.join(srcPath, '**/*.svelte'), null, async function (err, files) {
    if (err) throw err
    await Promise.all(files.map((filePath) => copySvelteFile(filePath)))
  })
}

function reportDiagnostics(diagnostics) {
  let isError = false
  diagnostics.forEach((diagnostic) => {
    let message = 'Error'
    isError = true
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      )
      message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1})`
    }
    message +=
      ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
    console.error(red(message))
  })

  if (process.env.NODE_ENV === 'production' && isError) {
    process.exit(1)
  }
}

function getTsConfig({ dir, file }) {
  const configFileName = path.resolve(process.cwd(), 'tsconfig.json')

  // Read config file
  const configFileText = fs.readFileSync(configFileName).toString()

  // Parse JSON, after removing comments. Just fancier JSON.parse
  const result = ts.parseConfigFileTextToJson(configFileName, configFileText)
  const configObject = result.config
  if (!configObject) {
    reportDiagnostics([result.error])
    process.exit(1)
  }

  // Extract config infromation
  const configParseResult = ts.parseJsonConfigFileContent(
    {
      ...configObject,
      include: dir ? [`${dir}/**/*.ts`] : [file],
      exclude: ['**/*.spec.*', '**/test-utils/**/*.ts'],
    },
    ts.sys,
    path.dirname(configFileName)
  )
  if (configParseResult.errors.length > 0) {
    reportDiagnostics(configParseResult.errors)
    process.exit(1)
  }
  return configParseResult
}
