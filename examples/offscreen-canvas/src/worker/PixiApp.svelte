<script>
  import * as PIXI from 'pixi.js'
  import { Application } from '../../../../src/lib'
  import AssetsLoader from '../../../../src/lib/AssetsLoader.svelte'
  import Sprite from '../../../../src/lib/Sprite.svelte'
  import bunnySrc from './bunny.png'
  import Ticker from '../../../../src/lib/Ticker.svelte'

  export let width
  export let height
  export let resolution
  export let view

  let bunnies = new Array(1000).fill(0).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    anchor: 0.5,
    rotation: Math.random() * Math.PI * 2,
  }))

  let rotation = 0
  function handleTick(ev) {
    const delta = ev.detail
    rotation += 0.1 * delta
  }
</script>

<Application {width} {height} {resolution} {view} autoDensity={false}>
  <AssetsLoader assets={[bunnySrc]}>
    <Ticker on:tick={handleTick} />
    {#each bunnies as props, i (i)}
      <Sprite
        texture={PIXI.Texture.from(bunnySrc)}
        {...props}
        rotation={props.rotation + rotation}
      />
    {/each}
  </AssetsLoader>
</Application>
