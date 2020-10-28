# Loader

Loads the assets (textures, audio, etc) required for your components.
It contains two slots, `loading` and default. The default slot will not
render until loading has finished.

## Simple

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Loader, Sprite, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
    transparent: true
  })

</script>

<Pixi {app}>
  <Loader
    let:progress
    resources={['static/great-success.png']}>
    <slot slot="loading">
      <Text
        text={`Loading... ${progress}`}
        x={200}
        y={200}
        anchor={new PIXI.Point(0.5, 0.5)} />
    </slot>

    <Sprite
      texture={new PIXI.Texture.from('static/great-success.png')}
      x={20}
      y={50}
      width={360}
      height={300} />
  </Loader>
</Pixi>
```

## Progress

You can show progress by using the `progress` prop from the `loading` slot.

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Loader, Sprite, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
    transparent: true
  })
</script>

<Pixi {app}>
  <Loader
    let:progress
    resources={['static/great-success.png', 'static/assets/adventurer.png']}>
    <slot slot="loading">
      <Text
        text={`Loading... ${progress}`}
        x={200}
        y={200}
        anchor={new PIXI.Point(0.5, 0.5)} />
    </slot>

    <Sprite
      texture={new PIXI.Texture.from('static/great-success.png')}
      x={20}
      y={50}
      width={360}
      height={300} />
  </Loader>
</Pixi>
```

## Progress (with Typescript)

If you're a Typescript user, you will get an error about the `progress` slot prop. Unfortunately, until
Svelte allows typing of slots, there's no getting rid of this error. However, you can track
progress yourself using the `on:progress` event

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Loader, Sprite, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
    transparent: true
  })

  let progress = 0
</script>

<Pixi {app}>
  <Loader
    resources={['static/great-success.png', 'static/assets/adventurer.png']}
    on:progress={ev => {
      progress = ev.progress
    }}
    >
    <slot slot="loading">
      <Text
        text={`Loading... ${progress}`}
        x={200}
        y={200}
        anchor={new PIXI.Point(0.5, 0.5)} />
    </slot>

    <Sprite
      texture={new PIXI.Texture.from('static/great-success.png')}
      x={20}
      y={50}
      width={360}
      height={300} />
  </Loader>
</Pixi>
```

## Properties

```properties
./../../packages/svelte-pixi/src/Loader.svelte
```

## Events

```properties
on:complete | Dispatched when completely loaded all resources | function
on:progress | Dispatched once per loaded or errored resource | function
on:error | Dispatched once per errored resource | function
on:start | Dispatched when the loader begins to loading process | function
on:load | Dispatched once per loaded resource | function
```
