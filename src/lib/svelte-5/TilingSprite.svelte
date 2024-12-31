<script lang="ts" module>
  export interface TilingSpriteProps<
    T extends PIXI.TilingSprite = PIXI.TilingSprite,
  > extends ContainerProps<T>,
      PickPixiProps<
        PIXI.TilingSprite & PIXI.TilingSpriteOptions,
        | 'anchor'
        | 'blendMode'
        | 'clampMargin'
        | 'roundPixels'
        | 'tilePosition'
        | 'tileTransform'
        | 'uvRespectAnchor'
        | 'height'
        | 'width',
        'texture'
      > {}
</script>

<script lang="ts" generics="T extends PIXI.TilingSprite = PIXI.TilingSprite">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  let {
    anchor,
    blendMode,
    clampMargin,
    height,
    roundPixels,
    texture,
    tilePosition,
    tileTransform,
    uvRespectAnchor,
    width,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: TilingSpriteProps<T> = $props()

  if (!instance) {
    instance = new PIXI.TilingSprite({
      texture,
      width,
      height,
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.TilingSprite>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('clampMargin', clampMargin))
  $effect(() => applyProp('height', height))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('tilePosition', tilePosition))
  $effect(() => applyProp('tileTransform', tileTransform))
  $effect(() => applyProp('uvRespectAnchor', uvRespectAnchor))
  $effect(() => applyProp('width', width))
  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} {height} {width} />
