const fs = require('fs')
const path = require('path')

function readPackage(pkg, ctx) {
  if (pkg.name) {
    // point svelte-pixi to ./package output for examples
    if (pkg.name.endsWith('-example') || pkg.name.startsWith('with-')) {
      const dir = path.resolve(__dirname, './package')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }

      pkg.dependencies['svelte-pixi'] = 'workspace:*'
    }

    // install peer as dev dependencies
    if (pkg.name === 'svelte-pixi') {
      pkg.devDependencies = {
        ...pkg.peerDependencies,
        ...pkg.devDependencies,
      }
    }
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
