<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { onMount, setContext } from 'svelte'
  import { addPixiInstance, shouldApplyProps } from './util'

  export let height: PIXI.Container['height'] = undefined
  export let width: PIXI.Container['width'] = undefined
  export let sortableChildren: PIXI.Container['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Container['interactiveChildren'] = undefined

  export let instance: PIXI.Container = undefined

  const instancePropExists = typeof instance !== 'undefined'

  instance ??= new PIXI.Container()

  // Container can be used either as it's own instance or as a base
  // component for its parent instance. If this is standalone, we
  // will manage its add/remove of the pixi instance
  if (!instancePropExists) {
    // we are self-managing the instance
    const removeSelf = addPixiInstance(instance)
    onMount(() => removeSelf)
  }

  setContext('pixi/container', instance)

  $: shouldApplyProps(height) && (instance.height = height)
  $: shouldApplyProps(width) && (instance.width = width)
  $: shouldApplyProps(sortableChildren) &&
    (instance.sortableChildren = sortableChildren)
  $: shouldApplyProps(interactiveChildren) &&
    (instance.interactiveChildren = interactiveChildren)
</script>

<slot />
