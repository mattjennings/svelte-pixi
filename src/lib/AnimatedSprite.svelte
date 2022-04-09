<script lang="ts">
  /**
   * @restProps {Sprite}
   */
  import * as PIXI from 'pixi.js'
  import { createEventDispatcher, onMount } from 'svelte'
  import Sprite from './Sprite.svelte'
  import { applyProp } from './util/props'

  type T = $$Generic<PIXI.AnimatedSprite>
  type $$Props = Sprite<T>['$$prop_def'] & {
    playing?: boolean
    textures?: PIXI.AnimatedSprite['textures']
    autoUpdate?: PIXI.AnimatedSprite['autoUpdate']
    animationSpeed?: PIXI.AnimatedSprite['animationSpeed']
    loop?: PIXI.AnimatedSprite['loop']
  }

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
   * @type {PIXI.AnimatedSprite}
   */
  export let instance: T = new PIXI.AnimatedSprite(textures, autoUpdate) as T

  const dispatch = createEventDispatcher()

  $: applyProp(instance, { autoUpdate })
  $: applyProp(instance, { animationSpeed })
  $: applyProp(instance, { loop })
  $: applyProp(instance, { textures }, (textures) => {
    instance.textures = textures
    if (playing) {
      instance.play()
    }
  })

  $: applyProp(instance, { playing }, (playing) => {
    if (playing) {
      instance.play()
    } else {
      instance.stop()
    }
  })

  onMount(() => {
    instance.onComplete = () => dispatch('complete')
    instance.onFrameChange = () => dispatch('frameChange')
    instance.onLoop = () => dispatch('loop')
  })
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
