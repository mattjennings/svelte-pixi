<script lang="ts">
  /**
   * This is recreated from a pixi.js example
   *
   * https://github.com/pixijs/examples/blob/gh-pages/examples/js/demos-advanced/star-warp.js
   */
  import { Application, Ticker, Sprite, ParticleContainer } from 'svelte-pixi'
  import * as PIXI from 'pixi.js'
  import { onMount } from 'svelte'
  import Loader from '$lib/Loader.svelte'

  let starAmount = 0
  const speed = 0.025
  const fov = 20
  const starBaseSize = 0.05

  let app
  let width
  let height
  let alpha = 0
  let cameraZ = 0
  $: stars = new Array(starAmount).fill(null).map(() => new PIXI.Sprite())

  function tick({ detail: delta }) {
    if (alpha < 1) {
      alpha += 0.05
    }
    cameraZ += delta * 10 * speed

    stars.forEach((star) => {
      // update scale
      const z = star.initZ - cameraZ
      const distanceScale = Math.max(0, (2000 - z) / 2000)
      star.scale.set(distanceScale * starBaseSize, distanceScale * starBaseSize)

      // update rotation
      const dxCenter = star.x - app.renderer.screen.width / 2
      const dyCenter = star.y - app.renderer.screen.height / 2
      star.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2

      // reset start
      if (star.initZ < cameraZ) {
        const deg = Math.random() * Math.PI * 2
        const distance = Math.random() * 50 + 1
        star.initX = Math.cos(deg) * distance
        star.initY = Math.sin(deg) * distance
        star.initZ = cameraZ + Math.random() * 1000 + 2000
        star.x = star.initX
        star.y = star.initY
      }
      // move closer to camera
      else {
        const z = star.initZ - cameraZ
        star.x =
          star.initX * (fov / z) * app.renderer.screen.width +
          app.renderer.screen.width / 2
        star.y =
          star.initY * (fov / z) * app.renderer.screen.width +
          app.renderer.screen.height / 2
      }
    })
  }

  // set initial star amount based on device width
  onMount(() => {
    if (width < 700) {
      starAmount = 500
    } else {
      starAmount = 3000
    }
  })

  $: if (width && height) {
    app.renderer.resize(width, height)
  }
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div class="wrapper">
  <Application bind:instance={app}>
    <Loader resources={['/assets/star.png']}>
      <Ticker on:tick={tick} />
      <ParticleContainer
        {alpha}
        properties={{
          scale: true,
          position: true,
          rotation: true,
          uvs: true,
          alpha: true,
        }}
      >
        {#each stars as star (star)}
          {@const deg = Math.random() * Math.PI * 2}
          {@const distance = Math.random() * 50 + 1}
          <Sprite
            instance={star}
            texture={PIXI.Texture.from('/assets/star.png')}
            anchor={{ x: 0.5, y: 0.7 }}
            initX={Math.cos(deg) * distance}
            initY={Math.sin(deg) * distance}
            initZ={Math.random() * 1000 + 750}
          />
        {/each}
      </ParticleContainer>
    </Loader>
  </Application>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    background: black;
  }
</style>
