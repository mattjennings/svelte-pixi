---
title: Reducing Bundle Size
---

Pixi can be used from either the all-in-one `pixi.js` package, or its [individual `@pixi` packages](https://pixijs.io/customize/). By default, `svelte-pixi` will include `pixi.js` so that every feature is included out of the box. However, this results in a potentially larger bundle size than necessary.

Instead of importing from `svelte-pixi`, you can import from `svelte-pixi/lite`. This will only include the `@pixi` packages required for the components that you use (i.e, `@pixi/sprite` for the `Sprite` component)

## Extensibility

For extended functionality on components, such as interactivity, you will have to import and setup the appropriate `@pixi/*` package.

Visit the [pixi.js/customize](https://pixijs.io/customize/) page to see which packages require which plugins.

Here is an example of how to add interactivity via the `@pixi/interaction` package:

```svelte example csr
<script context="module">
  // we do this in a context="module" script so that
  // it's only loaded once
  import { InteractionManager } from '@pixi/interaction'
  import { Renderer } from '@pixi/core'

  Renderer.registerPlugin('interaction', InteractionManager)
</script>

<script>
  import { Pixi, Sprite, Text } from 'svelte-pixi/lite'
  import { Rectangle } from '@pixi/math/'

  let text

  $: width = text?.width ?? 0
  $: height = text?.height ?? 0
</script>

<Pixi width={400} height={400}>
    <Text
      bind:instance={text}
      text="Click me!"
      style={{
        fill: 'white',
      }}
      x={200 - (width / 2)}
      y={200 - (height / 2)}
      interactive
      buttonMode
      hitArea={new Rectangle(0, 0, width, height)}
      on:click={() => {
        alert('you clicked me')
      }}
    />
</Pixi>
```

## Aliasing

For convenience, you can setup your bundler to alias `svelte-pixi` to `svelte-pixi/lite`

```js
// a vite config, for example
import { defineConfig } from 'vite'

export default defineConfig({
  /* ... */
  resolve: {
    alias: {
      'svelte-pixi': 'svelte-pixi/lite',
    },
  },
})
```
