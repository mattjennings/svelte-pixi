---
title: svelte/motion
---

You can animate using `svelte/motion` just like you would in other Svelte application.

### Spring

```svelte example csr
<script>
  import { Application, Text, Sprite, Loader } from 'svelte-pixi'
  import { Texture } from '@pixi/core'
  import { spring } from 'svelte/motion'
  import { Point } from '@pixi/math'

  let dragging = false
  let offset = { x: 0, y: 0 }
  let startingPosition = { x: 200, y: 200 }

  let position = spring(startingPosition, {
    stiffness: 0.2,
    damping: 0.4,
  })

  function handleDragStart(event) {
    dragging = true
    const { x, y } = event.detail.data.global

    offset = {
      x: x - $position.x,
      y: y - $position.y
    }
  }

  function handleDrag(event) {
    if (dragging) {
      const { x, y } = event.detail.data.global
      position.update($position => ({
        x: x - offset.x,
        y: y - offset.y,
      }), { hard: true })
    }
  }

  function handleDragEnd() {
    dragging = false
    position.set(startingPosition, { soft: 1 })
  }
</script>

<Application
  width={400}
  height={400}
  antialias>
    <Text
      x={200}
      y={300}
      anchor={new Point(0.5, 0.5)}
      text="Try clicking and dragging the mushroom"
      style={{ fill: 'white', fontSize: 20 }} />
    <Sprite
      texture={Texture.from('/assets/mushroom.png')}
      anchor={new Point(0.5, 0.5)}
      x={$position.x}
      y={$position.y}
      rotation={($position.x - startingPosition.x) * 0.02}
      interactive
      buttonMode
      on:pointerdown={handleDragStart}
      on:pointerup={handleDragEnd}
      on:pointerupoutside={handleDragEnd}
      on:mousemove={handleDrag} />
</Application>
```

### Tween

```svelte example csr
<script>
  import { onMount} from 'svelte'
  import { Application,  Graphics, Ticker } from 'svelte-pixi'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { Point } from '@pixi/math'

  let app
  const barWidth = 200

  const progress = tweened(barWidth / 5, {
    duration: 400,
    easing: cubicOut
  })

  let step = 0

  function tick() {
    step += 1

    if (step > 100) {
      step = 0

      if ($progress < barWidth) {
        $progress += barWidth / 5
      } else {
        $progress = barWidth / 5
      }
    }
  }

</script>

<Application
  bind:instance={app}
  width={400}
  height={400}
  antialias>
  <Ticker on:tick={tick} />
  <Graphics
    x={200}
    y={200}
    pivot={new Point(barWidth / 2, 0)}
    draw={graphics => {
      graphics.clear()
      graphics.beginFill(0xff0000)
      graphics.drawRect(0, 0, $progress, 50)
      graphics.endFill()
    }}/>
</Application>
```
