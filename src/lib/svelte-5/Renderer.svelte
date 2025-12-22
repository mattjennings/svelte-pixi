<script lang="ts" module>
  export interface RendererProps<
    T extends PIXI.Renderer = PIXI.Renderer,
  > extends Partial<Omit<PIXI.AutoDetectOptions, 'view'>> {
    /**
     * The PIXI.Renderer instance. Can be set or bound to.
     *
     * By default `PIXI.autoDetectRenderer()` is called and sets the instance when it resolves.
     *
     * WARNING: Type-safety limitation: If you are using a subclass of PIXI.Renderer,
     * you MUST provide the instance prop with your custom instance. Due to TypeScript's
     * limitations with generic types, if you don't provide an instance and rely on
     * autoDetectRenderer(), the result will be cast to your type, which will cause
     * runtime errors when trying to access subclass-specific properties or methods.
     *
     * Example:
     *
     * ```typescript
     * class MyRenderer extends PIXI.Renderer {
     *   myMethod() { ... }
     * }
     * const renderer = new MyRenderer()
     *
     * <!-- Correct: always provide instance for subclasses. -->
     * <Renderer instance={renderer} />
     * ```
     */
    instance?: T

    loading?: Snippet<[]>
    view?: Snippet<[]>
    children: Snippet<[]>

    /**
     * Called when PIXI.autoDetectRenderer() resolves (only if no `instance` prop was set)
     */
    oninit?: (ev: { renderer: T }) => void

    /**
     * Event handler for the render PIXI.Runner
     */
    onrender?: (item: unknown) => void

    /**
     * Event handler for the renderStart PIXI.Runner
     */
    onrenderstart?: (item: unknown) => void

    /**
     * Event handler for the prerender PIXI.Runner
     */
    onprerender?: (item: unknown) => void

    /**
     * Event handler for the postrender PIXI.Runner
     */
    onpostrender?: (item: unknown) => void

    /**
     * Called whenever the renderer needs to be redrawn because of a change
     */
    oninvalidate?: () => void
  }
</script>

<script lang="ts" generics="T extends PIXI.Renderer = PIXI.Renderer">
  import * as PIXI from 'pixi.js'

  import { onMount, type Snippet } from 'svelte'
  import { omitUndefined } from '../core/util/helpers'
  import RendererContext from './RendererContext.svelte'

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
  }: RendererProps<T> = $props()

  const autoDetectPromise = (
    instance
      ? Promise.resolve(instance)
      : PIXI.autoDetectRenderer(
          // svelte-ignore state_referenced_locally
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
      oninit?.({ renderer: instance })

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

  onMount(() => {
    return () => {
      instance = undefined
    }
  })
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
