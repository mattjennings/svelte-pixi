<script>
  import { getContainer, getRenderer, onTick } from 'svelte-pixi'

  export let velocity

  const { renderer } = getRenderer()
  const { container } = getContainer()

  const viewBounds = {
    left: 0,
    top: 0,
    right: renderer.width,
    bottom: renderer.height,
  }

  onTick((delta) => {
    const bounds = container.getBounds()

    if (bounds.left < viewBounds.left) {
      container.x = viewBounds.left + bounds.width / 2
      velocity.x *= -1
    } else if (bounds.right > viewBounds.right) {
      container.x = viewBounds.right - bounds.width / 2
      velocity.x *= -1
    }

    if (bounds.bottom > viewBounds.bottom) {
      container.y = viewBounds.bottom - bounds.height / 2
      velocity.y *= -1
    } else if (bounds.top < viewBounds.top) {
      container.y = viewBounds.top + bounds.height / 2
      velocity.y *= -1
    }

    container.x += velocity.x * delta
    container.y += velocity.y * delta
  })
</script>
