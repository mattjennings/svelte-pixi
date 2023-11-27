<script lang="ts">
  /**
   * @restProps {Container}
   */

  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PickPixiProps } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.TilingSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.TilingSprite,
      | 'anchor'
      | 'blendMode'
      | 'clampMargin'
      | 'pluginName'
      | 'roundPixels'
      | 'tilePosition'
      | 'tileTransform'
      | 'uvMatrix'
      | 'uvRespectAnchor',
      'height' | 'width'
    > & {
      texture: PIXI.Texture
      instance?: T
    }

  const {
    anchor,
    blendMode,
    clampMargin,
    height,
    pluginName,
    roundPixels,
    texture,
    tilePosition,
    tileTransform,
    uvMatrix,
    uvRespectAnchor,
    width,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.TilingSprite(texture, width, height)) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.TilingSprite>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('clampMargin', clampMargin))
  $effect(() => applyProp('height', height))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('tilePosition', tilePosition))
  $effect(() => applyProp('tileTransform', tileTransform))
  $effect(() => applyProp('uvMatrix', uvMatrix))
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
