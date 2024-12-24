<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { type Snippet } from 'svelte'
  import Container from './Container.svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import { omitUndefined } from '../core/util/helpers'
  import { setApp } from '../core/context/app'

  type T = $$Generic<PIXI.Application>
  type Props = Partial<Omit<PIXI.ApplicationOptions, 'view'>> & {
    /**
     * The PIXI.Application instance. This can be manually set or bound to.
     *
     * Note: if manually set, props will not be applied.
     *
     * @type {PIXI.Application}
     */
    instance?: T
    render?: 'auto' | 'demand'
    autoInit?: boolean

    loading?: Snippet<[]>
    view?: Snippet<[]>
    children: Snippet<[]>

    oninit?: (application: T) => void
    onrender?: (ev: PIXI.FederatedEvent) => void
    onprerender?: (ev: PIXI.FederatedEvent) => void
    onpostrender?: (ev: PIXI.FederatedEvent) => void
  }

  const {
    autoInit = true,
    antialias,
    autoDensity,
    autoStart,
    background,
    backgroundAlpha,
    backgroundColor,
    bezierSmoothness,
    clearBeforeRender,
    eventFeatures,
    eventMode,
    height,
    powerPreference,
    premultipliedAlpha,
    preserveDrawingBuffer,
    render,
    resizeTo,
    resolution,

    width,
    context,
    depth,
    failIfMajorPerformanceCaveat,
    forceFallbackAdapter,
    hello,
    multiView,
    preference,
    preferWebGLVersion,
    renderableGCActive,
    renderableGCFrequency,
    renderableGCMaxUnusedTime,
    roundPixels,
    skipExtensionImports,
    textureGCActive,
    textureGCCheckCountMax,
    textureGCMaxIdle,
    useBackBuffer,
    webgl,
    webgpu,

    // snippets
    children,
    view,
    loading,

    // events
    oninit,
    onrender,
    onprerender,
    onpostrender,

    // bindings
    instance = $bindable(new PIXI.Application()) as T,
  }: Props = $props()

  const initPromise = autoInit
    ? instance
        .init(
          // some props being explicitly undefined different behaviour than implicit
          // undefined
          omitUndefined<PIXI.ApplicationOptions>({
            antialias,
            autoDensity,
            autoStart,
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
            resizeTo,
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
        .then(() => {
          // remove rendering on tick
          if (render && instance.ticker) {
            instance.ticker.remove(instance.render, instance)
          }

          oninit?.(instance)
        })
    : Promise.resolve(instance)

  let invalidated = true

  setApp(instance)
</script>

{#snippet viewFallback()}
  <div></div>
{/snippet}

{#await initPromise}
  {@render loading?.()}
{:then}
  <Renderer
    instance={instance.renderer}
    oninvalidate={() => {
      invalidated = true
    }}
    view={view ?? viewFallback}
    {onprerender}
    {onpostrender}
    {onrender}
  >
    {#if render}
      <Ticker
        ontick={() => {
          if (render === 'demand') {
            if (invalidated) {
              invalidated = false
              instance.renderer.render(instance.stage)
            }
          } else if (render === 'auto') {
            instance.renderer.render(instance.stage)
          }
        }}
      />
    {/if}
    <Ticker instance={instance.ticker}>
      <Container instance={instance.stage}>
        {@render children()}
      </Container>
    </Ticker>
  </Renderer>
{/await}
