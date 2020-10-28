module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'no-unused-vars': 'warn',
  },
  settings: {
    // ...
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
}
