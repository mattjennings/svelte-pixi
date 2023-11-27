<script lang="ts">
  /**
   * @restProps {Container}
   */
  import type { PickPixiProps } from './util/data-types'
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Mesh>

  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<PIXI.Mesh, 'state' | 'drawMode', 'geometry'> & {
      instance?: T
      shader: PIXI.MeshMaterial | PIXI.Shader
    }

  const {
    geometry,
    shader,
    state,
    drawMode,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.Mesh(geometry, shader, state, drawMode)) as T

  const { applyProp } = createApplyProps<PIXI.Mesh>(instance, {
    onApply() {
      invalidate()
    },
  })
  const { invalidate } = getRenderer()

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
</script>

<Container {...restProps} {instance} />
