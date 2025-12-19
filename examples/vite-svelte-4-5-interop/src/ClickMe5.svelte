<script>
  import { Text } from 'svelte-pixi'

  const { x, y, onclick } = $props()
</script>

<Text
  {x}
  {y}
  eventMode="static"
  text="Click me 5"
  anchor={0.5}
  style={{ fill: 'white' }}
  {onclick}
/>
