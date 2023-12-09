<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'

  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Sprite>
  type $$Props = Container<T>['$$prop_def'] & {
    anchor?: PointLike
    blendMode?: PIXI.Sprite['blendMode']
    pluginName?: PIXI.Sprite['pluginName']
    roundPixels?: PIXI.Sprite['roundPixels']
    texture: PIXI.Sprite['texture']
  }

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
   * The texture that the sprite is using.
   *
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * The PIXI.Sprite instance. Can be set or bound to.
   *
   * @type {PIXI.Sprite}
   */
  export let instance: T = new PIXI.Sprite(texture) as T

  const { applyProp } = createApplyProps<PIXI.Sprite>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('anchor', anchor)
  $: applyProp('blendMode', blendMode)
  $: applyProp('pluginName', pluginName)
  $: applyProp('roundPixels', roundPixels)
  $: applyProp('texture', texture)
  $: texture.on('update', () => invalidate())
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
