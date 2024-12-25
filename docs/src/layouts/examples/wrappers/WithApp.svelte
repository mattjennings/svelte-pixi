<script>
  import { Application, AssetsLoader, Container } from 'svelte-pixi/svelte-5'
  import IntersectionObserver from 'svelte-intersection-observer'
  import Stats from 'stats-js'

  let { assets = [], bg = 0x000000, stats = false, children } = $props()

  let intersecting = $state(true)
  let element = $state()

  /**
   * @type {HTMLElement}
   */
  let statsElement = $state()
  let app = $state()
  let clientWidth = $state(0)
  let clientHeight = $state(0)

  let containerX = $state(0)
  let containerY = $state(0)
  const resolution = {
    width: 718,
    height: 400,
  }

  // only render while in view
  $effect(() => {
    if (app) {
      try {
        if (!intersecting) {
          app.stop()
        } else {
          app.start()
        }
      } catch (err) {
        console.error(err)
      }
    }
  })

  function onAppInit(instance) {
    app = instance
  }

  $effect(() => {
    if (app && statsElement && stats) {
      try {
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
      } catch (e) {
        console.error(e)
      }
    }
  })

  $effect(() => {
    if (clientWidth > 0 && clientHeight > 0) {
      containerX = -((resolution.width - clientWidth) / 2)
      containerY = -((resolution.height - clientHeight) / 2)
    }
  })
</script>

<div bind:clientWidth bind:clientHeight>
  <Application
    oninit={onAppInit}
    autoStart={false}
    width={resolution.width}
    height={resolution.height}
    backgroundColor={bg}
  >
    {#snippet view()}
      <div bind:this={element} class="relative not-content">
        {#if stats}
          <div
            bind:this={statsElement}
            class="absolute top-0 left-0 z-100 [&>div]:!absolute"
          ></div>
        {/if}

        <IntersectionObserver
          {element}
          bind:intersecting
          rootMargin={'100px'}
        />
      </div>
    {/snippet}

    <AssetsLoader {assets}>
      <!--
        offset X to account for coordinates when width is less than 800. when width is 800, x should be 0.
        but if width is 400, x should be -400. this will center the content while keeping the coordinates
        the same for examples.
       -->
      <Container x={containerX} y={containerY}>
        {#if intersecting}
          {@render children?.()}
        {/if}
      </Container>
    </AssetsLoader>
  </Application>
</div>
