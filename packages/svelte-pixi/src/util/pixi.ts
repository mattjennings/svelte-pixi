import { getContext } from 'svelte'
import type PIXI from 'pixi.js'
import { warning } from './helpers'

/**
 * Adds a PIXI instance to the nearest container in the svelte tree
 *
 * @returns {function} removes instance from container
 */
export function addPixiInstance(instance) {
  const parent =
    getContext<PIXI.Container>('pixi/container') ||
    getContext<PIXI.Container>('pixi/stage')

  let childIndex = -1

  // make sure child isn't already added to the parent
  try {
    // Container.getChildIndex throws an error if instance is not a child...
    childIndex = parent.getChildIndex(instance)
  } catch (e) {}

  if (parent && childIndex === -1) {
    parent.addChild(instance)

    return () => {
      parent?.removeChild(instance)
    }
  } else {
    throw new Error('Unable to find container or stage')
  }
}

/**
 * Returns true if any of the values are not undefined
 */
export function shouldApplyProps(...args) {
  for (const arg of args) {
    if (typeof arg !== 'undefined') {
      return true
    }
  }

  return false
}

/**
 * Returns the loaded texture
 */
export function getTexture(
  app: PIXI.Application,
  texture: string | PIXI.Texture
) {
  if (typeof texture === 'string') {
    const foundTexture = app.loader.resources[texture]?.texture

    warning(
      !!foundTexture,
      `Texture "${texture}" was not found in loaded resources`
    )

    return foundTexture
  }

  return texture
}
