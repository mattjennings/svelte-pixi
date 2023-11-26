<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { parsePoint, type PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.SimpleRope>
  type Props = Container<T>['$$prop_def'] & {
    texture: PIXI.SimpleRope['texture']
    points: PointLike[]
    geometry?: PIXI.SimpleRope['geometry']
    shader?: PIXI.SimpleRope['shader']
    state?: PIXI.SimpleRope['state']
    drawMode?: PIXI.SimpleRope['drawMode']
    textureScale?: number
  }

  let {
    texture,
    points,
    geometry,
    shader,
    state,
    drawMode,
    textureScale = 0,
    children,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.SimpleRope(texture, parsePoints(points), textureScale)) as T

  function parsePoints(points: PointLike[]): PIXI.Point[] {
    return points.map(parsePoint)
  }

  const { applyProp } = createApplyProps<PIXI.SimpleRope, Props>(instance, {
    onApply() {
      invalidate()
    },
    apply: {
      // PIXI.SimpleRope only uses points to create the geometry on construction,
      // so we need to recreate it whenever points change
      points: (value, instance) => {
        instance.geometry = new PIXI.RopeGeometry(
          texture.height,
          parsePoints(value),
          textureScale,
        )
      },
    },
  })
  const { invalidate } = getRenderer()

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('points', points))

  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} {children} />
