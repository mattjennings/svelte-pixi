<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.PerspectiveMesh>

  type Props = Container<T>['$$prop_def'] &
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
    > & {
      instance?: T
    }

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
  }: Props = $props()

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
