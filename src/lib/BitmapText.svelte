<script lang="ts">
  /**
   * @restProps {Container}
   */
  import type { PickPixiProps } from './util/data-types'
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { omitUndefined } from './util/helpers'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.BitmapText>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.BitmapText,
      'anchor' | 'roundPixels' | 'text',
      'text'
    > & {
      style?: PIXI.IBitmapTextStyle
    }

  const {
    anchor,
    roundPixels,
    text,
    style,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.BitmapText(text, style)) as T

  const { invalidate } = getRenderer()
  const { applyProp, applyProps } = createApplyProps<PIXI.BitmapText>(
    instance,
    {
      onApply() {
        invalidate()
      },
    },
  )

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('text', text))
  $effect(() =>
    applyProps(
      omitUndefined({
        align: style?.align,
        fontName: style?.fontName,
        fontSize: style?.fontSize,
        tint: style?.tint,
        letterSpacing: style?.letterSpacing,
        maxWidth: style?.maxWidth,
      }),
    ),
  )
</script>

<Container {instance} {...restProps} />
