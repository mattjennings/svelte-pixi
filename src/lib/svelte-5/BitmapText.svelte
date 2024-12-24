<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.BitmapText>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.BitmapText,
      'anchor' | 'roundPixels' | 'text' | 'style'
    > & {
      instance?: T
    }

  let {
    anchor,
    roundPixels,
    text,
    style,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: Props = $props()

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
