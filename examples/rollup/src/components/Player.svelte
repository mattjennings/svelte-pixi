<script>
  import * as PIXI from 'pixi.js'
  import { onMount, getContext } from 'svelte'
  import { AnimatedSprite } from 'svelte-pixi'
  import KeyboardInput from 'keyboard-input'

  // todo: replace keyboard-input with some other library
  const keyboard = new KeyboardInput.default()
  const app = getContext('pixi/app')
  let instance

  const { spritesheet } = app.loader.resources[
    'assets/adventurer/spritesheet.json'
  ]

  let animKey = 'adventurer-idle'
  let x = 50
  let y = 50
  let direction = 1

  onMount(() => {
    const moveOnInput = () => {
      if (keyboard.isPressed(37)) {
        x = x - 3
        animKey = 'adventurer-run'
        direction = -1
      } else if (keyboard.isPressed(39)) {
        x = x + 3
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
  bind:instance
  playing
  anchor={new PIXI.Point(0.5, 0)}
  bind:animationSpeed
  bind:textures
  bind:x
  bind:y
  bind:scale />
