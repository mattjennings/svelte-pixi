<script>
  import { setContext } from 'svelte'
  import * as PIXI from 'pixi.js'

  import fragment from 'svelte-fragment'

  import Player from './components/Player.svelte'
  import Container from './components/base/Container.svelte'
  import Text from './components/base/Text.svelte'
  import Preloader from './components/base/Preloader.svelte'

  const app = new PIXI.Application({
    width: 400, // default: 800
    height: 400, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1 // default: 1
  })

  window.game = app
  setContext('game', app)
  setContext('stage', app.stage)

  function renderGame(node) {
    node.appendChild(app.view)

    return {
      destroy() {
        node.removeChild(app.view)
      }
    }
  }
</script>

<div use:renderGame>

  <Preloader urls={['assets/stand.png', 'assets/adventurer/spritesheet.json']}>

    <template use:fragment slot="loading">
      <Text text="loading" position={{ x: 0, y: 0 }} />
    </template>

    <Container>
      <Player />
    </Container>

  </Preloader>
</div>
