<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate } from 'svelte'
  import addPixiInstance from './util/addPixiInstance'
  import applyProps from './util/applyProps'

  export let alpha = undefined
  export let anchor = undefined
  export let angle = undefined
  export let blendMode = undefined
  export let buttonMode = undefined
  export let cursor = undefined
  export let filterArea = undefined
  export let filters = undefined
  export let hitArea = undefined
  export let interactive = undefined
  export let interactiveChildren = undefined
  export let height = undefined
  export let mask = undefined
  export let name = undefined
  export let pivot = undefined
  export let position = undefined
  export let roundPixels = undefined
  export let resolution = undefined
  export let shader = undefined
  export let skew = undefined
  export let texture = undefined
  export let visible = undefined
  export let width = undefined
  export let zIndex = undefined

  export let text
  export let fill = 0xffffff
  export let fontSize = 16
  export let style = undefined

  const self = new PIXI.Text(text, { position, fill, fontSize, style })
  const removeSelf = addPixiInstance(self)

  beforeUpdate(() => {
    applyProps(self, $$props)
  })
  onMount(() => removeSelf)
</script>
