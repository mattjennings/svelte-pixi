<script>
  import { Application, AssetsLoader, Container } from 'svelte-pixi'
  import IntersectionObserver from 'svelte-intersection-observer'

  export let assets = []

  console.log($$props)
  let element
  let intersecting = true
  let app

  // only render while in view
  $: if (app) {
    if (!intersecting) {
      app.stop()
    } else {
      app.start()
    }
  }
</script>

<Application bind:instance={app} autoStart={false} {...$$restProps}>
  <div bind:this={element} slot="view">
    <IntersectionObserver {element} bind:intersecting />
  </div>
  <AssetsLoader {assets}>
    <Container sortableChildren>
      <slot />
    </Container>
  </AssetsLoader>
</Application>
