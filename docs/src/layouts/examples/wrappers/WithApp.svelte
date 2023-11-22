<script>
  import { Application, AssetsLoader } from 'svelte-pixi'
  import { Layout } from 'svelte-pixi/experimental'
  import IntersectionObserver from 'svelte-intersection-observer'

  export let meta

  let assets = JSON.parse(getMetaValue('assets') || '[]')
  let backgroundColor = getMetaValue('bg') || 0x000000

  let intersecting = true
  let element
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
    return meta.find((m) => m.includes(key))?.split('=')[1]
  }
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
    <div bind:this={element} slot="view">
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
