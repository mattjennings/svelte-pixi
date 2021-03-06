<svelte:options immutable />

<script lang="ts">
  import type PIXI from 'pixi.js'
  import { TilingSprite } from 'pixi.js'
  import { getContext, onMount } from 'svelte'
  import { shouldApplyProps } from './util'
  import Sprite from './Sprite.svelte'
  const app = getContext<PIXI.Application>('pixi/app')

  // Sprite props
  export let anchor: PIXI.TilingSprite['anchor'] = undefined
  export let blendMode: PIXI.TilingSprite['blendMode'] = undefined
  export let pluginName: PIXI.TilingSprite['pluginName'] = undefined
  export let roundPixels: PIXI.TilingSprite['roundPixels'] = undefined
  export let texture: PIXI.TilingSprite['texture'] = undefined
  export let tint: PIXI.TilingSprite['tint'] = undefined

  // Container props
  export let height: PIXI.TilingSprite['height'] = undefined
  export let width: PIXI.TilingSprite['width'] = undefined
  export let sortableChildren: PIXI.TilingSprite['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.TilingSprite['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.TilingSprite['accessible'] = undefined
  export let accessibleChildren: PIXI.TilingSprite['accessibleChildren'] = true
  export let accessibleHint: PIXI.TilingSprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.TilingSprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.TilingSprite['accessibleTitle'] = undefined
  export let accessibleType: PIXI.TilingSprite['accessibleType'] = undefined
  export let alpha: PIXI.TilingSprite['alpha'] = undefined
  export let angle: PIXI.TilingSprite['angle'] = undefined
  export let buttonMode: PIXI.TilingSprite['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.TilingSprite['cacheAsBitmap'] = undefined
  export let cursor: PIXI.TilingSprite['cursor'] = undefined
  export let filterArea: PIXI.TilingSprite['filterArea'] = undefined
  export let filters: PIXI.TilingSprite['filters'] = undefined
  export let hitArea: PIXI.TilingSprite['hitArea'] = undefined
  export let interactive: PIXI.TilingSprite['interactive'] = undefined
  export let mask: PIXI.TilingSprite['mask'] = undefined
  export let name: PIXI.TilingSprite['name'] = undefined
  export let pivot: PIXI.TilingSprite['pivot'] = undefined
  export let position: PIXI.TilingSprite['position'] = undefined
  export let renderable: PIXI.TilingSprite['renderable'] = undefined
  export let rotation: PIXI.TilingSprite['rotation'] = undefined
  export let scale: PIXI.TilingSprite['scale'] = undefined
  export let skew: PIXI.TilingSprite['skew'] = undefined
  export let transform: PIXI.TilingSprite['transform'] = undefined
  export let visible: PIXI.TilingSprite['visible'] = undefined
  export let x: PIXI.TilingSprite['x'] = undefined
  export let y: PIXI.TilingSprite['y'] = undefined
  export let zIndex: PIXI.TilingSprite['zIndex'] = undefined

  // TilingSprite props
  export let clampMargin: PIXI.TilingSprite['clampMargin'] = undefined
  export let tileTransform: PIXI.TilingSprite['tileTransform'] = undefined
  export let uvMatrix: PIXI.TilingSprite['uvMatrix'] = undefined
  export let uvRespectAnchor: PIXI.TilingSprite['uvRespectAnchor'] = undefined
  export let tilePosition: PIXI.TilingSprite['tilePosition'] = undefined

  /** @type {PIXI.TilingSprite} PIXI.TilingSprite instance to render */
  export let instance: PIXI.TilingSprite = new TilingSprite(
    texture,
    width,
    height
  )

  $: shouldApplyProps(clampMargin) && (instance.clampMargin = clampMargin)
  $: shouldApplyProps(tileTransform) && (instance.tileTransform = tileTransform)
  $: shouldApplyProps(tilePosition) && (instance.tilePosition = tilePosition)
  $: shouldApplyProps(uvMatrix) && (instance.uvMatrix = uvMatrix)
  $: shouldApplyProps(uvRespectAnchor) &&
    (instance.uvRespectAnchor = uvRespectAnchor)

  onMount(() => {
    async function updateProps() {
      clampMargin = instance.clampMargin
      tileTransform = instance.tileTransform
      uvMatrix = instance.uvMatrix
      uvRespectAnchor = instance.uvRespectAnchor
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
