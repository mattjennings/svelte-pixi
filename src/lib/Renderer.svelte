<script context="module" lang="ts">
  export function getRenderer(): PIXI.Renderer | PIXI.AbstractRenderer {
    return getContext('pixi/renderer')
  }

  export function getStage(): PIXI.Container {
    return getContext('pixi/stage')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import SvelteContainer from './Container.svelte'
  import { createEventDispatcher, getContext, setContext } from 'svelte'

  type $$Props = PIXI.IRendererOptions & {
    instance?: PIXI.AbstractRenderer
    stage?: PIXI.Container
  }

  type $$Slots = {
    default: {
      view: (node: HTMLElement) => void
    }
    view: {
      view: (node: HTMLElement) => void
    }
  }

  const dispatch = createEventDispatcher()

  export let instance: $$Props['instance'] = PIXI.autoDetectRenderer({
    ...$$restProps,
  })

  /**
   * The Container instance to use as the stage
   */
  export let stage: PIXI.Container = new PIXI.Container()

  function view(node: HTMLElement): void {
    if (node.childNodes.length) {
      node.childNodes[0].appendChild(instance.view)
    } else {
      node.appendChild(instance.view)
    }
  }

  setContext('pixi/renderer', instance)

  // internal functions that I dont want to expose in pixi context
  setContext('pixi/renderer_internal', {
    onComponentUpdate: () => {
      dispatch('componentupdate')
    },
  })
</script>

{#if $$slots.view}
  <div use:view>
    <slot name="view" />
  </div>
{:else}
  <div use:view />
{/if}

<SvelteContainer instance={stage} parent={null}>
  <slot />
</SvelteContainer>
