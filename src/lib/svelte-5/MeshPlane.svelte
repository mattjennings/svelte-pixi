<script lang="ts" module>
  export interface MeshPlaneProps<T extends PIXI.MeshPlane = PIXI.MeshPlane>
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.MeshPlane & PIXI.MeshPlaneOptions,
        'shader' | 'state',
        'texture' | 'verticesX' | 'verticesY'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.MeshPlane = PIXI.MeshPlane">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    texture,
    shader,
    state,
    verticesX,
    verticesY,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: MeshPlaneProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.MeshPlane({
      texture,
      verticesX,
      verticesY,
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.Mesh>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))

  $effect(() => {
    texture.on('update', invalidate)
    return () => texture.off('update', invalidate)
  })
</script>

<Container {...restProps} {instance} />
