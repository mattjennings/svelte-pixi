<script>
  import { onMount } from 'svelte'

  let canvas
  const width = 800
  const height = 600
  const resolution = window.devicePixelRatio

  onMount(() => {})
</script>

<canvas bind:this={canvas} {width} {height} />
