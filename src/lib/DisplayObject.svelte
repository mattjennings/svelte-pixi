<svelte:options immutable />

<script lang="ts">
  /**
   * Handles the application of properties for objects that extend DisplayObject
   */
  import type * as PIXI from 'pixi.js'
  import { createEventDispatcher, getContext, onMount } from 'svelte'
  import { shouldApplyProps, createPixiEventDispatcher } from './util'
  import type { PointLike } from '$lib/util/data-types'
  import { parsePoint } from '$lib/util/data-types'

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
  export let position: PointLike = undefined
  export let renderable: PIXI.DisplayObject['renderable'] = undefined
  export let rotation: PIXI.DisplayObject['rotation'] = undefined
  export let scale: PointLike = undefined
  export let skew: PointLike = undefined
  export let transform: PIXI.DisplayObject['transform'] = undefined
  export let visible: PIXI.DisplayObject['visible'] = undefined
  export let x: PIXI.DisplayObject['x'] = undefined
  export let y: PIXI.DisplayObject['y'] = undefined
  export let zIndex: PIXI.DisplayObject['zIndex'] = undefined

  /**
   * Optionally provide the parent Container instance this DisplayObject should be added to.
   */
  export let parent: PIXI.Container =
    getContext<PIXI.Container>('pixi/container') ||
    getContext<PIXI.Container>('pixi/stage')

  /** @type {PIXI.DisplayObject} PIXI.DisplayObject instance to render */
  export let instance: PIXI.DisplayObject

  const dispatch = createEventDispatcher()
  const app = getContext<PIXI.Application>('pixi/app')

  onMount(() => {
    let childIndex = -1

    // make sure child isn't already added to the parent
    try {
      // Container.getChildIndex throws an error if instance is not a child...
      childIndex = parent.getChildIndex(instance)
      // eslint-disable-next-line no-empty
    } catch (e) {}

    if (parent && childIndex === -1) {
      parent.addChild(instance)
    } else {
      throw new Error('Unable to find container or stage')
    }

    return () => {
      parent?.removeChild(instance)
    }
  })

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
  $: if (shouldApplyProps(position)) {
    const point = parsePoint(position)
    instance.position.set(point.x, point.y)
  }
  $: shouldApplyProps(renderable) && (instance.renderable = renderable)
  $: shouldApplyProps(rotation) && (instance.rotation = rotation)
  $: if (shouldApplyProps(scale)) {
    const point = parsePoint(scale)
    instance.scale.set(point.x, point.y)
  }
  $: if (shouldApplyProps(skew)) {
    const point = parsePoint(skew)
    instance.skew.set(point.x, point.y)
  }
  $: shouldApplyProps(transform) && (instance.transform = transform)
  $: shouldApplyProps(visible) && (instance.visible = visible)
  $: shouldApplyProps(x) && (instance.x = x)
  $: shouldApplyProps(y) && (instance.y = y)
  $: shouldApplyProps(zIndex) && (instance.zIndex = zIndex)

  onMount(() => {
    async function updateProps() {
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

    const dispatchers = [
      createPixiEventDispatcher(instance, dispatch, 'click'),
      createPixiEventDispatcher(instance, dispatch, 'mousedown'),
      createPixiEventDispatcher(instance, dispatch, 'mousemove'),
      createPixiEventDispatcher(instance, dispatch, 'mouseout'),
      createPixiEventDispatcher(instance, dispatch, 'mouseover'),
      createPixiEventDispatcher(instance, dispatch, 'mouseup'),
      createPixiEventDispatcher(instance, dispatch, 'mouseupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'mouseupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'pointercancel'),
      createPixiEventDispatcher(instance, dispatch, 'pointerdown'),
      createPixiEventDispatcher(instance, dispatch, 'pointermove'),
      createPixiEventDispatcher(instance, dispatch, 'pointerout'),
      createPixiEventDispatcher(instance, dispatch, 'pointerover'),
      createPixiEventDispatcher(instance, dispatch, 'pointertap'),
      createPixiEventDispatcher(instance, dispatch, 'pointerup'),
      createPixiEventDispatcher(instance, dispatch, 'pointerupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'removedFrom'),
      createPixiEventDispatcher(instance, dispatch, 'rightclick'),
      createPixiEventDispatcher(instance, dispatch, 'rightdown'),
      createPixiEventDispatcher(instance, dispatch, 'rightup'),
      createPixiEventDispatcher(instance, dispatch, 'rightupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'tap'),
      createPixiEventDispatcher(instance, dispatch, 'touchcancel'),
      createPixiEventDispatcher(instance, dispatch, 'touchend'),
      createPixiEventDispatcher(instance, dispatch, 'touchendoutside'),
      createPixiEventDispatcher(instance, dispatch, 'touchmove'),
      createPixiEventDispatcher(instance, dispatch, 'touchstart'),
      createPixiEventDispatcher(instance, dispatch, 'added'),
      createPixiEventDispatcher(instance, dispatch, 'removed'),
    ]
    return () => {
      dispatchers.forEach((remove) => remove())
      app.ticker.remove(updateProps)
    }
  })
</script>

<slot />
