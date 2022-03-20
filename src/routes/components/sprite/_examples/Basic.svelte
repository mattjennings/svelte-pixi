<script>
  import { Pixi, Sprite, Loader } from 'svelte-pixi'
  import { Texture } from '@pixi/core'
</script>

<Pixi width={400} height={400}>
  <Loader resources={['/assets/adventurer.png']}>
    <Sprite
      texture={Texture.from('/assets/adventurer.png')}
      anchor={0.5}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
    />
  </Loader>
</Pixi>
