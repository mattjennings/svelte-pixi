<script>
  import { Application } from 'svelte-pixi'
  import IntersectionObserver from 'svelte-intersection-observer'
  import Loader from '$lib/Loader.svelte'
  import Container from '$lib/Container.svelte'

  export let resources = []

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
  <Loader {resources}>
    <Container sortableChildren>
      <slot />
    </Container>
  </Loader>
</Application>
