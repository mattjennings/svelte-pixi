<script lang="ts">
  import { Graphics } from '@pixi/graphics'
  import { onMount } from 'svelte'
  import Container from './Container.svelte'
  import { shouldApplyProps } from './util'
  import { getPixiApp } from './util/context'

  // Container props
  export let height: Graphics['height'] = undefined
  export let width: Graphics['width'] = undefined
  export let sortableChildren: Graphics['sortableChildren'] = undefined
  export let interactiveChildren: Graphics['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: Graphics['accessible'] = undefined
  export let accessibleChildren: Graphics['accessibleChildren'] = true
  export let accessibleHint: Graphics['accessibleHint'] = undefined
  export let accessiblePointerEvents: Graphics['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: Graphics['accessibleTitle'] = undefined
  export let accessibleType: Graphics['accessibleType'] = undefined
  export let alpha: Graphics['alpha'] = undefined
  export let angle: Graphics['angle'] = undefined
  export let buttonMode: Graphics['buttonMode'] = undefined
  export let cacheAsBitmap: Graphics['cacheAsBitmap'] = undefined
  export let cursor: Graphics['cursor'] = undefined
  export let filterArea: Graphics['filterArea'] = undefined
  export let filters: Graphics['filters'] = undefined
  export let hitArea: Graphics['hitArea'] = undefined
  export let interactive: Graphics['interactive'] = undefined
  export let mask: Graphics['mask'] = undefined
  export let name: Graphics['name'] = undefined
  export let pivot: Graphics['pivot'] = undefined
  export let position: Graphics['position'] = undefined
  export let renderable: Graphics['renderable'] = undefined
  export let rotation: Graphics['rotation'] = undefined
  export let scale: Graphics['scale'] = undefined
  export let skew: Graphics['skew'] = undefined
  export let transform: Graphics['transform'] = undefined
  export let visible: Graphics['visible'] = undefined
  export let x: Graphics['x'] = undefined
  export let y: Graphics['y'] = undefined
  export let zIndex: Graphics['zIndex'] = undefined

  // Graphics props
  export let blendMode: Graphics['blendMode'] = undefined
  export let pluginName: Graphics['pluginName'] = undefined
  export let tint: Graphics['tint'] = undefined

  /**
   * @type { (graphics: Graphics) => any} Call your draw functions here
   */
  export let draw: (graphics: Graphics) => any

  /** @type {Graphics} Graphics instance to render */
  export let instance: Graphics = new Graphics()

  const app = getPixiApp()

  $: shouldApplyProps(blendMode) && (instance.blendMode = blendMode)
  $: shouldApplyProps(pluginName) && (instance.pluginName = pluginName)
  $: shouldApplyProps(tint) && (instance.tint = tint)

  // because Graphics is not immutable, we can call draw whenever it changes
  $: draw(instance)

  onMount(() => {
    async function updateProps() {
      // Graphics is not an immutable component
      // so we need to compare values before re-assigning

      if (blendMode !== instance.blendMode) {
        blendMode = instance.blendMode
      }

      if (pluginName !== instance.pluginName) {
        pluginName = instance.pluginName
      }

      if (tint !== instance.tint) {
        tint = instance.tint
      }
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
