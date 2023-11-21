<script>
  import { Application, AssetsLoader, Container } from 'svelte-pixi'
  import IntersectionObserver from 'svelte-intersection-observer'

  export let meta

  let width = parseInt(getMetaValue('width') || '400')
  let height = parseInt(getMetaValue('height') || '400')

  let assets = JSON.parse(getMetaValue('assets') || '[]')

  let intersecting = true
  let element
  let app

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

<Application bind:instance={app} autoStart={false} {width} {height}>
  <div bind:this={element} slot="view">
    <IntersectionObserver {element} bind:intersecting />
  </div>

  <AssetsLoader {assets}>
    <Container sortableChildren>
      <slot />
    </Container>
  </AssetsLoader>
</Application>
