---
title: Custom Renderer
---

If you want more control over the rendering process, you can use the [Renderer](/docs/components/renderer) and [Ticker](/docs/components/ticker) components instead of the [Application](/docs/components/application) component.

`Renderer` will create the Pixi renderer and root container (the stage) for you. Ticker can be used to trigger the rendering, but is not required.

```svelte example csr
<script>
  import { Renderer, Ticker, Text } from 'svelte-pixi'

  let renderer
  let stage
</script>

<Renderer
  bind:instance={renderer}
  bind:stage={stage}
  width={400}
  height={400}
  antialias
>
  <Ticker
    on:tick={() => {
      renderer.render(stage)
    }}>
    <Text
      x={200}
      y={200}
      text="Hello World"
      style={{ fill: 'white' }}
      anchor={0.5}
    />
  </Ticker>
</Renderer>
```

## Rendering without a Ticker

For one reason or another, you may want to call the rendering yourself instead of using a ticker.

For example, using `requestAnimationFrame`:

```svelte example csr
<script>
  import { onMount } from 'svelte'
  import { Text, Renderer } from 'svelte-pixi'
  import DraggableCircle from './_/DraggableCircle.svelte'

  let renderer
  let stage
  let needsRender = false

  function render() {
    requestAnimationFrame(() => {
      renderer.render(stage)
      render()
    })
  }

  render()
</script>

<Renderer
  bind:instance={renderer}
  bind:stage={stage}
  width={400}
  height={400}
  antialias
>
  <Text
    x={200}
    y={300}
    text="Click and drag"
    style={{ fill: 'white' }}
    anchor={0.5}
  />
  <DraggableCircle x={200} y={200} />
</Renderer>

```

## Rendering on Svelte Updates

`Renderer` emits a `componentupdate` event whenever a svelte-pixi component is updated. You can use this to trigger renders only when Svelte updates occur.

```svelte example csr
<script>
  import { onMount } from 'svelte'
  import { Text, Renderer } from 'svelte-pixi'
  import DraggableCircle from './_/DraggableCircle.svelte'

  let renderer
  let stage
  let needsRender = false

  function handleComponentUpdate() {
    // flag that a render is needed
    needsRender = true
  }

  function render() {
    // we still use requestAnimationFrame so we can cap the framerate
    requestAnimationFrame(() => {
      if (needsRender) {
        renderer.render(stage)
        needsRender = false
      }
      render()
    })
  }

  render()
</script>

<Renderer
  bind:instance={renderer}
  bind:stage={stage}
  width={400}
  height={400}
  antialias
  on:componentupdate={handleComponentUpdate}
>
  <Text
    x={200}
    y={300}
    text="Click and drag"
    style={{ fill: 'white' }}
    anchor={0.5}
  />
  <DraggableCircle x={200} y={200} />
</Renderer>
```

I generally would not recommend this unless you have good reason. It is more useful for apps that require few re-renders.
