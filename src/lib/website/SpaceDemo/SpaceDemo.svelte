<script>
  /**
   * This is recreated from a pixi.js example
   *
   * https://github.com/pixijs/examples/blob/gh-pages/examples/js/demos-advanced/star-warp.js
   */
  import { Pixi } from 'svelte-pixi'
  import { onMount } from 'svelte'
  import Star from './Star.svelte'

  const starAmount = 1000
  const speed = 0.025

  let app
  let width
  let height
  let cameraZ = 0
  let stars = Array(starAmount).fill(null)

  onMount(() => {
    function tick(delta) {
      cameraZ += delta * 10 * speed
    }
    app.ticker.add(tick)
    return () => app.ticker.remove(tick)
  })

  $: {
    if (width && height) {
      app.renderer.resize(width, height)
    }
  }
</script>

<svelte:window bind:outerHeight={height} bind:outerWidth={width} />

<div class="wrapper">
  <Pixi bind:instance={app}>
    {#each stars as star}
      <Star {cameraZ} />
    {/each}
  </Pixi>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    background: black;
  }
</style>
