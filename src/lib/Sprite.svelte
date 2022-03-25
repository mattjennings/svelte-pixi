<script context="module" lang="ts">
  export interface SpriteProps<Instance extends Sprite = Sprite>
    extends ExtractProps<Omit<Sprite, 'anchor'>>,
      ExtractProps<GlobalMixins.Sprite> {
    instance?: Instance
    anchor?: PointLike
  }
</script>

<script lang="ts">
  import { Sprite } from '@pixi/sprite'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PointLike } from './util/data-types'
  import { applyPoint, applyProps, type ExtractProps } from './util/props'

  type T = $$Generic<Sprite>
  type $$Props = SpriteProps<T> & ContainerProps<T>

  export let anchor: $$Props['anchor'] = undefined

  $: {
    const props = { anchor }

    applyProps(instance, props, {
      apply: {
        anchor: applyPoint,
      },
    })
  }
  /** @type {Sprite} Sprite instance to render */
  export let instance: Sprite = new Sprite($$props.texture)
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
