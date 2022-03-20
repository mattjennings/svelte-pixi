<script>
  import { Texture } from '@pixi/core'
  import { Pixi, Loader, Sprite, Text } from 'svelte-pixi'
</script>

<Pixi width={400} height={400} antialias backgroundColor={0xffffff}>
  <Loader let:progress resources={['/assets/great-success.png']}>
    <slot slot="loading">
      <Text text={`Loading... ${progress}`} x={200} y={200} anchor={0.5} />
    </slot>

    <Sprite
      texture={Texture.from('/assets/great-success.png')}
      x={20}
      y={50}
      width={360}
      height={300}
    />
  </Loader>
</Pixi>
