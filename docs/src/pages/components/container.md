# Container

A Container represents a collection of display objects. They can be used to group
child components and manipulate them together.

When child components are rendered inside, their coordinates become local to the parent Container.

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { onMount } from 'svelte'
  import { Pixi, Container, Loader, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })

  let x = 200
  let y = 100

  // move container back and forth
  onMount(() => {
    let direction = -1
    function tick() {
      if (x <= 0) {
        direction = 1
      } else if (x >= 340) {
        direction = -1
      }

      x += 1 * direction
    }

    app.ticker.add(tick)

    return () => app.ticker.remove(tick)
  })
</script>

<Pixi {app}>
  <Container {x} {y} height={200} width={200}>
    <Text text="Hello" x={0} y={0} style={{ fill: 'white' }} />
    <Text text="World" x={0} y={60} style={{ fill: 'white' }} />
  </Container>
</Pixi>
```

## Properties

```properties pixiUrl:PIXI.Container.html
./../../packages/svelte-pixi/src/Container.svelte
```

## Events

[See PIXI.Container events](https://pixijs.download/release/docs/PIXI.Container.html#event:added)
