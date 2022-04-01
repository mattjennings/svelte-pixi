import type { ObservablePoint, Point } from '@pixi/math'
import { parsePoint, type PointLike } from './data-types'

export function applyProps<Instance, Props extends Record<string, any>>(
  instance: Instance,
  props: Props,
  opts?: {
    apply?: {
      [PropKey in keyof Props]: ApplyProp<Instance, Props, Props[PropKey]>
    }
  }
) {
  const apply = opts?.apply ?? {}
  if (instance) {
    for (const [prop, value] of Object.entries(props)) {
      if (instance[prop] !== value) {
        if (apply[prop]) {
          apply[prop](instance, value, prop, props)
        } else {
          instance[prop] = value
        }
      }
    }
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

export function applyPoint<T = any>(
  instance: T,
  value: PointLike,
  key: string
) {
  if (value) {
    const point = parsePoint(value)
    instance[key].set(point.x, point.y)
  }
}

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type ExtractProps<T> = Partial<
  SwapPoints<Pick<T, NotFunctions<T> & PublicProperties<T>>>
>

export type ApplyProp<Instance, Props, Value> = (
  instance: Instance,
  value: Value,
  key: keyof Props,
  props: Props
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
  ? { [K in keyof T]: T[K] extends Point | ObservablePoint ? PointLike : T[K] }
  : T

type NotFunctions<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : K
}[keyof T]