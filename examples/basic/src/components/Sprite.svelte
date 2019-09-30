<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate, getContext } from 'svelte'
  import addPixiInstance from '../util/addPixiInstance'
  import applyProps from '../util/applyProps'

  export let alpha
  export let anchor
  export let angle
  export let blendMode
  export let buttonMode
  export let cursor
  export let filters
  export let hitArea
  export let interactive
  export let interactiveChildren
  export let height
  export let mask
  export let name
  export let pivot
  export let position
  export let resolution
  export let roundPixels
  export let shader
  export let skew
  export let texture
  export let visible
  export let width
  export let zIndex

  const game = getContext('game')
  const self = PIXI.Sprite.from(texture)
  const removeSelf = addPixiInstance(self)

  beforeUpdate(() => {
    applyProps(self, $$props, (key, value) => {
      switch (key) {
        case 'texture':
          return game.loader.resources[key]
        default:
          return value
      }
    })
  })

  onMount(() => removeSelf)
</script>
