<script lang="ts">
  import type { ITextStyle } from 'pixi.js'

  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'

  import { createApplyProps } from './util/props'
  import Container from './Container.svelte'
  import { afterUpdate } from 'svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PointLike } from './util/data-types'

  type T = $$Generic<PIXI.Text>
  type $$Props = Container<T>['$$prop_def'] & {
    text: PIXI.Text['text']
    style?: Partial<ITextStyle>
    anchor?: PointLike
    blendMode?: PIXI.Sprite['blendMode']
    pluginName?: PIXI.Sprite['pluginName']
    roundPixels?: PIXI.Sprite['roundPixels']
  }

  /**
   * The text to display
   *
   * @type {string}
   */
  export let text: $$Props['text']

  /**
   * Sets the style of the text
   *
   * @type {PIXI.TextStyle}
   */
  export let style: $$Props['style'] = undefined

  /**
   * The anchor sets the origin point of the text.
   *
   * @type {PointLike}
   */
  export let anchor: $$Props['anchor'] = undefined

  /**
   * The blend mode to be applied to the sprite.
   * Apply a value of PIXI.BLEND_MODES.NORMAL to reset the blend mode.
   */
  export let blendMode: $$Props['blendMode'] = PIXI.BLEND_MODES.NORMAL

  /**
   * Plugin that is responsible for rendering this element.
   *
   * @type {string}
   */
  export let pluginName: $$Props['pluginName'] = undefined

  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   *
   * @type {boolean}
   */
  export let roundPixels: $$Props['roundPixels'] = undefined

  /**
   * The PIXI.Text instance. Can be set or bound to.
   *
   * @type {PIXI.Text}
   */
  export let instance: T = new PIXI.Text(text, style) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.Text>(instance)

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('text', text)
  $: applyProp('style', style)
  $: applyProp('anchor', anchor)
  $: applyProp('blendMode', blendMode)
  $: applyProp('pluginName', pluginName)
  $: applyProp('roundPixels', roundPixels)
</script>

<Container
  {...$$restProps}
  {instance}
  on:create
  on:click
  on:globalmousemove
  on:globalpointermove
  on:globaltouchmove
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
