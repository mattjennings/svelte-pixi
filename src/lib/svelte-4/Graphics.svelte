<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.Graphics>
  type $$Props = Container<T>['$$prop_def'] & {
    draw?: (graphics: PIXI.Graphics) => any
    blendMode?: PIXI.Graphics['blendMode']
    tint?: PIXI.Graphics['tint']
  }

  /**
   * Call your drawing functions on the PIXI.Graphics instance here
   * @type {(graphics: Graphics) => any}
   */
  export let draw: $$Props['draw'] = undefined

  /**
   * The blend mode to be applied to the graphic shape.
   * Apply a value of 'normal' to reset the blend mode.
   * Note that, since each primitive in the GraphicsGeometry list is rendered sequentially,
   * modes such as PIXI.BLEND_MODES.ADD and PIXI.BLEND_MODES.MULTIPLY will be applied per-primitive.
   *
   * @type {PIXI.BLEND_MODES}
   */
  export let blendMode: $$Props['blendMode'] = 'normal'

  /**
   * The tint applied to each graphic shape. This is a hex value.
   * A value of 0xFFFFFF will remove any tint effect.
   *
   * @type {number}
   */
  export let tint: $$Props['tint'] = 0xffffff

  /**
   * The PIXI.Graphics instance. Can be set or bound to.
   *
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.Graphics,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.Graphics will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MyGraphics extends PIXI.Graphics {
   *   myMethod() { ... }
   * }
   * const graphics = new MyGraphics()
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <Graphics instance={graphics} />
   * ```
   *
   * @type {PIXI.Graphics}
   */
  export let instance: T = new PIXI.Graphics({
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  const { applyProp } = createApplyProps<PIXI.Graphics>(instance)

  $: applyProp('blendMode', blendMode)
  $: applyProp('tint', tint)
  $: draw?.(instance)
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
