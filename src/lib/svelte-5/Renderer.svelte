<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { type Snippet } from 'svelte'
  import { omitUndefined } from '../core/util/helpers'
  import RendererContext from './RendererContext.svelte'

  type T = $$Generic<PIXI.Renderer>
  type Props = Partial<Omit<PIXI.AutoDetectOptions, 'view'>> & {
    /**
     * The PIXI.Renderer instance. Can be set or bound to. By default
     * PIXI.autoDetectRenderer() is called and sets the instance when it resolves
     */
    instance?: T

    loading?: Snippet<[]>
    view?: Snippet<[]>
    children: Snippet<[]>

    oninit?: (renderer: T) => void
    onrender?: (ev: PIXI.FederatedEvent) => void
    onrenderstart?: (ev: PIXI.FederatedEvent) => void
    onprerender?: (ev: PIXI.FederatedEvent) => void
    onpostrender?: (ev: PIXI.FederatedEvent) => void
    oninvalidate?: () => void
  }

  let {
    antialias,
    autoDensity,
    background,
    backgroundAlpha,
    backgroundColor,
    bezierSmoothness,
    clearBeforeRender,
    context,
    depth,
    eventFeatures,
    eventMode,
    failIfMajorPerformanceCaveat,
    forceFallbackAdapter,
    height,
    hello,
    multiView,
    powerPreference,
    preference,
    preferWebGLVersion,
    premultipliedAlpha,
    preserveDrawingBuffer,
    renderableGCActive,
    renderableGCFrequency,
    renderableGCMaxUnusedTime,
    resolution,
    roundPixels,
    skipExtensionImports,
    textureGCActive,
    textureGCCheckCountMax,
    textureGCMaxIdle,
    useBackBuffer,
    webgl,
    webgpu,
    width,

    // snippets
    children,
    view,
    loading,

    // events
    oninit,
    onrender,
    onrenderstart,
    onprerender,
    onpostrender,
    oninvalidate,

    // bindings
    instance = $bindable(),
  }: Props = $props()

  const autoDetectPromise = (
    instance
      ? Promise.resolve(instance)
      : PIXI.autoDetectRenderer(
          omitUndefined<PIXI.AutoDetectOptions>({
            antialias,
            autoDensity,
            background,
            backgroundAlpha,
            backgroundColor,
            bezierSmoothness,
            clearBeforeRender,
            context,
            depth,
            eventFeatures,
            eventMode,
            failIfMajorPerformanceCaveat,
            forceFallbackAdapter,
            height,
            hello,
            multiView,
            powerPreference,
            preference,
            preferWebGLVersion,
            premultipliedAlpha,
            preserveDrawingBuffer,
            renderableGCActive,
            renderableGCFrequency,
            renderableGCMaxUnusedTime,
            resolution,
            roundPixels,
            skipExtensionImports,
            textureGCActive,
            textureGCCheckCountMax,
            textureGCMaxIdle,
            useBackBuffer,
            webgl,
            webgpu,
            width,
          }),
        )
  )
    .then((renderer) => {
      instance = renderer as T
      oninit?.(instance)

      const listeners = {
        prerender: onprerender,
        postrender: onpostrender,
        render: onrender,
        renderStart: onrenderstart,
      }

      if (instance) {
        instance.runners.prerender.add(listeners)
        instance.runners.postrender.add(listeners)
        instance.runners.render.add(listeners)
        instance.runners.renderStart.add(listeners)
      }

      return instance
    })
    .catch((err) => {
      console.error(`Error Renderer instance: ${err}`)
    })

  function attachView(node: HTMLElement): void {
    if (!instance) {
      throw new Error('Renderer instance not found')
    }

    if (node.childNodes.length === 0) {
      node.appendChild(instance.canvas)
    } else {
      for (const childNode of Array.from(node.childNodes)) {
        if (childNode instanceof HTMLElement) {
          childNode.appendChild(instance.canvas)
          break
        }
      }
    }
  }
</script>

{#await autoDetectPromise}
  {@render loading?.()}
{:then instance}
  {#if instance}
    <RendererContext renderer={instance} {oninvalidate}>
      {@render children?.()}
      {#if view}
        <div use:attachView>
          {@render view()}
        </div>
      {:else}
        <div use:attachView></div>
      {/if}
    </RendererContext>
  {/if}
{/await}
