<script>
  import { Application } from 'svelte-pixi'
  import Box from './lib/Box.svelte'
  import Physics from './lib/physics/Physics.svelte'

  // 20 boxes with random positions between 400 and 400
  const boxes = Array.from({ length: 20 }, () => {
    const x = Math.random() * 380 + 20
    const y = Math.random() * 380 + 20
    return { x, y }
  })
</script>

<Application width={400} height={400} antialias>
  <Physics
    bounds={{ width: 400, height: 400 }}
    gravity={{
      y: 0.3,
    }}
  >
    {#each boxes as box}
      <Box x={box.x} y={box.y} />
    {/each}
  </Physics>
</Application>
