<script>
  import { Graphics } from 'svelte-pixi'
  import Body from './physics/Body.svelte'

  export let x
  export let y
  export let rotation = 0
  export let width = 50
  export let height = 50
</script>

<Graphics
  {x}
  {y}
  {rotation}
  pivot={0.5}
  draw={(graphics) => {
    // draw rectangle
    graphics.clear()
    graphics.rect(-width / 2, -height / 2, width, height).fill(0xde3249)
  }}
/>
<Body bind:x bind:y bind:angle={rotation} {width} {height} />
