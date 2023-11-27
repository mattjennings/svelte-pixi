import * as PIXI from 'pixi.js'
import type { Snippet } from 'svelte'

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
export type PickPixiProps<
  T,
  Keys extends keyof T,
  Required extends keyof T = never,
> = {
  [P in Keys]: P extends Required
    ? T[P] extends PIXI.Point
      ? PointLike
      : T[P]
    : (T[P] extends PIXI.Point ? PointLike : T[P]) | undefined
}

export type PixiComponentProps<T, K extends keyof T> = PickPixiProps<T, K> & {
  instance?: T
}

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
