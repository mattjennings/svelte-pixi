<script lang="ts" module>
  export interface BitmapTextProps<T extends PIXI.BitmapText = PIXI.BitmapText>
    extends ContainerProps<T>,
      PickPixiProps<
        PIXI.BitmapText,
        'anchor' | 'roundPixels' | 'text' | 'style'
      > {
    instance?: T
  }
</script>

<script lang="ts" generics="T extends PIXI.BitmapText = PIXI.BitmapText">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  let {
    anchor,
    roundPixels,
    text,
    style,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: BitmapTextProps<T> = $props()

  if (!instance) {
    instance = new PIXI.BitmapText({ text, style, isRenderGroup }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.BitmapText>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('text', text))
  $effect(() => applyProp('style', style))
</script>

<Container {...restProps} {instance} />
