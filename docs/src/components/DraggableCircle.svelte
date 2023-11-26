<script>
  import * as PIXI from 'pixi.js'
  import { Graphics, getContainer } from 'svelte-pixi'
  import { spring } from 'svelte/motion'

  const { x, y, ...restProps } = $props()

  let position = spring({ x, y }, { stiffness: 0.2, damping: 0.4 })

  const { container } = getContainer()

  let dragging = $state(false)
  let offset = { x: 0, y: 0 }
  let circleSize = 50

  function handleDragStart({ data }) {
    dragging = true
    offset = {
      x: data.global.x - x,
      y: data.global.y - y,
    }
  }

  function handleDragEnd() {
    dragging = false
    position.set({
      x,
      y,
    })
  }

  function handleDrag({ data }) {
    const nextPosition = data.global

    if (dragging) {
      position.set(
        {
          x: container.toLocal(nextPosition).x - offset.x,
          y: container.toLocal(nextPosition).y - offset.y,
        },
        { duration: 0 },
      )
    }
  }
</script>

<Graphics
  x={$position.x}
  y={$position.y}
  draw={(graphics) => {
    graphics.clear()
    graphics.beginFill(0xde3249)
    graphics.drawCircle(0, 0, circleSize)
    graphics.endFill()
  }}
  eventMode="static"
  cursor="pointer"
  hitArea={new PIXI.Circle(0, 0, circleSize)}
  zIndex={10}
  onpointerdown={handleDragStart}
  onglobalpointermove={handleDrag}
  onpointerup={handleDragEnd}
  onpointerupoutside={handleDragEnd}
  {...restProps}
/>
