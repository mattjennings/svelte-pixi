<script>
  import { setContext } from 'svelte'
  import * as PIXI from 'pixi.js'

  import fragment from 'svelte-fragment'

  import Player from './components/Player.svelte'
  import { Pixi, Container, Text, Preloader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400, // default: 800
    height: 400, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1 // default: 1
  })
</script>

<Pixi {app}>

  <Preloader urls={['assets/stand.png', 'assets/adventurer/spritesheet.json']}>

    <template use:fragment slot="loading">
      <Text text="loading" position={{ x: 0, y: 0 }} />
    </template>

    <Container>
      <Player />
    </Container>

  </Preloader>
</Pixi>
