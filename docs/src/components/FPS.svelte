<script>
  import { Text, onTick, getTicker } from 'svelte-pixi'

  const { ticker } = getTicker()
  let fps = 0

  onTick(() => {
    // measure fps
    fps = ticker.FPS
  })
</script>

<Text
  x={-60}
  y={-220}
  text={`FPS: ${fps.toFixed(0)}`}
  style={{
    fill: 'white',
    stroke: 'black',
    strokeThickness: 6,
    fontSize: 32,
  }}
  zIndex={99999}
/>
