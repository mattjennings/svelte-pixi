<script context="module" lang="ts">
  if (typeof window !== 'undefined') {
    registerApplicationPlugin(TickerPlugin)
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
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import { Application } from '@pixi/app'
  import { TickerPlugin } from '@pixi/ticker'
  import { AppLoaderPlugin } from '@pixi/loaders'
  import type { IApplicationOptions, IApplicationPlugin } from '@pixi/app'
  import type { IRendererPluginConstructor } from '@pixi/core'
  import { BatchRenderer, Renderer } from '@pixi/core'

  type $$Props = IApplicationOptions

  /**
   * @extends {IApplicationOptions}
   */

  /**
   *
   * if parent is using the render prop action
   * @type {PIXI.Application}
   */
  let isManualRender = false
  let isMounted = false

  export let instance: Application = new Application({
    ...$$restProps,
  })

  /**
   *  If you want to customize the host element,
   *  you can declare this prop via `let:render` and use it
   *  as an action on a child element
   **/
  export function render(node): void {
    if (!isMounted) {
      isManualRender = true
    }
    node.appendChild(instance.view)
  }

  setContext('pixi/app', instance)
  setContext('pixi/stage', instance.stage)

  onMount(() => {
    isMounted = true

    // @ts-ignore
    window.pixiApp = instance
  })
</script>

{#if typeof window !== 'undefined'}
  {#if !isManualRender && isMounted}
    <div use:render />
  {/if}

  <slot {render} />
{/if}
