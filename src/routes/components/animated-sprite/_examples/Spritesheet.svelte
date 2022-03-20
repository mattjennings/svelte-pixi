<script context="module">
  // register spritesheet loader plugin
  import { registerLoaderPlugin } from 'svelte-pixi'
  import { SpritesheetLoader } from '@pixi/spritesheet'
  registerLoaderPlugin(SpritesheetLoader)
</script>

<script>
  import { Pixi, AnimatedSprite, Loader } from 'svelte-pixi'
  import { Texture } from '@pixi/core'
</script>

<Pixi width={400} height={400} antialias>
  <Loader resources={['/assets/adventurer-spritesheet.json']}>
    <AnimatedSprite
      textures={[
        Texture.from('adventurer-idle-00.png'),
        Texture.from('adventurer-idle-01.png'),
        Texture.from('adventurer-idle-02.png'),
      ]}
      playing
      animationSpeed={0.1}
      anchor={0.5}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
    />
  </Loader>
</Pixi>
