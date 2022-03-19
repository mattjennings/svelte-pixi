<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Loader, Sprite, Text } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true,
    backgroundColor: 0xffffff,
  })
</script>

<Pixi {app}>
  <Loader let:progress resources={['/assets/great-success.png']}>
    <slot slot="loading">
      <Text
        text={`Loading... ${progress}`}
        x={200}
        y={200}
        anchor={new PIXI.Point(0.5, 0.5)}
      />
    </slot>

    <Sprite
      texture={PIXI.Texture.from('/assets/great-success.png')}
      x={20}
      y={50}
      width={360}
      height={300}
    />
  </Loader>
</Pixi>
