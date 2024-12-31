<script lang="ts" module>
  export interface TextProps<T extends PIXI.Text = PIXI.Text>
    extends ContainerProps<T>,
      PickPixiProps<PIXI.Text, 'anchor' | 'blendMode' | 'roundPixels'>,
      PickPixiProps<PIXI.TextOptions, never, 'text' | 'style'> {}
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
      apply: {
        style: (value) => {
          if (value) {
            if (value instanceof PIXI.TextStyle) {
              instance.style = value
            } else {
              for (const key in value) {
                instance.style[key] = value[key]
              }
            }
          }
        },
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
