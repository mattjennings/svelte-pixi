<script lang="ts" module>
  export interface HTMLTextProps<T extends PIXI.HTMLText = PIXI.HTMLText>
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.HTMLText,
        'anchor' | 'blendMode' | 'roundPixels' | 'style',
        'text'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.HTMLText = PIXI.HTMLText">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  let {
    anchor,
    blendMode,
    roundPixels,
    text,
    style,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: HTMLTextProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.HTMLText({ text, style, isRenderGroup }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.HTMLText>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('text', text))
  $effect(() => applyProp('style', style))
  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('roundPixels', roundPixels))
</script>

<Container {...restProps} {instance} />
