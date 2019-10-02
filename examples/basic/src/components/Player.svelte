<script>
  import { onMount, getContext } from 'svelte'
  import * as PIXI from 'pixi.js'
  import { AnimatedSprite } from 'svelte-pixi'
  import KeyboardInput from 'keyboard-input'

  const keyboard = new KeyboardInput()
  const app = getContext('app')

  const { spritesheet } = app.loader.resources[
    'assets/adventurer/spritesheet.json'
  ]

  let animKey = 'adventurer-idle'
  let position = { x: 50, y: 55 }
  let direction = 1

  onMount(() => {
    const moveOnInput = () => {
      if (keyboard.isPressed(37)) {
        position = {
          ...position,
          x: position.x - 3
        }
        animKey = 'adventurer-run'
        direction = -1
      } else if (keyboard.isPressed(39)) {
        position = {
          ...position,
          x: position.x + 3
        }
        animKey = 'adventurer-run'
        direction = 1
      } else {
        animKey = 'adventurer-idle'
      }
    }

    app.ticker.add(moveOnInput)

    return () => {
      app.ticker.remove(moveOnInput)
    }
  })

  function getAnimationSpeed(key) {
    switch (key) {
      case 'adventurer-idle':
        return 0.1
      case 'adventurer-run':
        return 0.15
    }
  }

  $: textures = spritesheet.animations[animKey]
  $: animationSpeed = getAnimationSpeed(animKey)
  $: scale = { x: 2 * direction, y: 2 }
</script>

<AnimatedSprite
  play
  anchor={{ x: 0.5, y: 0 }}
  bind:animationSpeed
  bind:textures
  bind:position
  bind:scale />
