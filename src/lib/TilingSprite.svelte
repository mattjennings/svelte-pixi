<script context="module" lang="ts">
  import Sprite, { type SpriteComponentProps } from './Sprite.svelte'
  import type { ExtractProps } from './util/props'

  export interface TilingSpriteComponentProps<
    Instance extends PIXI.TilingSprite = PIXI.TilingSprite
  > extends ExtractProps<PIXI.TilingSprite>,
      ExtractProps<GlobalMixins.TilingSprite> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  type T = $$Generic<PIXI.TilingSprite>
  type $$Props = TilingSpriteComponentProps<T> & SpriteComponentProps<T>

  /** @type {TilingSprite} TilingSprite instance to render */
  export let instance: PIXI.TilingSprite = new PIXI.TilingSprite(
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
