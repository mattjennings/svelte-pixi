<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface BitmapTextComponentProps<
    Instance extends PIXI.BitmapText = PIXI.BitmapText
  > extends ExtractProps<PIXI.BitmapText> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerComponentProps } from './Container.svelte'

  type T = $$Generic<PIXI.BitmapText>
  type $$Props = BitmapTextComponentProps<T> & ContainerComponentProps<T>

  export let instance: PIXI.BitmapText = new PIXI.BitmapText(
    $$props.text,
    $$props.style
  )
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
