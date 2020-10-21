<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate, getContext } from 'svelte'
  import { addPixiInstance, applyProps } from './util'

  export let alpha = undefined
  export let anchor = undefined
  export let angle = undefined
  export let blendMode = undefined
  export let buttonMode = undefined
  export let cursor = undefined
  export let filters = undefined
  export let hitArea = undefined
  export let interactive = undefined
  export let interactiveChildren = undefined
  export let height = undefined
  export let mask = undefined
  export let name = undefined
  export let pivot = undefined
  export let position = undefined
  export let resolution = undefined
  export let roundPixels = undefined
  export let shader = undefined
  export let skew = undefined
  export let texture = undefined
  export let visible = undefined
  export let width = undefined
  export let zIndex = undefined

  export let ref = undefined

  const app = getContext('pixi/app')
  const self =
    typeof texture === 'string'
      ? PIXI.Sprite.from(texture)
      : new PIXI.Sprite(texture)
  const removeSelf = addPixiInstance(self)
  ref = self

  beforeUpdate(() => {
    applyProps(self, $$props, (key, value) => {
      switch (key) {
        case 'texture':
          return typeof value === 'string' ? app.loader.resources[key] : value
        default:
          return value
      }
    })
  })

  onMount(() => removeSelf)
</script>
