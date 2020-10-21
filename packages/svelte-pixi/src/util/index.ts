import { getContext } from 'svelte'
import * as PIXI from 'pixi.js'

/**
 * Adds a PIXI instance to the nearest container in the svelte tree
 *
 * @returns {function} removes instance from container
 */
export function addPixiInstance(instance) {
  const parent =
    getContext<PIXI.Container>('pixi/container') ||
    getContext<PIXI.Container>('pixi/stage')

  if (parent) {
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
 * Applies props to a pixi instance
 *
 * @param instance pixi instance
 * @param props props from svelte component (usually $$props)
 * @param {(key: string, value: any) => any} [applyProp] called for every prop that is to be applied. Return the value that should be applied, or undefined if it should not be applied at all
 */
export function applyProps(instance, props, applyProp = (key, value) => value) {
  for (const prop in props) {
    if (prop in instance) {
      const val = applyProp(prop, props[prop])

      if (val !== undefined) {
        instance[prop] = val
      }
    }
  }
}

export type PointLike = PIXI.Point | { x: number; y: number }
/**
 * Converts a point-like object to a Point
 */
export function toPoint(point: PointLike) {
  if (point instanceof PIXI.Point) {
    return point
  }

  return new PIXI.Point(point.x, point.y)
}

/**
 * Logs a warning if the condition is met
 *
 * taken from https://github.com/alexreardon/tiny-warning/blob/master/src/index.js
 */
export function warning(condition: boolean, message: string): void {
  // condition passed: do not log
  if (condition) {
    return
  }

  const text: string = `Warning: ${message}`

  console.warn(text)

  // Throwing an error and catching it immediately
  // to improve debugging
  // A consumer can use 'pause on caught exceptions'
  // https://github.com/facebook/react/issues/4216
  try {
    throw Error(text)
  } catch (x) {}
}
