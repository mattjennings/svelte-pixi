<script lang="ts">
  import type PIXI from 'pixi.js'
  import { Container } from '@pixi/display'
  import { getContext, onMount, setContext, tick } from 'svelte'
  import { addPixiInstance, shouldApplyProps } from './util'

  export let height: PIXI.Container['height'] = undefined
  export let width: PIXI.Container['width'] = undefined
  export let sortableChildren: PIXI.Container['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Container['interactiveChildren'] = undefined

  /** @type {PIXI.Container} PIXI.Container instance to render */
  export let instance: PIXI.Container = undefined

  const instancePropExists = typeof instance !== 'undefined'

  instance ??= new Container()

  // Container can be used either as it's own instance or as a base
  // component for its parent instance. If this is standalone, we
  // will manage its add/remove of the pixi instance
  if (!instancePropExists) {
    // we are self-managing the instance
    const removeSelf = addPixiInstance(instance)
    onMount(() => removeSelf)
  }

  setContext('pixi/container', instance)

  const app = getContext<PIXI.Application>('pixi/app')

  $: shouldApplyProps(height) && (instance.height = height)
  $: shouldApplyProps(width) && (instance.width = width)
  $: shouldApplyProps(sortableChildren) &&
    (instance.sortableChildren = sortableChildren)
  $: shouldApplyProps(interactiveChildren) &&
    (instance.interactiveChildren = interactiveChildren)

  onMount(() => {
    async function updateProps() {
      await tick()

      height = instance.height
      width = instance.width
      sortableChildren = instance.sortableChildren
      interactiveChildren = instance.interactiveChildren
    }

    app.ticker.add(updateProps)

    return () => app.ticker.remove(updateProps)
  })
</script>

<slot />
