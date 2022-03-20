<svelte:options immutable />

<script lang="ts">
  import { Container } from '@pixi/display'
  import DisplayObject from './DisplayObject.svelte'
  import { getContext, onMount, setContext } from 'svelte'
  import { shouldApplyProps } from './util'
  import type { PointLike } from '$lib/util/data-types'
  import { getPixiApp } from './util/context'

  // DisplayObject props
  export let accessible: Container['accessible'] = undefined
  export let accessibleChildren: Container['accessibleChildren'] = true
  export let accessibleHint: Container['accessibleHint'] = undefined
  export let accessiblePointerEvents: Container['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: Container['accessibleTitle'] = undefined
  export let accessibleType: Container['accessibleType'] = undefined
  export let alpha: Container['alpha'] = undefined
  export let angle: Container['angle'] = undefined
  export let buttonMode: Container['buttonMode'] = undefined
  export let cacheAsBitmap: Container['cacheAsBitmap'] = undefined
  export let cursor: Container['cursor'] = undefined
  export let filterArea: Container['filterArea'] = undefined
  export let filters: Container['filters'] = undefined
  export let hitArea: Container['hitArea'] = undefined
  export let interactive: Container['interactive'] = undefined
  export let mask: Container['mask'] = undefined
  export let name: Container['name'] = undefined
  export let pivot: Container['pivot'] = undefined
  export let position: PointLike = undefined
  export let renderable: Container['renderable'] = undefined
  export let rotation: Container['rotation'] = undefined
  export let scale: PointLike = undefined
  export let skew: PointLike = undefined
  export let transform: Container['transform'] = undefined
  export let visible: Container['visible'] = undefined
  export let x: Container['x'] = undefined
  export let y: Container['y'] = undefined
  export let zIndex: Container['zIndex'] = undefined

  // Container props
  export let height: Container['height'] = undefined
  export let width: Container['width'] = undefined
  export let sortableChildren: Container['sortableChildren'] = undefined
  export let interactiveChildren: Container['interactiveChildren'] = undefined

  /** @type {Container} Container instance to render */
  export let instance: Container = new Container()

  /**
   * Optionally provide the parent Container instance this DisplayObject should be added to.
   */
  export let parent =
    getContext<Container>('pixi/container') ||
    getContext<Container>('pixi/stage')

  const app = getPixiApp()

  setContext('pixi/container', instance)

  $: shouldApplyProps(height) && (instance.height = height)
  $: shouldApplyProps(width) && (instance.width = width)
  $: shouldApplyProps(sortableChildren) &&
    (instance.sortableChildren = sortableChildren)
  $: shouldApplyProps(interactiveChildren) &&
    (instance.interactiveChildren = interactiveChildren)

  onMount(() => {
    async function updateProps() {
      height = instance.height
      width = instance.width
      sortableChildren = instance.sortableChildren
      interactiveChildren = instance.interactiveChildren
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

<DisplayObject
  {parent}
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
  on:click
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
</DisplayObject>
