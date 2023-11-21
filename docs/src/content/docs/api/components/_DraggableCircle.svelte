<script>
  import * as PIXI from 'pixi.js'
  import { onMount } from 'svelte'
  import { Graphics, getApp, getStage } from 'svelte-pixi'

  export let x
  export let y

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
  }

  function handleDrag({ detail }) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
    const nextPosition = detail.data.global

    if (dragging) {
      x = clamp(nextPosition.x - offset.x, circleSize, 400 - circleSize)
      y = clamp(nextPosition.y - offset.y, circleSize, 400 - circleSize)
    }
  }

  // try {
  //   const { stage } = getStage()

  //   stage.interactive = true
  //   stage.on('pointermove', handleDrag)
  //   // stage.on('pointerupoutside', handleDragEnd)
  //   stage.on('pointerup', handleDragEnd)
  // } catch (e) {
  //   console.error(e)
  // }
</script>

<Graphics
  {x}
  {y}
  draw={(graphics) => {
    graphics.clear()
    graphics.beginFill(0xde3249)
    graphics.drawCircle(0, 0, circleSize)
    graphics.endFill()
  }}
  cursor="pointer"
  hitArea={new PIXI.Circle(0, 0, circleSize)}
  on:pointerdown={handleDragStart}
  on:globalpointermove={handleDrag}
  on:pointerup={handleDragEnd}
  on:pointerupoutside={handleDragEnd}
  {...$$restProps}
>
  <slot />
</Graphics>
