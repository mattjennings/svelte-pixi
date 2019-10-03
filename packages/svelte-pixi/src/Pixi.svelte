<script>
  import { setContext } from 'svelte'
  export let app

  setContext('pixi-app', app)
  setContext('pixi-stage', app.stage)

  function renderApp(node) {
    node.appendChild(app.view)

    return {
      destroy() {
        node.removeChild(app.view)
      }
    }
  }
</script>

<div id="pixi-wrapper" use:renderApp>
  <slot />
</div>
