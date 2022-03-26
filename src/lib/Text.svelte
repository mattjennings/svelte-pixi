<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface TextProps<Instance extends PixiText = PixiText>
    extends ExtractProps<PixiText>,
      ExtractProps<GlobalMixins.Text> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import { Text as PixiText } from '@pixi/text'
  import Sprite, { type SpriteComponentProps } from './Sprite.svelte'

  type T = $$Generic<PixiText>
  type $$Props = TextProps<T> & SpriteComponentProps<T>

  export let instance: PixiText = new PixiText($$props.text, $$props.style)
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
