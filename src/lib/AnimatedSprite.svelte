<svelte:options immutable />

<script lang="ts">
  import { AnimatedSprite } from '@pixi/sprite-animated'
  import { createEventDispatcher, onMount } from 'svelte'
  import Sprite from './Sprite.svelte'
  import { shouldApplyProps } from './util'
  import type { PointLike } from '$lib/util/data-types'
  import { getPixiApp } from './util/context'

  // Sprite props
  export let anchor: PointLike = undefined
  export let blendMode: AnimatedSprite['blendMode'] = undefined
  export let pluginName: AnimatedSprite['pluginName'] = undefined
  export let roundPixels: AnimatedSprite['roundPixels'] = undefined
  export let texture: AnimatedSprite['texture'] = undefined
  export let tint: AnimatedSprite['tint'] = undefined

  // Container props
  export let height: AnimatedSprite['height'] = undefined
  export let width: AnimatedSprite['width'] = undefined
  export let sortableChildren: AnimatedSprite['sortableChildren'] = undefined
  export let interactiveChildren: AnimatedSprite['interactiveChildren'] =
    undefined

  // DisplayObject props
  export let accessible: AnimatedSprite['accessible'] = undefined
  export let accessibleChildren: AnimatedSprite['accessibleChildren'] = true
  export let accessibleHint: AnimatedSprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: AnimatedSprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: AnimatedSprite['accessibleTitle'] = undefined
  export let accessibleType: AnimatedSprite['accessibleType'] = undefined
  export let alpha: AnimatedSprite['alpha'] = undefined
  export let angle: AnimatedSprite['angle'] = undefined
  export let buttonMode: AnimatedSprite['buttonMode'] = undefined
  export let cacheAsBitmap: AnimatedSprite['cacheAsBitmap'] = undefined
  export let cursor: AnimatedSprite['cursor'] = undefined
  export let filterArea: AnimatedSprite['filterArea'] = undefined
  export let filters: AnimatedSprite['filters'] = undefined
  export let hitArea: AnimatedSprite['hitArea'] = undefined
  export let interactive: AnimatedSprite['interactive'] = undefined
  export let mask: AnimatedSprite['mask'] = undefined
  export let name: AnimatedSprite['name'] = undefined
  export let pivot: AnimatedSprite['pivot'] = undefined
  export let position: PointLike = undefined
  export let renderable: AnimatedSprite['renderable'] = undefined
  export let rotation: AnimatedSprite['rotation'] = undefined
  export let scale: PointLike = undefined
  export let skew: PointLike = undefined
  export let transform: AnimatedSprite['transform'] = undefined
  export let visible: AnimatedSprite['visible'] = undefined
  export let x: AnimatedSprite['x'] = undefined
  export let y: AnimatedSprite['y'] = undefined
  export let zIndex: AnimatedSprite['zIndex'] = undefined

  // AnimatedSprite props
  export let autoUpdate: AnimatedSprite['autoUpdate'] = undefined
  export let animationSpeed: AnimatedSprite['animationSpeed'] = undefined
  export let playing: AnimatedSprite['playing'] = true
  export let textures: AnimatedSprite['textures']

  /** @type {AnimatedSprite} AnimatedSprite instance to render */
  export let instance: AnimatedSprite = new AnimatedSprite(textures, autoUpdate)

  const app = getPixiApp()
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
      autoUpdate = instance.autoUpdate
      playing = instance.playing
      textures = instance.textures
      animationSpeed = instance.animationSpeed
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

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
  bind:zIndex
>
  <slot />
</Sprite>
