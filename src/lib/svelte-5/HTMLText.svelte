<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.HTMLText>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.HTMLText,
      'anchor' | 'blendMode' | 'roundPixels' | 'style',
      'text'
    > & {
      instance?: T
    }

  let {
    anchor,
    blendMode,
    roundPixels,
    text,
    style,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: Props = $props()

  if (!instance) {
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
