<script>
  import * as PIXI from 'pixi.js'
  import { Pixi } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
  })
</script>

<Pixi {app}>
  <!-- some cool components -->
</Pixi>
