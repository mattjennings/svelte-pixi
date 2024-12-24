<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { getRenderer } from '../core/context/renderer'
  import type { PickPixiProps } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'
  import Container from './Container.svelte'

  type T = $$Generic<PIXI.Sprite>

  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.Sprite,
      'anchor' | 'blendMode' | 'roundPixels',
      'texture'
    > & {
      instance?: T
    }

  let {
    texture,
    anchor,
    blendMode,
    roundPixels,
    isRenderGroup,
    instance = $bindable(
      new PIXI.Sprite({
        texture,
        roundPixels,
        blendMode,
        isRenderGroup,
      }) as T,
    ),
    ...restProps
  }: Props = $props()

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.Sprite, Props>(instance as T, {
    onApply() {
      invalidate()
    },
  })

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
