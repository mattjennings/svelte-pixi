<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { Pixi } from 'svelte-pixi'
  import { onMount } from 'svelte'
  import Star from './Star.svelte'

  const app = new PIXI.Application()

  const starAmount = 1000
  let cameraZ = 0
  const speed = 0.025

  let stars = Array(starAmount).fill(null)

  onMount(() => {
    function tick(delta) {
      cameraZ += delta * 10 * speed
    }

    app.ticker.add(tick)
    return () => app.ticker.remove(tick)
  })
</script>

<Pixi {app}>
  {#each stars as star, i}
    <Star {app} {cameraZ} />
  {/each}
</Pixi>
