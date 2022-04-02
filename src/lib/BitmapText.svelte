<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface BitmapTextComponentProps<
    Instance extends PixiBitmapText = PixiBitmapText
  > extends ExtractProps<PixiBitmapText>,
      ExtractProps<GlobalMixins.Text> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import { BitmapText as PixiBitmapText } from '@pixi/text-bitmap'
  import Container, { type ContainerComponentProps } from './Container.svelte'

  type T = $$Generic<PixiBitmapText>
  type $$Props = BitmapTextComponentProps<T> & ContainerComponentProps<T>

  export let instance: PixiBitmapText = new PixiBitmapText(
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
