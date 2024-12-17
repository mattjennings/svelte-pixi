<script>
  /**
   * This is recreated from a pixi.js example
   *
   * https://github.com/pixijs/examples/blob/gh-pages/examples/js/demos-advanced/star-warp.js
   */
  import * as PIXI from 'pixi.js'
  import { Application, ParticleContainer, Ticker } from 'svelte-pixi'

  const speed = 0.25
  const fov = 20
  const starBaseSize = 0.05

  let app
  let width
  let height

  let container
  let alpha = 0
  let cameraZ = 1000
  let starAmount = 0
  let stars = []

  const MAX_Z = 2000

  function init(container, amount) {
    stars.forEach((star) => star.destroy())
    stars = new Array(amount).fill(null).map(() => {
      const star = new PIXI.Sprite(PIXI.Texture.from('/assets/star.png'))

      const deg = Math.random() * Math.PI * 2
      const distance = Math.random() * 50 + 1
      star.anchor.set(0.5, 0.7)
      star.initX = Math.cos(deg) * distance
      star.initY = Math.sin(deg) * distance
      star.initZ = Math.random() * 1000 + MAX_Z

      return star
    })

    container.addChild(...stars)
  }

  $: if (container) {
    init(container, starAmount)
  }

  function tick({ detail: delta }) {
    if (alpha < 1) {
      alpha += 0.05
    }
    cameraZ += delta * speed

    stars.forEach((star) => {
      // update scale
      const z = star.initZ - cameraZ
      const distanceScale = Math.max(0, (MAX_Z - z) / MAX_Z)
      star.scale.set(distanceScale * starBaseSize, distanceScale * starBaseSize)

      // update rotation
      const dxCenter = star.x - app.renderer.screen.width / 2
      const dyCenter = star.y - app.renderer.screen.height / 2
      star.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2

      // reset
      if (star.initZ < cameraZ) {
        const deg = Math.random() * Math.PI * 2
        const distance = Math.random() * 50 + 1
        star.initX = Math.cos(deg) * distance
        star.initY = Math.sin(deg) * distance
        star.initZ = Math.random() * 1000 + MAX_Z + cameraZ
      }
      // move closer to camera
      else {
        star.x =
          star.initX * (fov / z) * app.renderer.screen.width +
          app.renderer.screen.width / 2
        star.y =
          star.initY * (fov / z) * app.renderer.screen.height +
          app.renderer.screen.height / 2
      }
    })
  }

  $: if (app && width && height) {
    app.renderer.resize(width, height)

    if (width < 700) {
      starAmount = 5000
    } else {
      starAmount = 10000
    }
  }
</script>

<div style="flex: 1;" bind:clientWidth={width} bind:clientHeight={height}>
  <Application bind:instance={app}>
    <Ticker on:tick={tick} />
    <ParticleContainer
      bind:instance={container}
      {alpha}
      autoResize
      properties={{
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true,
      }}
    />
  </Application>
</div>
