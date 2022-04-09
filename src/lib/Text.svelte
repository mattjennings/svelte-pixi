<script context="module" lang="ts">
  import { applyProps, type ExtractProps } from './util/props'

  export interface TextComponentProps<Instance extends PIXI.Text = PIXI.Text>
    extends ExtractProps<PIXI.Text> {
    instance?: Instance
  }
</script>

<script lang="ts">
  /**
   * @restProps {Sprite}
   */
  import * as PIXI from 'pixi.js'

  import Sprite from './Sprite.svelte'

  type T = $$Generic<PIXI.Text>
  type $$Props = Sprite<T>['$$prop_def'] & {
    text: PIXI.Text['text']
    style: PIXI.Text['style']
  }

  export let text: PIXI.Text['text']
  export let style: PIXI.Text['style']

  export let instance: T = new PIXI.Text($$props.text, $$props.style) as T

  $: applyProps(instance, { text, style })
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
