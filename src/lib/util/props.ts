import * as PIXI from 'pixi.js'

import { parsePoint, type PointLike } from './data-types'

/**
 * Applies alll props to the instance if its value is not undefined and
 * is not equal to the instance's value of the prop.
 *
 * Usage:
 *
 * ```js
 * applyProps(instance, { x, y })
 * // or
 * applyProps(instance, { x }, {
 *  x: value => instance.x = value,
 *  y: value => instance.y = value,
 * })
 * ```
 */
export function applyProps<Instance, Props extends Record<string, any>>(
  instance: Instance,
  props: Props,
  apply?: {
    [PropKey in keyof Props]?: ApplyProp<Instance, Props, Props[PropKey]>
  }
) {
  if (instance) {
    for (const [prop, value] of Object.entries(props)) {
      if (instance[prop] !== value && typeof value !== 'undefined') {
        if (apply?.[prop]) {
          apply[prop](value, prop, instance)
        } else {
          if (
            instance[prop] instanceof PIXI.Point ||
            instance[prop] instanceof PIXI.ObservablePoint
          ) {
            instance[prop] = parsePoint(value)
          } else {
            instance[prop] = value
          }
        }
      }
    }
  }
}

/**
 * Applies a single prop to the instance if the value is not undefined and
 * is not equal to the instance's value of the prop.
 *
 * Usage:
 *
 * ```js
 * applyProp(instance, { x })
 * // or
 * applyProp(instance, { x }, value => instance.x = value)
 * ```
 *
 * The 2nd parameter is an object to decrease tediousness of describing
 * the prop name & value, as they are often the same. It will only apply
 * the first key of the object. Use applyProps() if you need to apply more than 1
 * at the same time.
 */
export function applyProp<Instance, Props extends Record<string, any>>(
  instance: Instance,
  props: Props,
  apply?: ApplyProp<Instance, Props, Props[keyof Props]>
) {
  const prop = Object.keys(props)[0]
  return applyProps(
    instance,
    props,
    // @ts-ignore
    { [prop]: apply }
  )
}
/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type ExtractProps<T> = Partial<
  SwapPoints<Pick<T, NotFunctions<T> & PublicProperties<T>>>
>

export type ExtractPropKeys<T> = Pick<T, NotFunctions<T> & PublicProperties<T>>

export type ApplyProp<Instance, Props, Value> = (
  value: Value,
  key: keyof Props,
  instance: Instance
) => any

type FilterNotStartingWith<
  Set,
  Needle extends string
> = Set extends `${Needle}${infer _X}` ? never : Set

type PublicProperties<T> = FilterNotStartingWith<keyof T, '_'>

/**
 * Converts Point or ObservablePoint types to PointLike
 */
type SwapPoints<T> = T extends {}
  ? {
      [K in keyof T]: T[K] extends PIXI.Point | PIXI.ObservablePoint
        ? PointLike
        : T[K]
    }
  : T

type NotFunctions<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : K
}[keyof T]
