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

  let assets = JSON.parse(getMetaValue('assets') || '[]')
  let backgroundColor = getMetaValue('bg') || 0x000000
  let showStats = getMetaValue('stats')

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

  function getMetaValue(key) {
    return (
      !!meta.find((m) => m === key) ||
      meta.find((m) => m.includes(key))?.split(/s/)[1]
    )
  }

  onMount(() => {
    try {
      if (app && statsElement && showStats) {
        let stats = new Stats()
        statsElement.appendChild(stats.dom)

        stats.showPanel(0)

        app.ticker.add(
          () => {
            stats.begin()
          },
          null,
          -Infinity,
        )
        app.ticker.add(
          () => {
            stats.end()
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
    {backgroundColor}
  >
    <div bind:this={element} class="relative not-content" slot="view">
      {#if showStats}
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
