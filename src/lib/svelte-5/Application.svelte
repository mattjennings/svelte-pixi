<script lang="ts" module>
  import { onMount, type Snippet } from 'svelte'
  export interface ApplicationProps<
    T extends PIXI.Application = PIXI.Application,
  > extends Partial<Omit<PIXI.ApplicationOptions, 'view'>> {
    /**
     * The PIXI.Application instance. This can be manually set or bound to.
     *
     * Note: if manually set any PIXI.ApplicationOptions props will not be set
     * as they are passed into the constructor
     *
     * @type {PIXI.Application}
     */
    instance?: T
    render?: 'auto' | 'demand'

    /**
     * If true, Application.init() is called immediately. If you want to initialize it yourself
     * with a custom instance, set this to false.
     */
    autoInit?: boolean

    loading?: Snippet<[]>
    view?: Snippet<[]>
    stage?: Snippet<[{ app: T; children: Snippet<[]> }]>
    children: Snippet<[]>

    /**
     * Called when PIXI.Application.init() method resolves
     */
    oninit?: (ev: { application: T }) => void

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
  }
</script>

<script lang="ts" generics="T extends PIXI.Application = PIXI.Application">
  import * as PIXI from 'pixi.js'

  import Container from './Container.svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import { omitUndefined } from '../core/util/helpers'
  import { setApp } from '../core/context/app'

  let {
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
    stage,

    // events
    oninit,
    onrender,
    onrenderstart,
    onprerender,
    onpostrender,

    // bindings
    instance = $bindable(),
  }: ApplicationProps<T> = $props()

  if (!instance) {
    instance = new PIXI.Application() as T
  }

  const initPromise = (
    autoInit
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
            if (instance) {
              oninit?.({ application: instance })
            }
          })
      : Promise.resolve(instance)
  ).then(() => {
    // remove rendering on tick
    if (render && instance?.ticker) {
      instance.ticker.remove(instance.render, instance)
    }
  })

  let invalidated = true

  setApp(instance)

  onMount(() => {
    return () => {
      instance = undefined
    }
  })
</script>

{#snippet viewFallback()}
  <div></div>
{/snippet}

{#await initPromise}
  {@render loading?.()}
{:then}
  {#if instance}
    <Renderer
      instance={instance.renderer}
      oninvalidate={() => {
        invalidated = true
      }}
      view={view ?? viewFallback}
      {onrender}
      {onrenderstart}
      {onprerender}
      {onpostrender}
    >
      {#if render}
        <Ticker
          ontick={() => {
            if (render === 'demand') {
              if (invalidated) {
                invalidated = false
                instance?.renderer.render(instance.stage)
              }
            } else if (render === 'auto') {
              instance?.renderer.render(instance.stage)
            }
          }}
        />
      {/if}
      <Ticker {autoStart} instance={instance.ticker}>
        {#if stage}
          {@render stage?.({ app: instance, children })}
        {:else}
          <Container instance={instance.stage}>
            {@render children?.()}
          </Container>
        {/if}
      </Ticker>
    </Renderer>
  {/if}
{/await}
