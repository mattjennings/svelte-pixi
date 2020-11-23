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

## Custom Host Element

If you want to customize the element that the canvas is rendered into, `Pixi` provides a `render` action as a prop

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

<style>
  :global(.custom canvas){
    border: 5px solid tomato;
    border-radius: 5px;
  }
</style>

<Pixi {app} let:render>
  <div class="custom" use:render>
    <!-- some cool components -->
  </div>
</Pixi>
```

## Properties

```properties
./../../packages/svelte-pixi/src/Pixi.svelte
```
