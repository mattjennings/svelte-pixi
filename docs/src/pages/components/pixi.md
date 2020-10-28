# Pixi

Renders a Pixi application. All child components will render to this.

## Usage

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })
</script>

<Pixi {app}>
  <!-- some cool components -->
</Pixi>
```

## Properties

```properties
./../../packages/svelte-pixi/src/Pixi.svelte
```
