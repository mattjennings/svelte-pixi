<script>
  import { Text, onTick, getTicker } from 'svelte-pixi'
  import { Layout } from 'svelte-pixi/experimental'
  const { ticker } = getTicker()
  let fps = 0

  onTick(() => {
    // measure fps
    fps = ticker.FPS
  })
</script>

<Layout bounds="global" x={0}>
  <Text
    x={0}
    y={0}
    text={`FPS: ${fps.toFixed(0)}`}
    style={{
      fill: 'white',
      stroke: 'black',
      strokeThickness: 6,
      fontSize: 32,
    }}
    zIndex={99999}
  />
</Layout>
