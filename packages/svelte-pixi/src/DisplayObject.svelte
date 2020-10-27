<script lang="ts">
  /**
   * Handles the application of properties for objects that extend DisplayObject
   */
  import type * as PIXI from 'pixi.js'
  import { getContext, onMount, tick } from 'svelte'
  import { addPixiInstance, shouldApplyProps } from './util'

  export let accessible: PIXI.DisplayObject['accessible'] = undefined
  export let accessibleChildren: PIXI.DisplayObject['accessibleChildren'] = true
  export let accessibleHint: PIXI.DisplayObject['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.DisplayObject['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.DisplayObject['accessibleTitle'] = undefined
  export let accessibleType: PIXI.DisplayObject['accessibleType'] = undefined
  export let alpha: PIXI.DisplayObject['alpha'] = undefined
  export let angle: PIXI.DisplayObject['angle'] = undefined
  export let buttonMode: PIXI.DisplayObject['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.DisplayObject['cacheAsBitmap'] = undefined
  export let cursor: PIXI.DisplayObject['cursor'] = undefined
  export let filterArea: PIXI.DisplayObject['filterArea'] = undefined
  export let filters: PIXI.DisplayObject['filters'] = undefined
  export let hitArea: PIXI.DisplayObject['hitArea'] = undefined
  export let interactive: PIXI.DisplayObject['interactive'] = undefined
  export let mask: PIXI.DisplayObject['mask'] = undefined
  export let name: PIXI.DisplayObject['name'] = undefined
  export let pivot: PIXI.DisplayObject['pivot'] = undefined
  export let position: PIXI.DisplayObject['position'] = undefined
  export let renderable: PIXI.DisplayObject['renderable'] = undefined
  export let rotation: PIXI.DisplayObject['rotation'] = undefined
  export let scale: PIXI.DisplayObject['scale'] = undefined
  export let skew: PIXI.DisplayObject['skew'] = undefined
  export let transform: PIXI.DisplayObject['transform'] = undefined
  export let visible: PIXI.DisplayObject['visible'] = undefined
  export let x: PIXI.DisplayObject['x'] = undefined
  export let y: PIXI.DisplayObject['y'] = undefined
  export let zIndex: PIXI.DisplayObject['zIndex'] = undefined

  /** @type {PIXI.DisplayObject} PIXI.DisplayObject instance to render */
  export let instance: PIXI.DisplayObject

  const app = getContext<PIXI.Application>('pixi/app')

  const removeSelf = addPixiInstance(instance)
  onMount(() => removeSelf)

  $: shouldApplyProps(alpha) && (instance.alpha = alpha)
  $: shouldApplyProps(accessible) && (instance.accessible = accessible)
  $: shouldApplyProps(accessibleChildren) &&
    (instance.accessibleChildren = accessibleChildren)
  $: shouldApplyProps(accessibleHint) &&
    (instance.accessibleHint = accessibleHint)
  $: shouldApplyProps(accessiblePointerEvents) &&
    (instance.accessiblePointerEvents = accessiblePointerEvents)
  $: shouldApplyProps(accessibleTitle) &&
    (instance.accessibleTitle = accessibleTitle)
  $: shouldApplyProps(accessibleType) &&
    (instance.accessibleType = accessibleType)
  $: shouldApplyProps(angle) && (instance.angle = angle)
  $: shouldApplyProps(buttonMode) && (instance.buttonMode = buttonMode)
  $: shouldApplyProps(cacheAsBitmap) && (instance.cacheAsBitmap = cacheAsBitmap)
  $: shouldApplyProps(cursor) && (instance.cursor = cursor)
  $: shouldApplyProps(filterArea) && (instance.filterArea = filterArea)
  $: shouldApplyProps(filters) && (instance.filters = filters)
  $: shouldApplyProps(hitArea) && (instance.hitArea = hitArea)
  $: shouldApplyProps(interactive) && (instance.interactive = interactive)
  $: shouldApplyProps(mask) && (instance.mask = mask)
  $: shouldApplyProps(name) && (instance.name = name)
  $: shouldApplyProps(pivot) && (instance.pivot = pivot)
  $: shouldApplyProps(position) && (instance.position = position)
  $: shouldApplyProps(renderable) && (instance.renderable = renderable)
  $: shouldApplyProps(rotation) && (instance.rotation = rotation)
  $: shouldApplyProps(scale) && (instance.scale = scale)
  $: shouldApplyProps(skew) && (instance.skew = skew)
  $: shouldApplyProps(transform) && (instance.transform = transform)
  $: shouldApplyProps(visible) && (instance.visible = visible)
  $: shouldApplyProps(x) && (instance.x = x)
  $: shouldApplyProps(y) && (instance.y = y)
  $: shouldApplyProps(zIndex) && (instance.zIndex = zIndex)

  onMount(() => {
    async function updateProps() {
      await tick()
      alpha = instance.alpha
      accessible = instance.accessible
      accessibleChildren = instance.accessibleChildren
      accessibleHint = instance.accessibleHint
      accessiblePointerEvents = instance.accessiblePointerEvents
      accessibleTitle = instance.accessibleTitle
      accessibleType = instance.accessibleType
      angle = instance.angle
      buttonMode = instance.buttonMode
      cacheAsBitmap = instance.cacheAsBitmap
      cursor = instance.cursor
      filterArea = instance.filterArea
      filters = instance.filters
      hitArea = instance.hitArea
      interactive = instance.interactive
      mask = instance.mask
      name = instance.name
      pivot = instance.pivot
      position = instance.position
      renderable = instance.renderable
      rotation = instance.rotation
      scale = instance.scale
      skew = instance.skew
      transform = instance.transform
      visible = instance.visible
      x = instance.x
      y = instance.y
      zIndex = instance.zIndex
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

<svelte:options immutable />
<slot />
