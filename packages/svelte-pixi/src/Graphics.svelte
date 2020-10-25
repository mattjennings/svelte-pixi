<script lang="ts">
  import type PIXI from 'pixi.js'
  import { Graphics } from '@pixi/graphics'
  import { onMount, getContext, setContext, tick } from 'svelte'
  import { addPixiInstance, shouldApplyProps } from './util'
  import DisplayObject from './DisplayObject.svelte'
  import Container from './Container.svelte'

  // Container props
  export let height: PIXI.Graphics['height'] = undefined
  export let width: PIXI.Graphics['width'] = undefined
  export let sortableChildren: PIXI.Graphics['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Graphics['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.Graphics['accessible'] = undefined
  export let accessibleChildren: PIXI.Graphics['accessibleChildren'] = true
  export let accessibleHint: PIXI.Graphics['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.Graphics['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.Graphics['accessibleTitle'] = undefined
  export let accessibleType: PIXI.Graphics['accessibleType'] = undefined
  export let alpha: PIXI.Graphics['alpha'] = undefined
  export let angle: PIXI.Graphics['angle'] = undefined
  export let buttonMode: PIXI.Graphics['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.Graphics['cacheAsBitmap'] = undefined
  export let cursor: PIXI.Graphics['cursor'] = undefined
  export let filterArea: PIXI.Graphics['filterArea'] = undefined
  export let filters: PIXI.Graphics['filters'] = undefined
  export let hitArea: PIXI.Graphics['hitArea'] = undefined
  export let interactive: PIXI.Graphics['interactive'] = undefined
  export let mask: PIXI.Graphics['mask'] = undefined
  export let name: PIXI.Graphics['name'] = undefined
  export let pivot: PIXI.Graphics['pivot'] = undefined
  export let position: PIXI.Graphics['position'] = undefined
  export let renderable: PIXI.Graphics['renderable'] = undefined
  export let rotation: PIXI.Graphics['rotation'] = undefined
  export let scale: PIXI.Graphics['scale'] = undefined
  export let skew: PIXI.Graphics['skew'] = undefined
  export let transform: PIXI.Graphics['transform'] = undefined
  export let visible: PIXI.Graphics['visible'] = undefined
  export let x: PIXI.Graphics['x'] = undefined
  export let y: PIXI.Graphics['y'] = undefined
  export let zIndex: PIXI.Graphics['zIndex'] = undefined

  // Graphics props
  export let blendMode: PIXI.Graphics['blendMode'] = undefined
  export let pluginName: PIXI.Graphics['pluginName'] = undefined
  export let state: PIXI.Graphics['state'] = undefined
  export let tint: PIXI.Graphics['tint'] = undefined

  export let draw: (graphics: PIXI.Graphics) => any

  export let instance: PIXI.Graphics = new Graphics()
  const app = getContext<PIXI.Application>('pixi/app')

  $: shouldApplyProps(blendMode) && (instance.blendMode = blendMode)
  $: shouldApplyProps(pluginName) && (instance.pluginName = pluginName)
  $: shouldApplyProps(state) && (instance.state = state)
  $: shouldApplyProps(tint) && (instance.tint = tint)

  $: draw(instance)

  onMount(() => {
    async function updateProps() {
      await tick()

      blendMode = instance.blendMode
      pluginName = instance.pluginName
      state = instance.state
      tint = instance.tint
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