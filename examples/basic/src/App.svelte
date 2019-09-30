<script>
  import { setContext } from "svelte";
  import * as PIXI from "pixi.js";

  import fragment from "svelte-fragment";

  import Sprite from "./components/Sprite.svelte";
  import Container from "./components/Container.svelte";
  import Text from "./components/Text.svelte";
  import Preloader from "./components/Preloader.svelte";

  const app = new PIXI.Application({
    width: 800, // default: 800
    height: 800, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1 // default: 1
  });

  document.body.appendChild(app.view);

  window.game = app;
  setContext("game", app);
  setContext("stage", app.stage);
</script>

<Preloader urls={['assets/adventurer.png']}>

  <template use:fragment slot="loading">
    <Text text="loading" position={{ x: 0, y: 0 }} />
  </template>

  <Container>
    <Text text="done" position={{ x: 0, y: 0 }} />
  </Container>

</Preloader>
