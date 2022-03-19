<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, AnimatedSprite, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
  })
</script>

<Pixi {app}>
  <Loader resources={['/assets/adventurer-spritesheet.json']}>
    <AnimatedSprite
      textures={[
        PIXI.Texture.from('adventurer-idle-00.png'),
        PIXI.Texture.from('adventurer-idle-01.png'),
        PIXI.Texture.from('adventurer-idle-02.png'),
      ]}
      playing
      animationSpeed={0.1}
      anchor={new PIXI.Point(0.5, 0.5)}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
    />
  </Loader>
</Pixi>
