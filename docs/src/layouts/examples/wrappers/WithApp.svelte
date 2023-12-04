<script>
  import { Application, AssetsLoader } from 'svelte-pixi'
  import { onMount } from 'svelte'
  import { Layout } from 'svelte-pixi/experimental'
  import IntersectionObserver from 'svelte-intersection-observer'
  import Stats from 'stats-js'

  /**
   * @type {string}
   */
  export let meta

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

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="with-app-container w-full h-full overflow-hidden"
>
  <Application
    bind:instance={app}
    autoStart={false}
    width={800}
    height={400}
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
      <Layout align="center" sortableChildren {width} {height}>
        <slot />
      </Layout>
    </AssetsLoader>
  </Application>
</div>

<style>
  :global(.with-app-container canvas) {
    min-width: 100%;
    max-width: none;
  }
</style>
