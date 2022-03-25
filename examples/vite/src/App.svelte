<script>
  import Player from './Player.svelte'
  import { Pixi, Text, Loader } from 'svelte-pixi'
</script>

<Pixi width={400} height={400} antialias>
  <Loader resources={['adventurer/spritesheet.json']}>
    <slot slot="loading">
      <Text text={`Loading...`} style={{ fill: 'white' }} x={0} y={0} />
    </slot>

    <Text text="move with arrow keys" style={{ fill: 'white' }} x={120} y={0} />
    <Player />
  </Loader>
</Pixi>
