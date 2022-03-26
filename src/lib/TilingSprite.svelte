<script context="module" lang="ts">
  import {
    TilingSprite as PixiTilingSprite,
    TilingSpriteRenderer,
  } from '@pixi/sprite-tiling'
  import { registerRendererPlugin } from './Pixi.svelte'
  import Sprite, { type SpriteComponentProps } from './Sprite.svelte'
  import type { PointLike } from './util/data-types'
  import type { ExtractProps } from './util/props'

  registerRendererPlugin('tilingSprite', TilingSpriteRenderer)

  export interface TilingSpriteComponentProps<
    Instance extends PixiTilingSprite = PixiTilingSprite
  > extends ExtractProps<Omit<PixiTilingSprite, 'tilePosition'>>,
      ExtractProps<GlobalMixins.TilingSprite> {
    instance?: Instance
    tilePosition: PointLike
  }
</script>

<script lang="ts">
  type T = $$Generic<PixiTilingSprite>
  type $$Props = TilingSpriteComponentProps<T> & SpriteComponentProps<T>

  /** @type {TilingSprite} TilingSprite instance to render */
  export let instance: PixiTilingSprite = new PixiTilingSprite(
    $$props.texture,
    $$props.width,
    $$props.height
  )
</script>

<Sprite
  {...$$restProps}
  {instance}
  on:click
  on:mousedown
  on:mousemove
  on:mouseout
  on:mouseover
  on:mouseup
  on:mouseupoutside
  on:mouseupoutside
  on:pointercancel
  on:pointerdown
  on:pointermove
  on:pointerout
  on:pointerover
  on:pointertap
  on:pointerup
  on:pointerupoutside
  on:removedFrom
  on:rightclick
  on:rightdown
  on:rightup
  on:rightupoutside
  on:tap
  on:touchcancel
  on:touchend
  on:touchendoutside
  on:touchmove
  on:touchstart
  on:added
  on:removed
>
  <slot />
</Sprite>
