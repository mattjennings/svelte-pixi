<script>
  import * as PIXI from 'pixi.js'
  import Player from './Player.svelte'
  import { Pixi, Text, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400, // default: 800
    height: 400, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
  })
</script>

<Pixi {app}>
  <Loader resources={['adventurer/spritesheet.json']}>
    <slot slot="loading">
      <Text text={`Loading...`} style={{ fill: 'white' }} x={0} y={0} />
    </slot>

    <Text text="move with arrow keys" style={{ fill: 'white' }} x={120} y={0} />
    <Player />
  </Loader>
</Pixi>
