<script lang="ts" module>
  export interface GraphicsProps<T extends PIXI.Graphics = PIXI.Graphics>
    extends
      ContainerProps<T>,
      PickPixiProps<PIXI.Graphics, 'blendMode' | 'tint'> {
    instance?: T

    /**
     * Call your drawing functions on the PIXI.Graphics instance here. It will
     * only draw on mount and when the function or state inside of the function changes.
     */
    draw?: (graphics: PIXI.Graphics) => any
  }
</script>

<script lang="ts" generics="T extends PIXI.Graphics">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'

  let {
    draw,
    blendMode,
    tint,
    instance = $bindable(),
    isRenderGroup,
    ...restProps
  }: GraphicsProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.Graphics({
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps(instance as T, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('tint', tint))

  $effect(() => {
    if (draw) {
      draw(instance as T)
    }
  })
</script>

<Container {...restProps} {instance} />
