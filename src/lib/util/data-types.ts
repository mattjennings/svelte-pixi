import type { ObservablePoint } from '@pixi/math'
import { Point } from '@pixi/math'

export type PointLike =
  | number
  | [number, number]
  | { x: number; y: number }
  | Point
  | ObservablePoint

/**
 * Parses a value a Point
 */
export function parsePoint(point: PointLike): Point {
  if (Array.isArray(point)) {
    return new Point(point[0], point[1])
  }

  if (typeof point === 'number') {
    return new Point(point, point)
  }

  return new Point(point.x, point.y)
}
