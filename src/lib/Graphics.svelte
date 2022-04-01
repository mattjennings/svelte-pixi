<script context="module" lang="ts">
  import { Graphics as PixiGraphics } from '@pixi/graphics'
  import Container, { type ContainerComponentProps } from './Container.svelte'
  import { applyPoint, applyProps, type ExtractProps } from './util/props'

  export interface GraphicsComponentProps<
    Instance extends PixiGraphics = PixiGraphics
  > extends ExtractProps<PixiGraphics>,
      ExtractProps<GlobalMixins.Graphics> {
    instance?: Instance
    draw: (graphics: PixiGraphics) => any
  }
</script>

<script lang="ts">
  type T = $$Generic<PixiGraphics>
  type $$Props = GraphicsComponentProps<T> & ContainerComponentProps<T>

  export let pivot: $$Props['pivot'] = undefined

  $: {
    const props = { pivot }

    applyProps(instance, props, {
      apply: {
        pivot: applyPoint,
      },
    })
  }

  /**
   * @type { (graphics: Graphics) => any} Call your draw functions here
   */
  export let draw: $$Props['draw']

  /** @type {Graphics} Graphics instance to render */
  export let instance: PixiGraphics = new PixiGraphics()

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
