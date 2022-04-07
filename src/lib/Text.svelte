<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface TextComponentProps<Instance extends PIXI.Text = PIXI.Text>
    extends ExtractProps<PIXI.Text> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import Sprite, { type SpriteComponentProps } from './Sprite.svelte'

  type T = $$Generic<PIXI.Text>
  type $$Props = TextComponentProps<T> & SpriteComponentProps<T>

  export let instance: PIXI.Text = new PIXI.Text($$props.text, $$props.style)
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
