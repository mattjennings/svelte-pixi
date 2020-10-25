# Sprite

Renders an image to the screen

## Usage

```example
<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { Pixi, Sprite, Preloader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400, // default: 800
    height: 400, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
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
