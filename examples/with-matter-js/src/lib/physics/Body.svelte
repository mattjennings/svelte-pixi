<script>
  import { Bodies, World } from 'matter-js'
  import { onTick } from 'svelte-pixi'
  import { onMount, getContext } from 'svelte'

  export let x = 0
  export let y = 0
  export let angle = 0

  export let width
  export let height

  export let body = Bodies.rectangle(x, y, width, height, {
    angle,
  })

  const { engine } = getContext('physics')

  $: body.position.x = x
  $: body.position.y = y
  $: body.angle = angle

  onTick(() => {
    x = body.position.x
    y = body.position.y
    angle = body.angle
  }, -Infinity)

  onMount(() => {
    World.add(engine.world, body)

    return () => {
      World.remove(engine.world, body)
    }
  })
</script>
