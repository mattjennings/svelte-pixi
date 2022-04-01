<script context="module" lang="ts">
  if (typeof window !== 'undefined') {
    registerApplicationPlugin(AppLoaderPlugin)
    registerRendererPlugin('batch', BatchRenderer)
  }

  export function registerApplicationPlugin(plugin: IApplicationPlugin) {
    const registered = (Application as any)._plugins
    if (!registered.includes(plugin)) {
      Application.registerPlugin(plugin)
    }
  }

  export function registerRendererPlugin(
    name: string,
    plugin: IRendererPluginConstructor
  ) {
    const registered = (Renderer as any).__plugins ?? {}
    if (!registered[name]) {
      Renderer.registerPlugin(name, plugin)
    }
  }

  export function getPixi(): PixiContext {
    return getContext('pixi')
  }

  export interface PixiContext {
    app: Application
    render: () => void
  }
</script>

<script lang="ts">
  import {
    createEventDispatcher,
    getContext,
    onMount,
    setContext,
  } from 'svelte'
  import { Application } from '@pixi/app'
  import { Ticker, UPDATE_PRIORITY } from '@pixi/ticker'
  import { AppLoaderPlugin } from '@pixi/loaders'
  import type { IApplicationOptions, IApplicationPlugin } from '@pixi/app'
  import type { IRendererPluginConstructor } from '@pixi/core'
  import { BatchRenderer, Renderer } from '@pixi/core'

  type $$Props = IApplicationOptions & {
    instance?: Application
    disableRenderOnTick?: boolean
  }

  const dispatch = createEventDispatcher()

  /**
   * if parent is using the render prop action
   */
  let isManualView = false
  let isMounted = false

  /**
   * Disables default behaviour of rendering the canvas on each tick.
   * You will be responsible for triggering renders yourself (via app.renderer.render())
   */
  export let disableRenderOnTick = false

  export let instance: $$Props['instance'] = new Application({
    ...$$restProps,
  })

  if (disableRenderOnTick) {
    instance.ticker.remove(instance.render, instance)
  }

  /**
   *  If you want to customize the host element,
   *  you can declare this prop via `let:view` and use it
   *  as an action on a child element
   **/
  export function view(node): void {
    if (!isMounted) {
      isManualView = true
    }
    node.appendChild(instance.view)
  }

  setContext<PixiContext>('pixi', {
    app: instance,
    render: () => instance.renderer.render(instance.stage),
  })
  setContext('pixi/container', instance.stage)

  // internal functions that I dont want to expose in pixi context
  setContext('pixi_internal', {
    onComponentUpdate: () => {
      dispatch('componentupdate')
    },
  })

  onMount(() => {
    isMounted = true
  })
</script>

{#if typeof window !== 'undefined'}
  {#if !isManualView && isMounted}
    <div use:view />
  {/if}

  <slot {view} />
{/if}
