<script lang="ts" module>
  export interface PerspectiveMeshProps<
    T extends PIXI.PerspectiveMesh = PIXI.PerspectiveMesh,
  > extends ContainerProps<T>,
      PickPixiProps<
        PIXI.PerspectiveMesh & PIXI.PerspectivePlaneOptions,
        | 'shader'
        | 'state'
        | 'x0'
        | 'y0'
        | 'x1'
        | 'y1'
        | 'x2'
        | 'y2'
        | 'x3'
        | 'y3',
        'texture' | 'verticesX' | 'verticesY'
      > {}
</script>

<script
  lang="ts"
  generics="T extends PIXI.PerspectiveMesh = PIXI.PerspectiveMesh"
>
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    shader,
    state,
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    texture,
    verticesX,
    verticesY,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: PerspectiveMeshProps<T> = $props()

  if (!instance) {
    instance = new PIXI.PerspectiveMesh({
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
    if (
      x0 !== undefined &&
      y0 !== undefined &&
      x1 !== undefined &&
      y1 !== undefined &&
      x2 !== undefined &&
      y2 !== undefined &&
      x3 !== undefined &&
      y3 !== undefined
    ) {
      instance.setCorners(x0, y0, x1, y1, x2, y2, x3, y3)
    }
  })

  $effect(() => {
    texture.on('update', invalidate)
    return () => texture.off('update', invalidate)
  })
</script>

<Container {...restProps} {instance} />
