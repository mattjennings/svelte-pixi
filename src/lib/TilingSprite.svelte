<svelte:options immutable />

<script context="module">
  import { TilingSpriteRenderer } from '@pixi/sprite-tiling'
  import { registerRendererPlugin } from './Pixi.svelte'

  registerRendererPlugin('tilingSprite', TilingSpriteRenderer)
</script>

<script lang="ts">
  import { TilingSprite } from '@pixi/sprite-tiling'
  import { onMount } from 'svelte'
  import { shouldApplyProps } from './util'
  import Sprite from './Sprite.svelte'
  import { parsePoint, type PointLike } from './util/data-types'
  import { getPixiApp } from './util/context'

  const app = getPixiApp()

  // Sprite props
  export let anchor: PointLike = undefined
  export let blendMode: TilingSprite['blendMode'] = undefined
  export let pluginName: TilingSprite['pluginName'] = undefined
  export let roundPixels: TilingSprite['roundPixels'] = undefined
  export let texture: TilingSprite['texture'] = undefined
  export let tint: TilingSprite['tint'] = undefined

  // Container props
  export let height: TilingSprite['height'] = undefined
  export let width: TilingSprite['width'] = undefined
  export let sortableChildren: TilingSprite['sortableChildren'] = undefined
  export let interactiveChildren: TilingSprite['interactiveChildren'] =
    undefined

  // DisplayObject props
  export let accessible: TilingSprite['accessible'] = undefined
  export let accessibleChildren: TilingSprite['accessibleChildren'] = true
  export let accessibleHint: TilingSprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: TilingSprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: TilingSprite['accessibleTitle'] = undefined
  export let accessibleType: TilingSprite['accessibleType'] = undefined
  export let alpha: TilingSprite['alpha'] = undefined
  export let angle: TilingSprite['angle'] = undefined
  export let buttonMode: TilingSprite['buttonMode'] = undefined
  export let cacheAsBitmap: TilingSprite['cacheAsBitmap'] = undefined
  export let cursor: TilingSprite['cursor'] = undefined
  export let filterArea: TilingSprite['filterArea'] = undefined
  export let filters: TilingSprite['filters'] = undefined
  export let hitArea: TilingSprite['hitArea'] = undefined
  export let interactive: TilingSprite['interactive'] = undefined
  export let mask: TilingSprite['mask'] = undefined
  export let name: TilingSprite['name'] = undefined
  export let pivot: TilingSprite['pivot'] = undefined
  export let position: PointLike = undefined
  export let renderable: TilingSprite['renderable'] = undefined
  export let rotation: TilingSprite['rotation'] = undefined
  export let scale: PointLike = undefined
  export let skew: PointLike = undefined
  export let transform: TilingSprite['transform'] = undefined
  export let visible: TilingSprite['visible'] = undefined
  export let x: TilingSprite['x'] = undefined
  export let y: TilingSprite['y'] = undefined
  export let zIndex: TilingSprite['zIndex'] = undefined

  // TilingSprite props
  export let clampMargin: TilingSprite['clampMargin'] = undefined
  export let tileTransform: TilingSprite['tileTransform'] = undefined
  export let uvMatrix: TilingSprite['uvMatrix'] = undefined
  export let uvRespectAnchor: TilingSprite['uvRespectAnchor'] = undefined
  export let tilePosition: PointLike = undefined

  /** @type {TilingSprite} TilingSprite instance to render */
  export let instance: TilingSprite = new TilingSprite(texture, width, height)

  $: shouldApplyProps(clampMargin) && (instance.clampMargin = clampMargin)
  $: shouldApplyProps(tileTransform) && (instance.tileTransform = tileTransform)
  $: if (shouldApplyProps(tilePosition)) {
    const point = parsePoint(tilePosition)
    instance.tilePosition.set(point.x, point.y)
  }
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
