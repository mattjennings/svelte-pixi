<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Graphics>
  type $$Props = Container<T>['$$prop_def'] & {
    draw?: (graphics: PIXI.Graphics) => any
    blendMode?: PIXI.Graphics['blendMode']
    pluginName?: PIXI.Graphics['pluginName']
    tint?: PIXI.Graphics['tint']
  }

  /**
   * Call your drawing functions on the PIXI.Graphics instance here
   * @type {(graphics: Graphics) => any}
   */
  export let draw: $$Props['draw'] = undefined

  /**
   * The blend mode to be applied to the graphic shape.
   * Apply a value of PIXI.BLEND_MODES.NORMAL to reset the blend mode.
   * Note that, since each primitive in the GraphicsGeometry list is rendered sequentially,
   * modes such as PIXI.BLEND_MODES.ADD and PIXI.BLEND_MODES.MULTIPLY will be applied per-primitive.
   *
   * @type {PIXI.BLEND_MODES}
   */
  export let blendMode: $$Props['blendMode'] = PIXI.BLEND_MODES.NORMAL

  /**
   * Renderer plugin for batching
   *
   * @type {string}
   */
  export let pluginName: $$Props['pluginName'] = undefined

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
   * @type {PIXI.Graphics}
   */
  export let instance: T = new PIXI.Graphics() as T

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  const { applyProp } = createApplyProps<PIXI.Graphics>(instance)

  $: applyProp('blendMode', blendMode)
  $: applyProp('pluginName', pluginName)
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
