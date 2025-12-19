<script lang="ts" module>
  export interface MeshProps<T extends PIXI.Mesh = PIXI.Mesh>
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.Mesh & PIXI.MeshOptions,
        'state' | 'shader' | 'roundPixels' | 'texture',
        'geometry'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.Mesh = PIXI.Mesh">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    geometry,
    shader,
    state,
    isRenderGroup,
    roundPixels,
    texture,
    instance = $bindable(),
    ...restProps
  }: MeshProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.Mesh({
      geometry,
      shader,
      state,
      roundPixels,
      texture,
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
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('texture', texture))

  $effect(() => {
    if (texture) {
      texture.on('update', invalidate)
      return () => texture.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} />
