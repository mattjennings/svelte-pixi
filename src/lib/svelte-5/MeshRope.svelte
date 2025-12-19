<script lang="ts" module>
  export interface MeshRopeProps<T extends PIXI.MeshRope = PIXI.MeshRope>
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.MeshRope & PIXI.MeshRopeOptions,
        'shader' | 'state' | 'textureScale',
        'points' | 'texture'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.MeshRope = PIXI.MeshRope">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import {
    parsePoint,
    type PickPixiProps,
    type PointLike,
  } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'

  let {
    points,
    texture,
    textureScale,
    shader,
    state,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: MeshRopeProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.MeshRope({
      texture,
      points: parsePoints(points),
      textureScale,
      isRenderGroup,
    }) as T
  }

  function parsePoints(points: PointLike[]): PIXI.Point[] {
    return points.map(parsePoint)
  }
  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.MeshRope, MeshRopeProps<T>>(
    instance,
    {
      onApply() {
        invalidate()
      },
      apply: {
        // PIXI.MeshRope only uses points to create the geometry on construction,
        // so we need to recreate it whenever points change
        points: (value, instance) => {
          instance.geometry = new PIXI.RopeGeometry({
            points: parsePoints(value),
            textureScale: textureScale,
          })
        },
      },
    },
  )

  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('points', points))

  $effect(() => {
    texture.on('update', invalidate)
    return () => texture.off('update', invalidate)
  })
</script>

<Container {...restProps} {instance} />
