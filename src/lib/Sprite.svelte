<script context="module" lang="ts">
  export interface SpriteComponentProps<
    Instance extends PIXI.Sprite = PIXI.Sprite
  > extends ExtractProps<PIXI.Sprite> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import Container, { type ContainerComponentProps } from './Container.svelte'
  import type { ExtractProps } from './util/props'

  type T = $$Generic<PIXI.Sprite>
  type $$Props = SpriteComponentProps<T> & ContainerComponentProps<T>

  /** @type {PIXI.Sprite} PIXI.Sprite instance to render */
  export let instance: PIXI.Sprite = new PIXI.Sprite($$props.texture)
</script>

<Container
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
</Container>
