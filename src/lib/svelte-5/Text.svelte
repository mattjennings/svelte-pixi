<script lang="ts">
  import type { TextStyle } from 'pixi.js'
  import * as PIXI from 'pixi.js'

  import { createApplyProps } from '../core/util/props'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.Text>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<PIXI.Text, 'anchor' | 'blendMode' | 'roundPixels', 'text'> & {
      instance?: T
      style?: Partial<TextStyle>
    }

  let {
    text,
    style,
    anchor,
    blendMode,
    roundPixels,
    instance = $bindable(new PIXI.Text({ text, style }) as T),
    ...restProps
  }: Props = $props()

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.Text, Props>(instance as T, {
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
