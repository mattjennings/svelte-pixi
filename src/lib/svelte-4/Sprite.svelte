<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'

  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import type { PointLike } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.Sprite>
  type $$Props = Container<T>['$$prop_def'] & {
    anchor?: PointLike
    blendMode?: PIXI.Sprite['blendMode']
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
   * Apply a value of 'normal' to reset the blend mode.
   */
  export let blendMode: $$Props['blendMode'] = 'normal'

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
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.Sprite,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.Sprite will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MySprite extends PIXI.Sprite {
   *   myMethod() { ... }
   * }
   * const sprite = new MySprite()
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <Sprite instance={sprite} />
   * ```
   *
   * @type {PIXI.Sprite}
   */
  export let instance: T = new PIXI.Sprite({
    texture,
    roundPixels,
    blendMode,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { applyProp } = createApplyProps<PIXI.Sprite>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('anchor', anchor)
  $: applyProp('blendMode', blendMode)
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
