<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate, getContext } from 'svelte'
  import addPixiInstance from './util/addPixiInstance'
  import applyProps from './util/applyProps'

  export let alpha = undefined
  export let anchor = undefined
  export let animationSpeed = undefined
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
  export let textures = undefined
  export let visible = undefined
  export let width = undefined
  export let zIndex = undefined

  /**
   * if true, play the animation
   */
  export let play = true
  export let ref = undefined

  const app = getContext('pixi-app')
  const self = new PIXI.AnimatedSprite(texture || textures.map(getTexture))
  const removeSelf = addPixiInstance(self)
  ref = self

  // cache previous value so we can quickly check if textures prop has changed
  let previousTextures = textures

  beforeUpdate(() => {
    applyProps(self, $$props, (key, value) => {
      switch (key) {
        case 'play':
          return value ? self.play() : self.stop()
        case 'textures':
          // conditionally update textures, otherwise the animation will get messed up
          return previousTextures !== textures
            ? value.map(getTexture)
            : undefined
        case 'texture':
          return getTexture(value)
        default:
          return value
      }
    })

    if (previousTextures !== textures) {
      if ($$props.play) {
        self.play()
      }
      previousTextures = textures
    }
  })

  onMount(() => removeSelf)

  function getTexture(texture) {
    if (typeof texture === 'string') {
      return app.loader.resources[texture]
    }

    return texture
  }
</script>
