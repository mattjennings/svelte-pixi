<script>
  import { Application, Text } from 'svelte-pixi'
</script>

<Application width={400} height={400} antialias>
  <Text
    x={200}
    y={200}
    text="Hello World"
    anchor={0.5}
    style={{ fill: 'white' }}
  />
</Application>
