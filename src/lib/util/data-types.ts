import * as PIXI from 'pixi.js'

export type PointLike =
  | number
  | [number, number]
  | { x: number; y: number }
  | PIXI.Point
  | PIXI.ObservablePoint

export function parsePoint(point: PointLike): PIXI.Point {
  if (Array.isArray(point)) {
    return new PIXI.Point(point[0], point[1])
  }

  if (typeof point === 'number') {
    return new PIXI.Point(point, point)
  }

  return new PIXI.Point(point.x, point.y)
}
