<svelte:options immutable />

<script lang="ts">
  import { Text } from '@pixi/text'
  import { getContext, onMount } from 'svelte'
  import { shouldApplyProps } from './util'
  import Sprite from './Sprite.svelte'
  import type { PointLike } from '$lib/util/data-types'
  import { getPixiApp } from './util/context'

  // text props
  export let text: Text['text']
  export let style: Text['style'] = undefined

  // Sprite props
  export let anchor: PointLike = undefined
  export let blendMode: Text['blendMode'] = undefined
  export let pluginName: Text['pluginName'] = undefined
  export let roundPixels: Text['roundPixels'] = undefined
  export let texture: Text['texture'] = undefined
  export let tint: Text['tint'] = undefined

  // Container props
  export let height: Text['height'] = undefined
  export let width: Text['width'] = undefined
  export let sortableChildren: Text['sortableChildren'] = undefined
  export let interactiveChildren: Text['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: Text['accessible'] = undefined
  export let accessibleChildren: Text['accessibleChildren'] = true
  export let accessibleHint: Text['accessibleHint'] = undefined
  export let accessiblePointerEvents: Text['accessiblePointerEvents'] = 'auto'
  export let accessibleTitle: Text['accessibleTitle'] = undefined
  export let accessibleType: Text['accessibleType'] = undefined
  export let alpha: Text['alpha'] = undefined
  export let angle: Text['angle'] = undefined
  export let buttonMode: Text['buttonMode'] = undefined
  export let cacheAsBitmap: Text['cacheAsBitmap'] = undefined
  export let cursor: Text['cursor'] = undefined
  export let filterArea: Text['filterArea'] = undefined
  export let filters: Text['filters'] = undefined
  export let hitArea: Text['hitArea'] = undefined
  export let interactive: Text['interactive'] = undefined
  export let mask: Text['mask'] = undefined
  export let name: Text['name'] = undefined
  export let pivot: Text['pivot'] = undefined
  export let position: Text['position'] = undefined
  export let renderable: Text['renderable'] = undefined
  export let rotation: Text['rotation'] = undefined
  export let scale: Text['scale'] = undefined
  export let skew: Text['skew'] = undefined
  export let transform: Text['transform'] = undefined
  export let visible: Text['visible'] = undefined
  export let x: Text['x'] = undefined
  export let y: Text['y'] = undefined
  export let zIndex: Text['zIndex'] = undefined

  export let instance: Text = new Text(text, style)

  const app = getPixiApp()

  $: shouldApplyProps(text) && (instance.text = text)
  $: shouldApplyProps(style) && (instance.style = style)

  onMount(() => {
    async function updateProps() {
      text = instance.text
      style = instance.style
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
