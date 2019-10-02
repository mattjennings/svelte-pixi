<script>
  import { setContext } from 'svelte'
  export let app

  setContext('app', app)
  setContext('stage', app.stage)

  function renderApp(node) {
    node.appendChild(app.view)

    return {
      destroy() {
        node.removeChild(app.view)
      }
    }
  }
</script>

<div use:renderApp>
  <slot />
</div>
