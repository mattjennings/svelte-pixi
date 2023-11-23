<script>
  import { Engine, Bodies, World, Runner } from 'matter-js'
  import { onMount } from 'svelte'
  import { setContext } from 'svelte'

  export let bounds
  export let gravity

  const engine = Engine.create()

  const wallTop = Bodies.rectangle(bounds.width / 2, 0, bounds.width, 1, {
    isStatic: true,
  })
  const wallBottom = Bodies.rectangle(
    bounds.width / 2,
    bounds.height,
    bounds.width,
    1,
    {
      isStatic: true,
    },
  )
  const wallRight = Bodies.rectangle(
    bounds.width,
    bounds.height / 2,
    1,
    bounds.height,
    {
      isStatic: true,
    },
  )
  const wallLeft = Bodies.rectangle(0, bounds.height / 2, 1, bounds.height, {
    isStatic: true,
  })

  World.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight])

  setContext('physics', { engine })

  onMount(() => {
    let runner = Runner.create()
    Runner.run(runner, engine)

    if (gravity.x) {
      engine.world.gravity.x = gravity.x
    }

    if (gravity.y) {
      engine.world.gravity.y = gravity.y
    }

    if (gravity.scale) {
      engine.world.gravity.scale = gravity.scale
    }
    return () => {
      Runner.stop(runner)
    }
  })
</script>

<slot />
