import getParentContainer from './getParentContainer'

/**
 * Adds a PIXI instance to the nearest stage/container in the svelte tree
 *
 * @returns {function} removes instance from stage/container
 */
export default function addPixiInstance(self) {
  const parent = getParentContainer()

  if (parent) {
    parent.addChild(self)

    return () => {
      parent && parent.removeChild(self)
    }
  } else {
    throw new Error('Unable to find container or stage')
  }
}
