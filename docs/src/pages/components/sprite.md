# Sprite

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Sprite, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })

</script>

<Pixi {app}>
  <Loader assets={['static/assets/adventurer.png']}>
    <Sprite
      texture={new PIXI.Texture.from('static/assets/adventurer.png')}
      anchor={new PIXI.Point(0.5, 0.5)}
      x={200}
      y={200}
      scale={{ x: 2, y: 2}} />
  </Loader>
</Pixi>
```

## Properties

```properties pixiUrl:PIXI.Sprite.html
./../../packages/svelte-pixi/src/Sprite.svelte
```

## Events

[See PIXI.Sprite events](https://pixijs.download/release/docs/PIXI.Sprite.html#event:added)
