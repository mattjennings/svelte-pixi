<script>
  import { Application, Text } from 'svelte-pixi'
</script>

<Application width={400} height={400} antialias>
  <Text
    text="Hello World"
    style={{ fill: 'white' }}
    x={200}
    y={200}
    anchor={0.5}
  />
</Application>
