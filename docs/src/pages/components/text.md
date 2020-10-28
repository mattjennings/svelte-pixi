# Text

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })

</script>

<Pixi {app}>
  <Text
    text="Hello World"
    anchor={new PIXI.Point(0.5, 0.5)}
    x={200}
    y={200}
    style={{
      fill: 'white'
    }} />
</Pixi>
```

## Properties

```properties pixiUrl:PIXI.Text.html
./../../packages/svelte-pixi/src/Text.svelte
```

## Events

[See PIXI.Text events](https://pixijs.download/release/docs/PIXI.Text.html#event:added)
