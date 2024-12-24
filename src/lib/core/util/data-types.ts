import * as PIXI from 'pixi.js'

export type PointLike =
  | number
  | [number, number]
  | { x: number; y: number }
  | PIXI.Point
  | PIXI.ObservablePoint

/**
 * Like Pick but will swap certain types for others to match
 * svelte-pixi API
 */
export type PickPixiPropsOptional<T, Keys extends keyof T> = {
  [P in Keys]?: T[P] extends PIXI.Point ? PointLike : T[P]
}

export type PickPixiPropsRequired<T, Keys extends keyof T> = {
  [P in Keys]: T[P] extends PIXI.Point ? PointLike : T[P]
}

export type PickPixiProps<
  T,
  OptionalKeys extends keyof T,
  RequiredKeys extends keyof T | undefined = undefined,
> = PickPixiPropsOptional<T, OptionalKeys> &
  PickPixiPropsRequired<T, RequiredKeys extends keyof T ? RequiredKeys : never>

/**
 * Parses a value to a Point
 */
export function parsePoint(point: PointLike): PIXI.Point {
  if (Array.isArray(point)) {
    return new PIXI.Point(point[0], point[1])
  }

  if (typeof point === 'number') {
    return new PIXI.Point(point, point)
  }

  if (isPoint(point)) {
    return point
  }

  return new PIXI.Point(point.x, point.y)
}

export function isPoint(point: PointLike): point is PIXI.Point {
  return (
    !!point &&
    // faster than instanceof
    (point.constructor === PIXI.Point ||
      point.constructor === PIXI.ObservablePoint)
  )
}
