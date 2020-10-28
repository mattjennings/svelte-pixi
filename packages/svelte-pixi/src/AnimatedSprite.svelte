<script lang="ts">
  import type PIXI from 'pixi.js'
  import { AnimatedSprite } from '@pixi/sprite-animated'
  import { createEventDispatcher, getContext, onMount, tick } from 'svelte'
  import Sprite from './Sprite.svelte'
  import { shouldApplyProps, warning } from './util'

  // Sprite props
  export let anchor: PIXI.AnimatedSprite['anchor'] = undefined
  export let blendMode: PIXI.AnimatedSprite['blendMode'] = undefined
  export let pluginName: PIXI.AnimatedSprite['pluginName'] = undefined
  export let roundPixels: PIXI.AnimatedSprite['roundPixels'] = undefined
  export let texture: PIXI.AnimatedSprite['texture'] = undefined
  export let tint: PIXI.AnimatedSprite['tint'] = undefined

  // Container props
  export let height: PIXI.AnimatedSprite['height'] = undefined
  export let width: PIXI.AnimatedSprite['width'] = undefined
  export let sortableChildren: PIXI.AnimatedSprite['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.AnimatedSprite['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.AnimatedSprite['accessible'] = undefined
  export let accessibleChildren: PIXI.AnimatedSprite['accessibleChildren'] = true
  export let accessibleHint: PIXI.AnimatedSprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.AnimatedSprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.AnimatedSprite['accessibleTitle'] = undefined
  export let accessibleType: PIXI.AnimatedSprite['accessibleType'] = undefined
  export let alpha: PIXI.AnimatedSprite['alpha'] = undefined
  export let angle: PIXI.AnimatedSprite['angle'] = undefined
  export let buttonMode: PIXI.AnimatedSprite['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.AnimatedSprite['cacheAsBitmap'] = undefined
  export let cursor: PIXI.AnimatedSprite['cursor'] = undefined
  export let filterArea: PIXI.AnimatedSprite['filterArea'] = undefined
  export let filters: PIXI.AnimatedSprite['filters'] = undefined
  export let hitArea: PIXI.AnimatedSprite['hitArea'] = undefined
  export let interactive: PIXI.AnimatedSprite['interactive'] = undefined
  export let mask: PIXI.AnimatedSprite['mask'] = undefined
  export let name: PIXI.AnimatedSprite['name'] = undefined
  export let pivot: PIXI.AnimatedSprite['pivot'] = undefined
  export let position: PIXI.AnimatedSprite['position'] = undefined
  export let renderable: PIXI.AnimatedSprite['renderable'] = undefined
  export let rotation: PIXI.AnimatedSprite['rotation'] = undefined
  export let scale: PIXI.AnimatedSprite['scale'] = undefined
  export let skew: PIXI.AnimatedSprite['skew'] = undefined
  export let transform: PIXI.AnimatedSprite['transform'] = undefined
  export let visible: PIXI.AnimatedSprite['visible'] = undefined
  export let x: PIXI.AnimatedSprite['x'] = undefined
  export let y: PIXI.AnimatedSprite['y'] = undefined
  export let zIndex: PIXI.AnimatedSprite['zIndex'] = undefined

  // AnimatedSprite props
  export let autoUpdate: PIXI.AnimatedSprite['autoUpdate'] = undefined
  export let animationSpeed: PIXI.AnimatedSprite['animationSpeed'] = undefined
  export let playing: PIXI.AnimatedSprite['playing'] = true
  export let textures: PIXI.AnimatedSprite['textures']

  /** @type {PIXI.AnimatedSprite} PIXI.AnimatedSprite instance to render */
  export let instance: PIXI.AnimatedSprite = new AnimatedSprite(
    textures,
    autoUpdate
  )

  const app = getContext<PIXI.Application>('pixi/app')
  const dispatch = createEventDispatcher()

  $: shouldApplyProps(autoUpdate) && (instance.autoUpdate = autoUpdate)
  $: shouldApplyProps(playing) && (playing ? instance.play() : instance.stop())
  $: if (shouldApplyProps(textures)) {
    instance.textures = textures

    if (playing) {
      instance.play()
    }
  }
  $: shouldApplyProps(animationSpeed) &&
    (instance.animationSpeed = animationSpeed)

  onMount(() => {
    instance.onComplete = () => dispatch('complete')
    instance.onFrameChange = () => dispatch('frameChange')
    instance.onLoop = () => dispatch('loop')

    async function updateProps() {
      await tick()

      autoUpdate = instance.autoUpdate
      playing = instance.playing
      textures = instance.textures
      animationSpeed = instance.animationSpeed
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

<svelte:options immutable />
<Sprite
  bind:instance
  bind:accessible
  bind:accessibleChildren
  bind:accessibleHint
  bind:accessiblePointerEvents
  bind:accessibleTitle
  bind:accessibleType
  bind:alpha
  bind:anchor
  bind:angle
  bind:blendMode
  bind:buttonMode
  bind:cacheAsBitmap
  bind:cursor
  bind:filterArea
  bind:filters
  bind:height
  bind:hitArea
  bind:interactive
  bind:interactiveChildren
  bind:mask
  bind:name
  bind:pivot
  bind:pluginName
  bind:position
  bind:renderable
  bind:rotation
  bind:roundPixels
  bind:scale
  bind:skew
  bind:sortableChildren
  bind:texture
  bind:tint
  bind:transform
  bind:visible
  bind:width
  bind:x
  bind:y
  bind:zIndex>
  <slot />
</Sprite>
