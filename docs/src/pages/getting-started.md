# Getting Started

disclaimer: svelte-pixi is still in its early stages, so don't expect everything to work perfectly.

[PRs are welcome if you'd like to contribute!](https://github.com/mattjennings/svelte-pixi)

### Install

```shell
npm install pixi.js svelte-pixi
```

### Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400
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
