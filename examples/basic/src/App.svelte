<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Player from './components/Player.svelte'
  import { Pixi, Container, Graphics, Text, Preloader } from 'svelte-pixi'

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
  <Preloader urls={['assets/stand.png', 'assets/adventurer/spritesheet.json']}>
    <template slot="loading" let:progress>
      <Text
        text={`Loading... ${progress}%`}
        fill="white"
        fontSize={16}
        x={0}
        y={0} />
    </template>

    <Container>
      <Text
        text="move with arrow keys"
        fill="white"
        fontSize={16}
        x={120}
        y={0} />
      <Player />
    </Container>
  </Preloader>
</Pixi>
