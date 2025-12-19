import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import parser from 'svelte-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/*.cjs',
      '.vercel/**',
      '**/.svelte-kit/**',
      '**/dist/**',
      '**/build/**',
      '.DS_Store',
      'node_modules',
      '/build',
      '/public',
      '/.svelte-kit',
      '/package',
      '.env',
      '.env.*',
      '!.env.example',
      '.vercel_build_output',
      '.vercel/output',
      '.parcel-cache',
      'docs/.astro',
      'docs/.vercel',
      'docs/dist',
      'pnpm-lock.yaml',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        GlobalMixins: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        extraFileExtensions: ['.svelte'],
      },
    },

    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^\\$\\$(Props|Events|Slots|Generic)$',
          ignoreRestSiblings: true,
        },
      ],

      'svelte/no-at-html-tags': 'off',

      'svelte/valid-compile': [
        'error',
        {
          ignoreWarnings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      // this is not properly recognizing state_referenced_locally
      // probably need to update everything and redo svelte eslint config
      'svelte/no-unused-svelte-ignore': 'off',
    },
  },
]
