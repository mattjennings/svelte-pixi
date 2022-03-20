<script context="module">
  // register spritesheet loader plugin
  import { registerLoaderPlugin } from 'svelte-pixi'
  import { SpritesheetLoader } from '@pixi/spritesheet'
  registerLoaderPlugin(SpritesheetLoader)
</script>

<script>
  import { Pixi, AnimatedSprite, Loader } from 'svelte-pixi'

  let spritesheet
  let animation = 'adventurer-idle'

  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length)
  }

  function changeAnimation() {
    // spritesheet.animation holds all of our animation keys, so we'll
    // pick one at random
    const keys = Object.keys(spritesheet.animations)
    animation = keys[getRandomIndex(keys)]
  }
</script>

<Pixi width={400} height={400} antialias>
  <Loader
    resources={['/assets/adventurer-spritesheet.json']}
    on:complete={({ detail }) => {
      spritesheet =
        detail.resources['/assets/adventurer-spritesheet.json'].spritesheet
    }}
  >
    <AnimatedSprite
      textures={spritesheet.animations[animation]}
      playing
      animationSpeed={0.1}
      anchor={0.5}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
      on:loop={changeAnimation}
    />
  </Loader>
</Pixi>
