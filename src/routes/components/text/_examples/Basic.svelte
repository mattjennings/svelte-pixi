<script>
  import { Pixi, Text } from 'svelte-pixi'
</script>

<Pixi width={400} height={400} antialias>
  <Text
    text="Hello World"
    anchor={0.5}
    x={200}
    y={200}
    style={{
      fill: 'white',
    }}
  />
</Pixi>
