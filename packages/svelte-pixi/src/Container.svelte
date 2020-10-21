<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { onMount, setContext } from 'svelte'
  import { addPixiInstance, shouldApplyProps } from './util'

  export let height: PIXI.Container['height'] = undefined
  export let width: PIXI.Container['width'] = undefined
  export let sortableChildren: PIXI.Container['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.Container['interactiveChildren'] = undefined

  export let instance = new PIXI.Container()
  const removeSelf = addPixiInstance(instance)
  setContext('pixi/container', instance)

  onMount(() => removeSelf)

  $: shouldApplyProps(height) && (instance.height = height)
  $: shouldApplyProps(width) && (instance.width = width)
  $: shouldApplyProps(sortableChildren) &&
    (instance.sortableChildren = sortableChildren)
  $: shouldApplyProps(interactiveChildren) &&
    (instance.interactiveChildren = interactiveChildren)
</script>

<slot />
