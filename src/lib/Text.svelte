<script lang="ts">
  import { onMount } from 'svelte'
  import type { ITextStyle } from 'pixi.js'
  import * as PIXI from 'pixi.js'

  import { createApplyProps } from './util/props'
  import Container from './Container.svelte'

  import { getRenderer } from './Renderer.svelte'
  import type { PointLike } from './util/data-types'

  type T = $$Generic<PIXI.Text>
  type Props = Container<T>['$$prop_def'] & {
    text: PIXI.Text['text']
    style?: Partial<ITextStyle>
    anchor?: PointLike
    blendMode?: PIXI.Sprite['blendMode']
    pluginName?: PIXI.Sprite['pluginName']
    roundPixels?: PIXI.Sprite['roundPixels']
  }

  let {
    text,
    style,
    anchor,
    blendMode,
    pluginName,
    roundPixels,
    children,
    instance: _instance = new PIXI.Text(text, style) as T,
    ...restProps
  } = $props<Props>()

  export const instance = _instance

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

<Container {instance} {...restProps} {children} />
