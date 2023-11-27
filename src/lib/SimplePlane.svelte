<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import {
    parsePoint,
    type PickPixiProps,
    type PointLike,
  } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.SimplePlane>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.SimplePlane,
      'geometry' | 'shader' | 'state' | 'drawMode',
      'texture'
    > & {
      instance?: T
      vertices: PointLike
    }

  const {
    texture,
    vertices,
    geometry,
    shader,
    state,
    drawMode,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.SimplePlane(
      texture,
      parsePoint(vertices).x,
      parsePoint(vertices).y,
    )) as T

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.SimplePlane>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
  $effect(() => applyProp('texture', texture))

  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {instance} {...restProps} />
