<script lang="ts" module>
  export interface SpriteProps<T extends PIXI.Sprite = PIXI.Sprite>
    extends ContainerProps<T>,
      PickPixiProps<
        PIXI.Sprite & PIXI.SpriteOptions,
        'anchor' | 'blendMode' | 'roundPixels',
        'texture'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.Sprite = PIXI.Sprite">
  import * as PIXI from 'pixi.js'

  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'
  import Container, { type ContainerProps } from './Container.svelte'

  let {
    texture,
    anchor,
    blendMode,
    roundPixels,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: SpriteProps<T> = $props()

  if (!instance) {
    instance = new PIXI.Sprite({
      texture,
      roundPixels,
      blendMode,
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.Sprite, SpriteProps<T>>(
    instance as T,
    {
      onApply() {
        invalidate()
      },
    },
  )

  $effect(() => {
    texture.on('update', invalidate)
    applyProp('texture', texture)

    return () => {
      texture.off('update', invalidate)
    }
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('roundPixels', roundPixels))
</script>

<Container {...restProps} {instance} {isRenderGroup} />
