<script lang="ts">
  /**
   * @restProps {Container}
   */

  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import { getRenderer } from './Renderer.svelte'
  import Container from './Container.svelte'
  import type { PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.TilingSprite>
  type $$Props = Container<T>['$$prop_def'] & {
    texture: PIXI.Sprite['texture']
    height: PIXI.TilingSprite['height']
    width: PIXI.TilingSprite['width']
    clampMargin?: PIXI.TilingSprite['clampMargin']
    tileTransform?: PIXI.TilingSprite['tileTransform']
    uvMatrix?: PIXI.TilingSprite['uvMatrix']
    uvRespectAnchor?: PIXI.TilingSprite['uvRespectAnchor']
    tilePosition?: PointLike
    anchor?: PointLike
    blendMode?: PIXI.Sprite['blendMode']
    pluginName?: PIXI.Sprite['pluginName']
    roundPixels?: PIXI.Sprite['roundPixels']
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
   * Changes frame clamping in corresponding textureTransform, shortcut.
   * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
   */
  export let clampMargin: $$Props['clampMargin'] = 0.5

  /**
   * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set.
   *
   * @type {number}
   */
  export let height: $$Props['height']

  /**
   * The texture of the tiling sprite.
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * The offset of the image that is being tiled.
   *
   * @type {PointLike}
   */
  export let tilePosition: $$Props['tilePosition'] = undefined

  /**
   * Tile transform
   *
   * @type {PIXI.Transform}
   */
  export let tileTransform: $$Props['tileTransform'] = undefined

  /**
   * Matrix that is applied to UV to get the coords in Texture normalized space to coords in BaseTexture space.
   *
   * @type {PIXI.TextureMatrix}
   */
  export let uvMatrix: $$Props['uvMatrix'] = undefined

  /**
   * Flags whether the tiling pattern should originate from the origin instead
   * of the top-left corner in local space.
   *
   * This will make the texture coordinates assigned to each vertex dependent on the value of the anchor.
   * Without this, the top-left corner always gets the (0, 0) texture coordinate.
   *
   * @type {boolean}
   */
  export let uvRespectAnchor: $$Props['uvRespectAnchor'] = undefined

  /**
   * The width of the sprite, setting this will actually modify the scale to achieve the value set.
   *
   * @type {number}
   */
  export let width: $$Props['width']

  /**
   * The PIXI.TilingSprite instance. Can be set or bound to.
   *
   * @type {PIXI.TilingSprite}
   */
  export let instance: T = new PIXI.TilingSprite(texture, width, height) as T

  const { applyProp } = createApplyProps<PIXI.TilingSprite>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('anchor', anchor)
  $: applyProp('blendMode', blendMode)
  $: applyProp('pluginName', pluginName)
  $: applyProp('roundPixels', roundPixels)
  $: applyProp('clampMargin', clampMargin)
  $: applyProp('height', height)
  $: applyProp('texture', texture)
  $: applyProp('tilePosition', tilePosition)
  $: applyProp('tileTransform', tileTransform)
  $: applyProp('uvMatrix', uvMatrix)
  $: applyProp('uvRespectAnchor', uvRespectAnchor)
  $: applyProp('width', width)
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
