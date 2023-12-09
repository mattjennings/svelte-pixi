<script>
  import { Application, AssetsLoader, Container } from 'svelte-pixi'
  import { onMount } from 'svelte'
  import IntersectionObserver from 'svelte-intersection-observer'
  import Stats from 'stats-js'

  export let assets = []
  export let bg = 0x000000
  export let stats = false

  let intersecting = true
  let element
  /**
   * @type {HTMLElement}
   */
  let statsElement
  let app
  let width
  let height

  const resolution = {
    width: 718,
    height: 400,
  }

  // only render while in view
  $: if (app) {
    if (!intersecting) {
      app.stop()
    } else {
      app.start()
    }
  }

  onMount(() => {
    try {
      if (app && statsElement && stats) {
        let _stats = new Stats()
        statsElement.appendChild(_stats.dom)

        _stats.showPanel(0)

        app.ticker.add(
          () => {
            _stats.begin()
          },
          null,
          -Infinity,
        )
        app.ticker.add(
          () => {
            _stats.end()
          },
          null,
          Infinity,
        )
      }
    } catch (e) {
      console.error(e)
    }
  })
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
  <Application
    bind:instance={app}
    autoStart={false}
    width={resolution.width}
    height={resolution.height}
    backgroundColor={bg}
  >
    <div bind:this={element} class="relative not-content" slot="view">
      {#if stats}
        <div
          bind:this={statsElement}
          class="absolute top-0 left-0 z-100 [&>div]:!absolute"
        />
      {/if}

      <IntersectionObserver {element} bind:intersecting />
    </div>

    <AssetsLoader {assets}>
      <!--
        offset X to account for coordinates when width is less than 800. when width is 800, x should be 0.
        but if width is 400, x should be -400. this will center the content while keeping the coordinates
        the same for examples.
       -->
      <Container
        x={-((resolution.width - width) / 2)}
        y={-((resolution.height - height) / 2)}
      >
        <slot />
      </Container>
    </AssetsLoader>
  </Application>
</div>
