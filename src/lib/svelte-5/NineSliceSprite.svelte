<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.NineSliceSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.NineSliceSprite & PIXI.NineSliceSpriteOptions,
      'width' | 'height' | 'roundPixels',
      'texture' | 'leftWidth' | 'rightWidth' | 'topHeight' | 'bottomHeight'
    > & {
      instance?: T
    }

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
  }: Props = $props()

  if (!instance) {
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
    Props
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
