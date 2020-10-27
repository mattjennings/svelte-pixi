<script lang="ts">
  import type PIXI from 'pixi.js'
  import { Sprite } from '@pixi/sprite'
  import { onMount, getContext, tick } from 'svelte'
  import { shouldApplyProps } from './util'
  import DisplayObject from './DisplayObject.svelte'
  import Container from './Container.svelte'

  // Sprite props
  export let anchor: PIXI.Sprite['anchor'] = undefined
  export let blendMode: PIXI.Sprite['blendMode'] = undefined
  export let pluginName: PIXI.Sprite['pluginName'] = undefined
  export let roundPixels: PIXI.Sprite['roundPixels'] = undefined
  export let texture: PIXI.Sprite['texture'] = undefined

  export let tint: PIXI.Sprite['tint'] = undefined

  // Container props
  export let height: PIXI.Sprite['height'] = undefined
  export let width: PIXI.Sprite['width'] = undefined
  export let sortableChildren: PIXI.Sprite['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Sprite['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.Sprite['accessible'] = undefined
  export let accessibleChildren: PIXI.Sprite['accessibleChildren'] = true
  export let accessibleHint: PIXI.Sprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.Sprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.Sprite['accessibleTitle'] = undefined
  export let accessibleType: PIXI.Sprite['accessibleType'] = undefined
  export let alpha: PIXI.Sprite['alpha'] = undefined
  export let angle: PIXI.Sprite['angle'] = undefined
  export let buttonMode: PIXI.Sprite['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.Sprite['cacheAsBitmap'] = undefined
  export let cursor: PIXI.Sprite['cursor'] = undefined
  export let filterArea: PIXI.Sprite['filterArea'] = undefined
  export let filters: PIXI.Sprite['filters'] = undefined
  export let hitArea: PIXI.Sprite['hitArea'] = undefined
  export let interactive: PIXI.Sprite['interactive'] = undefined
  export let mask: PIXI.Sprite['mask'] = undefined
  export let name: PIXI.Sprite['name'] = undefined
  export let pivot: PIXI.Sprite['pivot'] = undefined
  export let position: PIXI.Sprite['position'] = undefined
  export let renderable: PIXI.Sprite['renderable'] = undefined
  export let rotation: PIXI.Sprite['rotation'] = undefined
  export let scale: PIXI.Sprite['scale'] = undefined
  export let skew: PIXI.Sprite['skew'] = undefined
  export let transform: PIXI.Sprite['transform'] = undefined
  export let visible: PIXI.Sprite['visible'] = undefined
  export let x: PIXI.Sprite['x'] = undefined
  export let y: PIXI.Sprite['y'] = undefined
  export let zIndex: PIXI.Sprite['zIndex'] = undefined

  /** @type {PIXI.Sprite} PIXI.Sprite instance to render */
  export let instance: PIXI.Sprite = new Sprite()

  const app = getContext<PIXI.Application>('pixi/app')

  $: shouldApplyProps(anchor) && (instance.anchor = anchor)
  $: shouldApplyProps(blendMode) && (instance.blendMode = blendMode)
  $: shouldApplyProps(pluginName) && (instance.pluginName = pluginName)
  $: shouldApplyProps(roundPixels) && (instance.roundPixels = roundPixels)
  $: shouldApplyProps(texture) && (instance.texture = texture)
  $: shouldApplyProps(tint) && (instance.tint = tint)

  onMount(() => {
    async function updateProps() {
      await tick()

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

<DisplayObject
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
  bind:zIndex>
  <Container
    {instance}
    bind:height
    bind:width
    bind:interactiveChildren
    bind:sortableChildren>
    <slot />
  </Container>
</DisplayObject>
