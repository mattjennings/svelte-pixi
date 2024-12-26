<script>
  /**
   * This is recreated from a pixi.js example
   *
   * https://github.com/pixijs/examples/blob/gh-pages/examples/js/demos-advanced/star-warp.js
   */
  import * as PIXI from 'pixi.js'
  import {
    Application,
    ParticleContainer,
    Ticker,
    AssetsLoader,
  } from 'svelte-pixi'

  let app = $state()
  let width = $state(0)
  let height = $state(0)

  const speed = 0.025
  const fov = 20
  const starSize = 0.05

  let container = $state()
  let cameraZ = 0
  let amount = 0

  let stars = $derived(
    new Array(amount).fill(null).map(() => {
      const star = new PIXI.Particle(PIXI.Texture.from('/assets/star.png'))

      const deg = Math.random() * Math.PI * 2
      const distance = Math.random() * 50 + 1

      star.initX = Math.cos(deg) * distance
      star.initY = Math.sin(deg) * distance
      star.initZ = Math.random() * 1000 + 750

      star.x = star.initX
      star.y = star.initY
      star.z = star.initZ

      updateStar(star)

      return star
    }),
  )

  // add/remove stars
  $effect(() => {
    if (container) {
      for (const star of stars) {
        container.addParticle(star)
      }

      // preserve the stars array for cleanup
      let _stars = stars
      return () => {
        for (const star of _stars) {
          container.removeParticle(star)
        }
      }
    }
  })

  function updateStar(star) {
    const z = star.z - cameraZ
    const distance = Math.max(0, (2000 - z) / 2000)

    star.scaleX = distance * starSize
    star.scaleY = distance * starSize
    star.anchorX = 0.5
    star.anchorY = 0.7

    star.x = star.initX * (fov / z) * width + width / 2
    star.y = star.initY * (fov / z) * height + height / 2
  }

  function resize(width, height) {
    if (app?.renderer) {
      app.renderer.resize(width, height)
      if (width < 700) {
        amount = 1000
      } else {
        amount = 5000
      }
    }
  }

  function onTick(ticker) {
    cameraZ += ticker.deltaTime * 10 * speed

    for (const star of stars) {
      if (!star.destroyed) {
        updateStar(star)
      }
    }
  }

  $effect(() => {
    resize(width, height)
  })
</script>

<div style="flex: 1;" bind:clientWidth={width} bind:clientHeight={height}>
  <Application bind:instance={app} oninit={() => resize(width, height)}>
    <AssetsLoader assets={['/assets/star.png']}>
      <Ticker ontick={onTick} />
      <ParticleContainer bind:instance={container} />
    </AssetsLoader>
  </Application>
</div>
