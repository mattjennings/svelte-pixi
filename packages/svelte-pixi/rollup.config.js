import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from '@rollup/plugin-commonjs'
import execute from 'rollup-plugin-execute'
import pkg from './package.json'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      plugins: [
        // generate type definitions and process .svelte files
        // (we do it here so we only run this once)
        execute([
          'tsc --outDir ./dist --declaration',
          'node scripts/preprocess.js'
        ])
      ]
    },
    { file: pkg.main, format: 'umd', name, sourcemap: true }
  ],
  plugins: [
    builtins(),
    svelte({
      preprocess: sveltePreprocess()
    }),
    resolve(),
    typescript(),
    commonjs()
  ]
}
