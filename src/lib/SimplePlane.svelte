<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { parsePoint, type PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.SimplePlane>
  type Props = Container<T>['$$prop_def'] & {
    texture: PIXI.SimplePlane['texture']
    vertices: PointLike
    geometry?: PIXI.SimplePlane['geometry']
    shader?: PIXI.MeshMaterial | PIXI.Shader
    state?: PIXI.SimplePlane['state']
    drawMode?: PIXI.SimplePlane['drawMode']
  }

  const {
    texture,
    vertices,
    geometry,
    shader,
    state,
    drawMode,
    children,
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

<Container {...restProps} {instance} {children} />
