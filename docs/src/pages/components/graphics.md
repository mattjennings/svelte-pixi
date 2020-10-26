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
  let width = 50

  onMount(() => {
    function tick(delta) {
      let growBy = 2 * delta * (grow ? 1 : -1)
      width += growBy

      if (width >= 200) {
        grow = false
      } else if (width <= 50) {
        grow = true
      }
    }

    app.ticker.add(tick)

    return () => app.ticker.remove(tick)
  })
</script>

<Pixi {app}>
  <Graphics
    x={100}
    y={100}
    draw={(graphics) => {
      graphics.clear()
      graphics.beginFill(0xDE3249)
      graphics.drawRect(0, 0, width, 100)
      graphics.endFill()
    }} />
</Pixi>
```

```properties pixiUrl:PIXI.Graphics.html
./../../packages/svelte-pixi/src/Graphics.svelte
```
