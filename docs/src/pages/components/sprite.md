# Sprite

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Sprite, Preloader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })
</script>

<Pixi {app}>
  <Preloader urls={['static/assets/dude.png']}>
    <Sprite
      texture="static/assets/dude.png"
      x={100}
      y={100}
      scale={{ x: 2, y: 2}} />
  </Preloader>
</Pixi>
```

```properties pixiUrl:PIXI.Sprite.html
./../../packages/svelte-pixi/src/Sprite.svelte
```
