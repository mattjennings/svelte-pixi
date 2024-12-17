<script>
  import * as PIXI from 'pixi.js'
  import { Graphics, getContainer } from 'svelte-pixi'
  import { spring } from 'svelte/motion'

  export let x
  export let y

  let position = spring({ x, y }, { stiffness: 0.2, damping: 0.4 })

  /**
   * @type {import('pixi.js').Graphics')}
   */
  let instance

  const { container } = getContainer()

  let dragging = false
  let offset = { x: 0, y: 0 }
  let circleSize = 50

  function handleDragStart({ detail }) {
    dragging = true
    offset = {
      x: detail.data.global.x - x,
      y: detail.data.global.y - y,
    }
  }

  function handleDragEnd() {
    dragging = false
    position.set({
      x,
      y,
    })
  }

  function handleDrag({ detail }) {
    const nextPosition = detail.data.global

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
  bind:instance
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
  on:pointerdown={handleDragStart}
  on:globalpointermove={handleDrag}
  on:pointerup={handleDragEnd}
  on:pointerupoutside={handleDragEnd}
  {...$$restProps}
>
  <slot />
</Graphics>
