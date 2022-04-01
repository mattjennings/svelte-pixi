<script context="module" lang="ts">
  if (typeof window !== 'undefined') {
    registerRendererPlugin('batch', BatchRenderer)
  }

  export function getRenderer(): Renderer | AbstractRenderer {
    return getContext('pixi/renderer')
  }

  export function getStage(): Container {
    return getContext('pixi/stage')
  }
</script>

<script lang="ts">
  import type { IRendererOptions } from '@pixi/core'
  import {
    AbstractRenderer,
    autoDetectRenderer,
    BatchRenderer,
    Renderer,
  } from '@pixi/core'
  import SvelteContainer from './Container.svelte'
  import { Container } from '@pixi/display'
  import { createEventDispatcher, getContext, setContext } from 'svelte'
  import { registerRendererPlugin } from './util/plugins'

  type $$Props = IRendererOptions & {
    instance?: AbstractRenderer
    stage?: Container
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

  export let instance: $$Props['instance'] = autoDetectRenderer({
    ...$$restProps,
  })

  export let stage: Container = new Container()

  /**
   *  If you want to customize the host element,
   *  you can declare this prop via `let:view` and use it
   *  as an action on a child element
   **/
  export function view(node: HTMLElement): void {
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