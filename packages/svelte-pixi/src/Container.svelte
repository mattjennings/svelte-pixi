<svelte:options immutable />

<script lang="ts">
  import type PIXI from 'pixi.js'
  import { Container } from '@pixi/display'
  import DisplayObject from './DisplayObject.svelte'
  import { getContext, onMount, setContext } from 'svelte'
  import { shouldApplyProps } from './util'

  // DisplayObject props
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

  // Container props
  export let height: PIXI.Container['height'] = undefined
  export let width: PIXI.Container['width'] = undefined
  export let sortableChildren: PIXI.Container['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Container['interactiveChildren'] = undefined

  /** @type {PIXI.Container} PIXI.Container instance to render */
  export let instance: PIXI.Container = new Container()

  /**
   * Optionally provide the parent Container instance this DisplayObject should be added to.
   */
  export let parent =
    getContext<PIXI.Container>('pixi/container') ||
    getContext<PIXI.Container>('pixi/stage')

  const app = getContext<PIXI.Application>('pixi/app')

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
