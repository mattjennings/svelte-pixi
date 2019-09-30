<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate } from 'svelte'
  import addPixiInstance from '../util/addPixiInstance'
  import applyProps from '../util/applyProps'

  export let alpha
  export let anchor
  export let angle
  export let blendMode
  export let buttonMode
  export let cursor
  export let filterArea
  export let filters
  export let hitArea
  export let interactive
  export let interactiveChildren
  export let height
  export let mask
  export let name
  export let pivot
  export let position
  export let roundPixels
  export let resolution
  export let shader
  export let skew
  export let texture
  export let visible
  export let width
  export let zIndex

  export let text
  export let fill = 0xffffff
  export let fontSize = 16
  export let style

  const self = new PIXI.Text(text, { position, fill, fontSize })
  const removeSelf = addPixiInstance(self)

  beforeUpdate(() => {
    applyProps(self, $$props)
  })
  onMount(() => removeSelf)
</script>
