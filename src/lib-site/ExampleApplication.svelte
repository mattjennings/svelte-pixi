<script>
  import { Application } from 'svelte-pixi'
  import IntersectionObserver from 'svelte-intersection-observer'
  import AssetsLoader from '$lib/AssetsLoader.svelte'
  import Container from '$lib/Container.svelte'

  export let assets = []

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

<Application
  bind:instance={app}
  autoStart={false}
  resizeTo={window}
  {...$$restProps}
>
  <div bind:this={element} slot="view">
    <IntersectionObserver {element} bind:intersecting />
  </div>
  <AssetsLoader {assets}>
    <Container sortableChildren>
      <slot />
    </Container>
  </AssetsLoader>
</Application>
