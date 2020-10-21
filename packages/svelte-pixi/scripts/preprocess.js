const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const svelte = require('svelte/compiler')
const sveltePreprocess = require('svelte-preprocess')

const basePath = path.resolve(__dirname, '../')
const srcPath = path.resolve(basePath, 'src')
const distPath = path.resolve(basePath, 'dist')

/**
 * This will process .svelte files into plain javascript so consumers do not have to setup Typescript to use this library
 */
async function main() {
  // get all .svelte files
  glob(path.join(srcPath, '**/*.svelte'), null, async function (err, files) {
    if (err) throw err
    // process them
    await Promise.all(files.map((filePath) => preprocessSvelte(filePath)))
  })

  // move .d.ts files into /dist/ts
  glob(path.join(distPath, '**/*.d.ts'), null, async function (err, files) {
    if (err) throw err
    const tsPath = path.join(distPath, 'ts')

    await Promise.all(
      files.map(async (filePath) => {
        if (!filePath.includes(tsPath)) {
          await fs.move(filePath, filePath.replace(distPath, tsPath), {
            overwrite: true,
          })
        }
      })
    )
  })
}

async function preprocessSvelte(src) {
  const srcCode = await fs.readFile(src, { encoding: 'utf-8' })
  let { code } = await svelte.preprocess(
    srcCode,
    sveltePreprocess({
      // unfortunately, sourcemap on .svelte files sometimes comments out the </script> tag
      // so we need to disable sourcemapping for them
      sourceMap: false,
      typescript: {
        compilerOptions: {
          sourceMap: false,
        },
      },
    }),
    {
      filename: src,
    }
  )

  // remove lang=ts from processed .svelte files
  code = code.replace(/script lang="ts"/g, 'script')

  const relativePath = src.split(srcPath)[1]
  const destination = path.join(distPath, src.split(srcPath)[1])

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

main()
