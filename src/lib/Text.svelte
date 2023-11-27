<script lang="ts">
  import type { ITextStyle } from 'pixi.js'
  import * as PIXI from 'pixi.js'

  import { createApplyProps } from './util/props'
  import Container from './Container.svelte'

  import { getRenderer } from './Renderer.svelte'
  import type { PickPixiProps } from './util/data-types'

  type T = $$Generic<PIXI.Text>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.Text,
      'anchor' | 'blendMode' | 'pluginName' | 'roundPixels',
      'text'
    > & {
      instance?: T
      style?: Partial<ITextStyle>
    }

  let {
    text,
    style,
    anchor,
    blendMode,
    pluginName,
    roundPixels,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.Text(text, style)) as T

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
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
</script>

<Container {...restProps} {instance} />
