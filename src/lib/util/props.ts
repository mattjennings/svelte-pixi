import { getRenderer } from '../Renderer.svelte'
import { getTicker, onTick } from '../Ticker.svelte'
import * as PIXI from 'pixi.js'
import { onMount, tick } from 'svelte'
import { writable, type Writable } from 'svelte/store'

import { parsePoint, type PointLike } from './data-types'

/**
 * Returns apply prop functions that are bound to the instance
 */
export function createApplyProps<
  Instance,
  Props extends Partial<Record<keyof Instance, any>> = {
    [Key in keyof Instance]?: Instance[Key]
  },
>(
  instance: Instance,
  apply?: {
    [PropKey in keyof Props]?: Apply<Instance, Props[PropKey]>
  },
) {
  const defaultApply = apply
  return {
    applyProps: (props: Partial<Props>) =>
      applyProps(instance, props, { ...defaultApply, ...apply }),
    applyProp: <Prop extends keyof Props, Value>(
      prop: Prop | null,
      value: Value,
    ) =>
      applyProp(
        instance,
        prop as any,
        value,
        prop !== null ? defaultApply?.[prop] : undefined,
      ),
  }
}

/**
 * Applies all props to the instance if its value is not undefined and
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
export function applyProps<
  Instance,
  Props extends Partial<Record<keyof Instance, any>>,
>(
  instance: Instance,
  props: Props,
  apply?: {
    [Prop in keyof Props]?: Apply<Instance, Props[Prop]>
  },
) {
  if (instance) {
    for (const [prop, value] of Object.entries(props)) {
      applyProp(instance, prop as keyof Instance, value, apply?.[prop])
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
 * applyProp(instance, 'x', x)
 * // or
 * applyProp(instance, 'x', x, () => instance.x = x)
 * ```
 *
 * The 2nd parameter is an object to decrease tediousness of describing
 * the prop name & value, as they are often the same. It will only apply
 * the first key of the object. Use applyProps() if you need to apply more than 1
 * at the same time.
 */
export function applyProp<Instance, Prop extends keyof Instance, Value>(
  instance: Instance,
  prop: Prop | null,
  value: Value,
  apply?: Apply<Instance, Value>,
) {
  if (instance) {
    if (prop === null) {
      apply?.(value, instance)
    } else {
      const instanceValue = instance[prop] as any
      if (instanceValue !== value && typeof value !== 'undefined') {
        if (apply) {
          apply(value, instance)
        } else {
          if (
            instance[prop] instanceof PIXI.Point ||
            instance[prop] instanceof PIXI.ObservablePoint
          ) {
            instance[prop as any] = parsePoint(value as any)
          } else {
            instance[prop as any] = value
          }
        }
      }
    }
  }
}

export function track<T>(getter: () => T, initial?: T): Writable<T> {
  const { renderer } = getRenderer()
  const { ticker } = getTicker()

  const value = writable(initial)

  function update() {
    // svelte tick() first incase stores were updated
    // and passed down as a prop between pixi ticks
    tick().then(() => {
      value.set(getter())
    })
  }

  onMount(() => {
    if (!ticker) {
      renderer.on('postrender', update)
      return () => {
        renderer.off('postrender', update)
      }
    }
  })

  if (ticker) {
    onTick(() => {
      update()
    }, -Infinity)
  }

  return value
}

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type ExtractProps<T> = Partial<
  SwapPoints<Pick<T, NotFunctions<T> & PublicProperties<T>>>
>

export type ExtractPropKeys<T> = Pick<T, NotFunctions<T> & PublicProperties<T>>

export type Apply<Instance, Value> = (value: Value, instance: Instance) => any

type FilterNotStartingWith<
  Set,
  Needle extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
