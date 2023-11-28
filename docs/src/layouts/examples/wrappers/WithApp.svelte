<script>
  import { Application, AssetsLoader } from 'svelte-pixi'
  import { Layout } from 'svelte-pixi/experimental'
  import Stats from 'stats-js'

  const { meta, children } = $props()

  let assets = JSON.parse(getMetaValue('assets') || '[]')
  let backgroundColor = getMetaValue('bg') || 'black'
  let showStats = getMetaValue('stats') || false

  let intersecting = $state(true)
  let element = $state(null)
  let statsElement = $state(null)
  let app = $state()
  let width = $state(0)
  let height = $state(0)

  $effect(() => {
    // setup intersection observer on element, set intersecting = true when intersecting
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        intersecting = entries[0].isIntersecting
      })
      observer.observe(element)
      return () => observer.disconnect()
    }
  })

  // only render app while in view
  $effect(() => {
    if (!intersecting) {
      app?.stop()
    } else {
      app?.start()
    }
  })

  function getMetaValue(key) {
    return (
      meta.find((m) => m.includes(key))?.split('=')[1] ||
      !!meta.find((m) => m === key)
    )
  }

  $effect(() => {
    try {
      if (app && statsElement && showStats) {
        let stats = new Stats()
        statsElement.appendChild(stats.dom)

        stats.showPanel(0)

        const onBegin = () => {
          stats.begin()
        }
        const onEnd = () => {
          stats.end()
        }

        app.ticker.add(onBegin, null, -Infinity)
        app.ticker.add(onEnd, null, Infinity)
        return () => {
          app.ticker.remove(onBegin)
          app.ticker.remove(onEnd)
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
</script>

{#snippet view()}
  <div bind:this={element} class="relative not-content">
    {#if showStats}
      <div
        bind:this={statsElement}
        class="absolute top-0 left-0 z-100 [&>div]:!absolute"
      />
    {/if}
  </div>
{/snippet}

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="with-app-container w-full h-full overflow-hidden"
>
  {#if width > 0}
    <Application
      bind:instance={app}
      autoStart={false}
      width={800}
      height={400}
      {backgroundColor}
      {view}
    >
      <AssetsLoader {assets}>
        <Layout align="center" sortableChildren {width} {height}>
          {@render children()}
        </Layout>
      </AssetsLoader>
    </Application>
  {/if}
</div>

<style>
  :global(.with-app-container canvas) {
    min-width: 100%;
    max-width: none;
  }
</style>
