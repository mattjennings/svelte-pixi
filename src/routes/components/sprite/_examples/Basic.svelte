<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Sprite, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
  })
</script>

<Pixi {app}>
  <Loader resources={['/assets/adventurer.png']}>
    <Sprite
      texture={PIXI.Texture.from('/assets/adventurer.png')}
      anchor={0.5}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
    />
  </Loader>
</Pixi>
