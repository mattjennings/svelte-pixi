<script lang="ts" module>
  export interface NineSliceSpriteProps<
    T extends PIXI.NineSliceSprite = PIXI.NineSliceSprite,
  >
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.NineSliceSprite & PIXI.NineSliceSpriteOptions,
        'width' | 'height' | 'roundPixels',
        'texture' | 'leftWidth' | 'rightWidth' | 'topHeight' | 'bottomHeight'
      > {}
</script>

<script
  lang="ts"
  generics="T extends PIXI.NineSliceSprite = PIXI.NineSliceSprite"
>
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    texture,
    width,
    height,
    leftWidth,
    topHeight,
    rightWidth,
    bottomHeight,
    roundPixels,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: NineSliceSpriteProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.NineSliceSprite({
      texture,
      width,
      height,
      leftWidth,
      topHeight,
      rightWidth,
      bottomHeight,
      roundPixels,
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()

  const { applyProps, applyProp } = createApplyProps<
    PIXI.NineSliceSprite,
    NineSliceSpriteProps<T>
  >(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('texture', texture))
  $effect(() =>
    applyProps({
      width,
      height,
      leftWidth,
      rightWidth,
      topHeight,
      bottomHeight,
    }),
  )
  $effect(() => applyProp('roundPixels', roundPixels))

  $effect(() => {
    texture.on('update', invalidate)
    return () => texture.off('update', invalidate)
  })
</script>

<Container {...restProps} {instance} />
