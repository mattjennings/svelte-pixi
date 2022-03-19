<script lang="ts">
  import type PIXI from 'pixi.js'
  import { onMount, setContext } from 'svelte'

  /**
   * if parent is using the render prop action
   * @type {PIXI.Application}
   */
  let isManualRender = false
  let isMounted = false

  /** The pixi.js application instance */
  export let app: PIXI.Application

  /**
   *  If you want to customize the host element,
   *  you can declare this prop via `let:render` and use it
   *  as an action on a child element
   **/
  export function render(node): void {
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
