<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.MeshPlane>

  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<PIXI.MeshPlane, 'shader' | 'state'> & {
      instance?: T
      texture: PIXI.MeshPlaneOptions['texture']
      verticesX: PIXI.MeshPlaneOptions['verticesX']
      verticesY: PIXI.MeshPlaneOptions['verticesY']
    }

  let {
    texture,
    shader,
    state,
    verticesX,
    verticesY,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: Props = $props()

  if (!instance) {
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
