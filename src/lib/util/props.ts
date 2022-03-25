import { parsePoint, type PointLike } from './data-types'

type FilterNotStartingWith<
  Set,
  Needle extends string
> = Set extends `${Needle}${infer _X}` ? never : Set

type PublicProperties<T> = FilterNotStartingWith<keyof T, '_'>
type NotFunctions<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : K
}[keyof T]

export type ExtractProps<T, Except extends string = ''> = Partial<
  Omit<Pick<T, NotFunctions<T> & PublicProperties<T>>, Except>
>

export type ApplyProp<Instance, Props, Value> = (
  instance: Instance,
  value: Value,
  key: keyof Props,
  props: Props
) => any

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
