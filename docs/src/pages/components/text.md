# Text

Create a line or multiple lines of text. The text is created using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

The primary advantage of this class over BitmapText is that you have great control over the style of the text, which you can change at runtime.

The primary disadvantages is that each piece of text has it's own texture, which can use more memory. When text changes, this texture has to be re-generated and re-uploaded to the GPU, taking up time.

To split a line you can use '\n' in your text string, or, on the style prop, change its `wordWrap` property to true and and give the `wordWrapWidth` property a value.

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
