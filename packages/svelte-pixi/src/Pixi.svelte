<script lang="ts">
  import { onMount, setContext } from 'svelte'

  /**
   * if parent is using the render prop action
   */
  let isManualRender = false
  let isMounted = false

  /**
   * The pixi.js application instance
   */
  export let app: PIXI.Application

  /**
   * If you want to customize the host element, you can use this as an action
   */
  export const render = (node) => {
    if (!isMounted) {
      isManualRender = true
    }
    node.appendChild(app.view)
  }

  setContext('pixi/app', app)
  setContext('pixi/stage', app.stage)

  onMount(() => {
    isMounted = true
  })
</script>

{#if !isManualRender && isMounted}
  <div use:render />
{/if}

<slot {render} />
