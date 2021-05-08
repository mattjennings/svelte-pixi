<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Player from './components/Player.svelte'
  import { Pixi, Container, Graphics, Text, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400, // default: 800
    height: 400, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
  })

  // @ts-ignore
  window.pixiApp = app
</script>

<Pixi {app}>
  <Loader resources={['stand.png', 'adventurer/spritesheet.json']}>
    <slot slot="loading">
      <Text text={`Loading...`} style={{ fill: 'white' }} x={0} y={0} />
    </slot>

    <Text text="move with arrow keys" style={{ fill: 'white' }} x={120} y={0} />
    <Player />
  </Loader>
</Pixi>
