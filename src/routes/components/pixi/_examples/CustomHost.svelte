<script>
  import * as PIXI from 'pixi.js'
  import { Pixi } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
  })
</script>

<Pixi {app} let:render>
  <div class="custom" use:render>
    <!-- some cool components -->
  </div>
</Pixi>

<style>
  :global(.custom canvas) {
    border: 5px solid tomato;
    border-radius: 5px;
  }
</style>
