const fs = require('fs-extra')
const glob = require('glob')
const move = require('glob-move')
const path = require('path')
const svelte = require('svelte/compiler')
const sveltePreprocess = require('svelte-preprocess')

/**
 * This will process .svelte files into plain javascript so consumers do not have to setup Typescript to use this library
 *
 * Additionally, it will copy .d.ts files back into /src so Typescript users still get the correct types for .svelte files
 */
async function main() {
  const basePath = path.resolve(__dirname, '../')
  const srcPath = path.resolve(basePath, 'src')
  const destPath = path.resolve(basePath, 'dist')

  // get all .svelte files
  glob(path.join(srcPath, '**/*.svelte'), null, async function(err, files) {
    if (err) throw err

    // process them
    await Promise.all(
      files.map(filePath =>
        preprocessSvelte(
          filePath,
          path.join(destPath, filePath.split(srcPath)[1])
        )
      )
    )

    // move .d.ts files back into /src
    await move(path.join(destPath, '**/*.d.ts'), path.join(srcPath))
  })
}

async function preprocessSvelte(src, dest) {
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
          outDir: './dist',
          declaration: true
        }
      }
    }),
    {
      filename: src
    }
  )

  // remove lang=ts from processed .svelte files
  code = code.replace('script lang="ts"', 'script')

  await fs.ensureFile(dest)
  await fs.writeFile(dest, code, { encoding: 'utf-8' })
}

main()
