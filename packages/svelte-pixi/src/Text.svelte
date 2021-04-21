<script lang="ts">
  import type PIXI from 'pixi.js'
  import { Text, TEXT_GRADIENT } from '@pixi/text'
  import { getContext, onMount } from 'svelte'
  import { shouldApplyProps } from './util'
  import Sprite from './Sprite.svelte'

  // text props
  export let text: PIXI.Text['text']
  export let style: PIXI.Text['style']

  // Sprite props
  export let anchor: PIXI.Text['anchor'] = undefined
  export let blendMode: PIXI.Text['blendMode'] = undefined
  export let pluginName: PIXI.Text['pluginName'] = undefined
  export let roundPixels: PIXI.Text['roundPixels'] = undefined
  export let texture: PIXI.Text['texture'] = undefined
  export let tint: PIXI.Text['tint'] = undefined

  // Container props
  export let height: PIXI.Text['height'] = undefined
  export let width: PIXI.Text['width'] = undefined
  export let sortableChildren: PIXI.Text['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Text['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.Text['accessible'] = undefined
  export let accessibleChildren: PIXI.Text['accessibleChildren'] = true
  export let accessibleHint: PIXI.Text['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.Text['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.Text['accessibleTitle'] = undefined
  export let accessibleType: PIXI.Text['accessibleType'] = undefined
  export let alpha: PIXI.Text['alpha'] = undefined
  export let angle: PIXI.Text['angle'] = undefined
  export let buttonMode: PIXI.Text['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.Text['cacheAsBitmap'] = undefined
  export let cursor: PIXI.Text['cursor'] = undefined
  export let filterArea: PIXI.Text['filterArea'] = undefined
  export let filters: PIXI.Text['filters'] = undefined
  export let hitArea: PIXI.Text['hitArea'] = undefined
  export let interactive: PIXI.Text['interactive'] = undefined
  export let mask: PIXI.Text['mask'] = undefined
  export let name: PIXI.Text['name'] = undefined
  export let pivot: PIXI.Text['pivot'] = undefined
  export let position: PIXI.Text['position'] = undefined
  export let renderable: PIXI.Text['renderable'] = undefined
  export let rotation: PIXI.Text['rotation'] = undefined
  export let scale: PIXI.Text['scale'] = undefined
  export let skew: PIXI.Text['skew'] = undefined
  export let transform: PIXI.Text['transform'] = undefined
  export let visible: PIXI.Text['visible'] = undefined
  export let x: PIXI.Text['x'] = undefined
  export let y: PIXI.Text['y'] = undefined
  export let zIndex: PIXI.Text['zIndex'] = undefined

  export let instance: PIXI.Text = new Text(text, style)

  const app = getContext<PIXI.Application>('pixi/app')

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
  on:removed>
  <slot />
</Sprite>
