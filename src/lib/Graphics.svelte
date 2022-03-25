<script context="module" lang="ts">
  import { Graphics } from '@pixi/graphics'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { ExtractProps } from './util/props'

  export interface GraphicsProps<Instance extends Graphics = Graphics>
    extends ExtractProps<Graphics>,
      ExtractProps<GlobalMixins.Graphics> {
    instance?: Instance
    draw: (graphics: Graphics) => any
  }
</script>

<script lang="ts">
  type T = $$Generic<Graphics>
  type $$Props = GraphicsProps<T> & ContainerProps<T>

  /**
   * @type { (graphics: Graphics) => any} Call your draw functions here
   */
  export let draw: $$Props['draw']

  /** @type {Graphics} Graphics instance to render */
  export let instance: Graphics = new Graphics()

  // because Graphics is not immutable, we can call draw whenever it changes
  $: draw(instance)
</script>

<Container
  {...$$restProps}
  {instance}
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
