---
title: svelte/motion
---

You can animate using `svelte/motion` just like you would in other Svelte application.

### Spring

```svelte example csr
<script>
  import { Pixi, Text, Sprite, Loader } from 'svelte-pixi'
  import { Texture } from '@pixi/core'
  import { spring } from 'svelte/motion'

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

<Pixi
  width={400}
  height={400}
  antialias>
    <Text
      x={200}
      y={300}
      anchor={0.5}
      text="Try clicking and dragging the mushroom"
      style={{ fill: 'white', fontSize: 20 }} />
    <Sprite
      texture={Texture.from('/assets/mushroom.png')}
      anchor={0.5}
      x={$position.x}
      y={$position.y}
      rotation={($position.x - startingPosition.x) * 0.02}
      interactive
      buttonMode
      on:pointerdown={handleDragStart}
      on:pointerup={handleDragEnd}
      on:pointerupoutside={handleDragEnd}
      on:mousemove={handleDrag} />
</Pixi>
```

### Tween

```svelte example csr
<script>
  import { onMount} from 'svelte'
  import { Pixi,  Graphics } from 'svelte-pixi'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  let app
  const barWidth = 200

  const progress = tweened(barWidth / 5, {
    duration: 400,
    easing: cubicOut
  })

  onMount(() => {
    let step = 0

    function tick(delta) {
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

    app.ticker.add(tick)
    return () => app.ticker.remove(tick)
  })
</script>

<Pixi
  bind:instance={app}
  width={400}
  height={400}
  antialias>
  <Graphics
    x={200}
    y={200}
    pivot={{ x: barWidth / 2}}
    draw={graphics => {
      graphics.clear()
      graphics.beginFill(0xff0000)
      graphics.drawRect(0, 0, $progress, 50)
      graphics.endFill()
    }}/>
</Pixi>
```
