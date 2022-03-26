<script context="module" lang="ts">
  export interface AnimatedSpriteComponentProps<
    Instance extends PixiAnimatedSprite = PixiAnimatedSprite
  > extends ExtractProps<PixiAnimatedSprite>,
      ExtractProps<GlobalMixins.AnimatedSprite> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import { AnimatedSprite as PixiAnimatedSprite } from '@pixi/sprite-animated'
  import { createEventDispatcher, onMount } from 'svelte'
  import Sprite, { type SpriteComponentProps } from './Sprite.svelte'
  import { applyProps, type ExtractProps } from './util/props'

  type T = $$Generic<PixiAnimatedSprite>
  type $$Props = AnimatedSpriteComponentProps<T> & SpriteComponentProps<T>

  // AnimatedSprite props
  export let playing: $$Props['playing'] = true
  export let textures: $$Props['textures'] = []

  /** @type {AnimatedSprite} AnimatedSprite instance to render */
  export let instance: PixiAnimatedSprite = new PixiAnimatedSprite(
    textures,
    $$props.autoUpdate
  )

  const dispatch = createEventDispatcher()

  $: {
    const props = { playing, textures }
    applyProps(instance, props, {
      apply: {
        playing: (instance, value) => {
          if (value) {
            instance.play()
          } else {
            instance.stop()
          }
        },
        textures: (instance, textures) => {
          instance.textures = textures
          if (playing) {
            instance.play()
          }
        },
      },
    })
  }

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
