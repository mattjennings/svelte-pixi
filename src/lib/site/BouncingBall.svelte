<script>
  import * as PIXI from 'pixi.js'
  import { getRenderer, Graphics, onTick } from 'svelte-pixi'

  const { renderer } = getRenderer()

  export let speed = 5
  export let size = 50
  export let color = 0xde3249

  let instance

  let vx = Math.random()
  let vy = Math.random()

  let viewBounds = {
    left: 0,
    top: 0,
    right: renderer.width,
    bottom: renderer.height,
  }

  onTick((delta) => {
    const bounds = new PIXI.Circle(instance.x, instance.y, size).getBounds()

    if (bounds.left <= viewBounds.left) {
      instance.x = bounds.left + bounds.width / 2
      vx *= -1
    } else if (bounds.right > viewBounds.right) {
      instance.x = bounds.right - bounds.width / 2
      vx *= -1
    }
    if (bounds.bottom > viewBounds.bottom) {
      instance.y = bounds.bottom - bounds.height / 2
      vy *= -1
    } else if (bounds.top <= viewBounds.top) {
      instance.y = bounds.top + bounds.height / 2
      vy *= -1
    }

    instance.x += vx * speed * delta
    instance.y += vy * speed * delta
  })
</script>

<Graphics
  bind:instance
  pivot={0.5}
  draw={(graphics) => {
    graphics.clear()
    graphics.beginFill(color)
    graphics.drawCircle(0, 0, size)
    graphics.endFill()
  }}
  {...$$restProps}
>
  <slot />
</Graphics>
