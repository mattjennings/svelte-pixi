<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate, createEventDispatcher, onMount } from 'svelte'
  import { getRenderer } from '../core/context/renderer'
  import Container from './Container.svelte'
  import { createApplyProps } from '../core/util/props'
  import type { PointLike } from '../core/util/data-types'

  type T = $$Generic<PIXI.AnimatedSprite>
  type $$Props = Container<T>['$$prop_def'] & {
    textures: PIXI.AnimatedSprite['textures']
    playing?: boolean
    autoUpdate?: PIXI.AnimatedSprite['autoUpdate']
    animationSpeed?: PIXI.AnimatedSprite['animationSpeed']
    loop?: PIXI.AnimatedSprite['loop']
    anchor?: PointLike
    blendMode?: PIXI.AnimatedSprite['blendMode']
    roundPixels?: PIXI.AnimatedSprite['roundPixels']
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
   * Whether to use PIXI.Ticker.shared to auto update animation time
   *
   * @type {boolean}
   */
  export let autoUpdate: $$Props['autoUpdate'] = undefined

  /**
   * The speed that the AnimatedSprite will play at. Higher is faster, lower is slower.
   */
  export let animationSpeed: $$Props['animationSpeed'] = 1

  /**
   * Whether or not the animate sprite repeats after playing.
   */
  export let loop: $$Props['loop'] = true

  /**
   * Plays the animation according to the textures
   */
  export let playing: $$Props['playing'] = true

  /**
   * The array of textures to use
   *
   * @type {PIXI.Texture<PIXI.Resource>[] | PIXI.FrameObject[]}
   */
  export let textures: $$Props['textures'] = []

  /**
   * The PIXI.AnimatedSprite instance. Can be set or bound to.
   *
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.AnimatedSprite,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.AnimatedSprite will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MyAnimatedSprite extends PIXI.AnimatedSprite {
   *   myMethod() { ... }
   * }
   * const sprite = new MyAnimatedSprite(textures)
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <AnimatedSprite instance={sprite} />
   * ```
   *
   * @type {PIXI.AnimatedSprite}
   */
  export let instance: T = new PIXI.AnimatedSprite({
    textures,
    autoUpdate,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { applyProp } = createApplyProps<PIXI.AnimatedSprite, $$Props>(
    instance,
    {
      apply: {
        textures: (value, instance) => {
          instance.textures = value

          if (playing) {
            instance.play()
          }
        },
        playing: (value, instance) => {
          if (playing) {
            instance.play()
          } else {
            instance.stop()
          }
        },
      },
    },
  )

  const dispatch = createEventDispatcher()
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('anchor', anchor)
  $: applyProp('blendMode', blendMode)
  $: applyProp('roundPixels', roundPixels)
  $: applyProp('autoUpdate', autoUpdate)
  $: applyProp('animationSpeed', animationSpeed)
  $: applyProp('loop', loop)
  $: applyProp('textures', textures)
  $: applyProp('playing', playing)

  // trigger render if texture loads (was not preloaded)
  $: textures.forEach((texture) => texture.on('update', invalidate))

  onMount(() => {
    instance.onComplete = () => dispatch('complete')
    instance.onFrameChange = () => {
      dispatch('frameChange')
      invalidate()
    }
    instance.onLoop = () => dispatch('loop')
  })
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
