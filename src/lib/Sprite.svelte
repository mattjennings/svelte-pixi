<script lang="ts">
  import { Sprite } from '@pixi/sprite'
  import { onMount } from 'svelte'
  import { shouldApplyProps } from './util'
  import Container from './Container.svelte'
  import type { PointLike } from '$lib/util/data-types'
  import { parsePoint } from '$lib/util/data-types'
  import { getPixiApp } from './util/context'

  // Sprite props
  export let anchor: PointLike = undefined
  export let blendMode: Sprite['blendMode'] = undefined
  export let pluginName: Sprite['pluginName'] = undefined
  export let roundPixels: Sprite['roundPixels'] = undefined
  export let texture: Sprite['texture'] = undefined
  export let tint: Sprite['tint'] = undefined

  // Container props
  export let height: Sprite['height'] = undefined
  export let width: Sprite['width'] = undefined
  export let sortableChildren: Sprite['sortableChildren'] = undefined
  export let interactiveChildren: Sprite['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: Sprite['accessible'] = undefined
  export let accessibleChildren: Sprite['accessibleChildren'] = true
  export let accessibleHint: Sprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: Sprite['accessiblePointerEvents'] = 'auto'
  export let accessibleTitle: Sprite['accessibleTitle'] = undefined
  export let accessibleType: Sprite['accessibleType'] = undefined
  export let alpha: Sprite['alpha'] = undefined
  export let angle: Sprite['angle'] = undefined
  export let buttonMode: Sprite['buttonMode'] = undefined
  export let cacheAsBitmap: Sprite['cacheAsBitmap'] = undefined
  export let cursor: Sprite['cursor'] = undefined
  export let filterArea: Sprite['filterArea'] = undefined
  export let filters: Sprite['filters'] = undefined
  export let hitArea: Sprite['hitArea'] = undefined
  export let interactive: Sprite['interactive'] = undefined
  export let mask: Sprite['mask'] = undefined
  export let name: Sprite['name'] = undefined
  export let pivot: Sprite['pivot'] = undefined
  export let position: PointLike = undefined
  export let renderable: Sprite['renderable'] = undefined
  export let rotation: Sprite['rotation'] = undefined
  export let scale: PointLike = undefined
  export let skew: PointLike = undefined
  export let transform: Sprite['transform'] = undefined
  export let visible: Sprite['visible'] = undefined
  export let x: Sprite['x'] = undefined
  export let y: Sprite['y'] = undefined
  export let zIndex: Sprite['zIndex'] = undefined

  /** @type {Sprite} Sprite instance to render */
  export let instance: Sprite = new Sprite()

  const app = getPixiApp()

  $: if (shouldApplyProps(anchor)) {
    const point = parsePoint(anchor)
    instance.anchor.set(point.x, point.y)
  }

  $: shouldApplyProps(blendMode) && (instance.blendMode = blendMode)
  $: shouldApplyProps(pluginName) && (instance.pluginName = pluginName)
  $: shouldApplyProps(roundPixels) && (instance.roundPixels = roundPixels)
  $: shouldApplyProps(texture) && (instance.texture = texture)
  $: shouldApplyProps(tint) && (instance.tint = tint)

  onMount(() => {
    async function updateProps() {
      anchor = instance.anchor
      blendMode = instance.blendMode
      pluginName = instance.pluginName
      roundPixels = instance.roundPixels
      texture = instance.texture
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

<Container
  bind:instance
  bind:accessible
  bind:accessibleChildren
  bind:accessibleHint
  bind:accessiblePointerEvents
  bind:accessibleTitle
  bind:accessibleType
  bind:alpha
  bind:angle
  bind:buttonMode
  bind:cacheAsBitmap
  bind:cursor
  bind:filterArea
  bind:filters
  bind:hitArea
  bind:interactive
  bind:mask
  bind:name
  bind:pivot
  bind:position
  bind:renderable
  bind:rotation
  bind:scale
  bind:skew
  bind:transform
  bind:visible
  bind:x
  bind:y
  bind:zIndex
  bind:height
  bind:width
  bind:interactiveChildren
  bind:sortableChildren
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
