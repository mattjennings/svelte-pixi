<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import {
    parsePoint,
    type PickPixiProps,
    type PointLike,
  } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.MeshRope>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.MeshRope & PIXI.MeshRopeOptions,
      'shader' | 'state' | 'textureScale',
      'points' | 'texture'
    > & {
      instance?: T
    }

  let {
    points,
    texture,
    textureScale,
    shader,
    state,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: Props = $props()

  if (!instance) {
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

  const { applyProp } = createApplyProps<PIXI.MeshRope, Props>(instance, {
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
  })

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
