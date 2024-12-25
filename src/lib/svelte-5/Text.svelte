<script lang="ts" module>
  export interface TextProps<T extends PIXI.Text = PIXI.Text>
    extends ContainerProps<T>,
      PickPixiProps<
        PIXI.Text & PIXI.TextOptions,
        'anchor' | 'blendMode' | 'roundPixels' | 'style' | 'text'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.Text = PIXI.Text">
  import * as PIXI from 'pixi.js'

  import { createApplyProps } from '../core/util/props'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    text,
    style,
    anchor,
    blendMode,
    roundPixels,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: TextProps<T> = $props()

  if (!instance) {
    instance = new PIXI.Text({ text, style, isRenderGroup }) as T
  }

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.Text, TextProps<T>>(
    instance as T,
    {
      onApply() {
        invalidate()
      },
    },
  )

  $effect(() => applyProp('text', text))
  $effect(() => applyProp('style', style))
  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('roundPixels', roundPixels))
</script>

<Container {...restProps} {instance} />
