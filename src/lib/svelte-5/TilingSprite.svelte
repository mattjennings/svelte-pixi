<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.TilingSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.TilingSprite,
      | 'anchor'
      | 'blendMode'
      | 'clampMargin'
      | 'roundPixels'
      | 'tilePosition'
      | 'tileTransform'
      | 'uvRespectAnchor',
      'height' | 'width'
    > & {
      texture: PIXI.Texture
      instance?: T
    }

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
  }: Props = $props()

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
