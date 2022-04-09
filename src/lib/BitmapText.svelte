<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { applyProp } from './util/props'

  type T = $$Generic<PIXI.BitmapText>
  type $$Props = Container<T>['$$prop_def'] & {
    anchor?: PIXI.BitmapText['anchor']
    roundPixels?: PIXI.BitmapText['roundPixels']
    text: PIXI.BitmapText['text']
    style?: PIXI.IBitmapTextStyle
  }

  /**
   * The anchor sets the origin point of the text.
   *
   * @type {PointLike}
   */
  export let anchor: $$Props['anchor'] = undefined

  /**
   * The text of the BitmapText object.
   *
   * @type {string}
   */
  export let text: $$Props['text'] = undefined

  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   *
   * @type {boolean}
   */
  export let roundPixels: $$Props['roundPixels'] = undefined

  /**
   * Sets the style
   * @type {PIXI.IBitmapTextStyle}
   **/
  export let style: $$Props['style'] = undefined

  /**
   * The PIXI.BitmapText instance. Can be set or bound to.
   *
   * @type {PIXI.BitmapText}
   */
  export let instance: T = new PIXI.BitmapText(text, style) as T

  $: applyProp(instance, { anchor })
  $: applyProp(instance, { roundPixels })
  $: applyProp(instance, { text })
  $: applyProp(instance, { style })
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
