<script>
  import * as PIXI from 'pixi.js'
  import { getContext, onMount } from 'svelte'
  import { Sprite } from 'svelte-pixi'

  export let cameraZ
  export let app
  const texture = PIXI.Texture.from('static/assets/star.png')
  const anchor = new PIXI.Point(0.5, 0.7)
  let instance = new PIXI.Sprite()

  const fov = 20
  const starBaseSize = 0.05
  const deg = Math.random() * Math.PI * 2
  const distance = Math.random() * 50 + 1

  let initZ = Math.random() * 2000
  let initX = Math.cos(deg) * distance
  let initY = Math.sin(deg) * distance
  let x = initX
  let y = initY
  let scale
  let rotation
  let alpha = 0

  function getScale() {
    const z = initZ - cameraZ
    const distanceScale = Math.max(0, (2000 - z) / 2000)

    return new PIXI.Point(
      distanceScale * starBaseSize,
      distanceScale * starBaseSize
    )
  }

  function getRotation() {
    const dxCenter = x - app.renderer.screen.width / 2
    const dyCenter = y - app.renderer.screen.height / 2
    return Math.atan2(dyCenter, dxCenter) + Math.PI / 2
  }

  function updatePosition() {
    if (initZ < cameraZ) {
      const deg = Math.random() * Math.PI * 2
      const distance = Math.random() * 50 + 1
      initX = Math.cos(deg) * distance
      initY = Math.sin(deg) * distance
      initZ = cameraZ + Math.random() * 1000 + 2000
      x = initX
      y = initY
    } else {
      const z = initZ - cameraZ
      x =
        initX * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.width / 2
      y =
        initY * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.height / 2
    }
  }

  onMount(() => {
    function tick() {
      // fade in
      if (alpha < 1) {
        alpha += 0.05
      }

      updatePosition()

      rotation = getRotation()
      scale = getScale()
    }

    app.ticker.add(tick)
    return () => app.ticker.remove(tick)
  })
</script>

<Sprite
  bind:instance
  bind:x
  bind:y
  bind:scale
  bind:rotation
  {alpha}
  {texture}
  {anchor}
/>
