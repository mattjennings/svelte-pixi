<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.Mesh>

  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<PIXI.Mesh, 'state'> & {
      instance?: T
      geometry: PIXI.MeshOptions['geometry']
      shader?: PIXI.MeshOptions['shader']
    }

  let {
    geometry,
    shader,
    state,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: Props = $props()

  if (!instance) {
    instance = new PIXI.Mesh({
      geometry,
      shader,
      state,
      isRenderGroup,
    }) as T
  }

  const { applyProp } = createApplyProps<PIXI.Mesh>(instance, {
    onApply() {
      invalidate()
    },
  })
  const { invalidate } = getRenderer()

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
</script>

<Container {...restProps} {instance} />
