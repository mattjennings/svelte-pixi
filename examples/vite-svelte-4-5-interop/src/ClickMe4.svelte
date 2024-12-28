<script>
  import { Text } from 'svelte-pixi/svelte-4'

  export let x
  export let y
</script>

<Text
  {x}
  {y}
  eventMode="static"
  text="Click me 4"
  anchor={0.5}
  style={{ fill: 'white' }}
  on:click
/>
