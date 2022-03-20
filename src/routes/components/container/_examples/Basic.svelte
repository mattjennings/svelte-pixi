<script>
  import { onMount } from 'svelte'
  import { Pixi, Container, Text } from 'svelte-pixi'

  let x = 200
  let y = 100
  let app

  // move container back and forth
  onMount(() => {
    let direction = -1
    function tick() {
      if (x <= 0) {
        direction = 1
      } else if (x >= 340) {
        direction = -1
      }

      x += 1 * direction
    }

    app.ticker.add(tick)

    return () => app.ticker.remove(tick)
  })
</script>

<Pixi bind:instance={app} width={400} height={400} antialias>
  <Container {x} {y} height={200} width={200}>
    <Text text="Hello" x={0} y={0} style={{ fill: 'white' }} />
    <Text text="World" x={0} y={60} style={{ fill: 'white' }} />
  </Container>
</Pixi>
