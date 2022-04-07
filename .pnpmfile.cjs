function readPackage(pkg) {
  // point svelte-pixi to ./package output for examples
  if (pkg.name.endsWith('-example')) {
    pkg.dependencies['svelte-pixi'] = 'file:../../package'
  }

  if (pkg.name === 'svelte-pixi') {
    pkg.devDependencies = {
      ...pkg.peerDependencies,
      ...pkg.devDependencies,
    }
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
