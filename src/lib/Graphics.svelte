<script context="module" lang="ts">
  import Container, { type ContainerComponentProps } from './Container.svelte'
  import type { ExtractProps } from './util/props'

  export interface GraphicsComponentProps<
    Instance extends PIXI.Graphics = PIXI.Graphics
  > extends ExtractProps<PIXI.Graphics>,
      ExtractProps<GlobalMixins.Graphics> {
    instance?: Instance
    draw: (graphics: PIXI.Graphics) => any
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  type T = $$Generic<PIXI.Graphics>
  type $$Props = GraphicsComponentProps<T> & ContainerComponentProps<T>

  /**
   * @type { (graphics: Graphics) => any} Call your draw functions here
   */
  export let draw: $$Props['draw']

  /** @type {Graphics} Graphics instance to render */
  export let instance: PIXI.Graphics = new PIXI.Graphics()

  // because Graphics is not immutable, we can call draw whenever it changes
  $: draw(instance)
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
