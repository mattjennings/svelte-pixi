# Graphics

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { onMount } from 'svelte'
  import { Pixi, Graphics } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400
  })

  let grow = true
  let size = 50

  onMount(() => {
    function tick(delta) {
      let growBy = delta * (grow ? 1 : -1)
      size += growBy

      if (size >= 200) {
        grow = false
      } else if (size <= 50) {
        grow = true
      }
    }

    app.ticker.add(tick)

    return () => app.ticker.remove(tick)
  })
</script>

<Pixi {app}>
  <Graphics
    x={200}
    y={200}
    draw={(graphics) => {
      graphics.clear()
      graphics.beginFill(0xDE3249)
      graphics.drawCircle(0, 0, size)
      graphics.endFill()
    }} />
</Pixi>
```

```properties pixiUrl:PIXI.Graphics.html
./../../packages/svelte-pixi/src/Graphics.svelte
```
