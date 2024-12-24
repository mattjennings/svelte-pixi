<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.Graphics>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<PIXI.Graphics, 'blendMode' | 'tint'> & {
      instance?: T

      /**
       * Call your drawing functions on the PIXI.Graphics instance here. It will
       * only draw on mount and when the function or state inside of the function changes.
       */
      draw?: (graphics: PIXI.Graphics) => any
    }

  let {
    draw,
    blendMode,
    tint,
    instance = $bindable(),
    isRenderGroup,
    ...restProps
  }: Props = $props()

  if (!instance) {
    instance = new PIXI.Graphics({
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.Graphics>(instance as T, {
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
