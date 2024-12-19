<script context="module" lang="ts">
  interface ApplicationContext<T extends PIXI.Application> {
    app: T
  }

  export function getApp<T extends PIXI.Application>() {
    return getContext<ApplicationContext<T>>('pixi/app') ?? {}
  }
</script>

<script lang="ts">
  import { AbstractRenderer } from 'pixi.js'

  import * as PIXI from 'pixi.js'

  import { createEventDispatcher, getContext, setContext } from 'svelte'
  import Container from './Container.svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import { omitUndefined } from './util/helpers'

  const dispatch = createEventDispatcher()
  type T = $$Generic<PIXI.Application>
  type $$Props = Partial<PIXI.ApplicationOptions> & {
    instance?: T
    render?: 'auto' | 'demand'
    autoInit?: boolean
  }

  type $$Slots = {
    loading: {}
    default: {}
    view: {}
  }

  /**
   * Calls init() on the Application immediately
   */
  export let autoInit = true

  /**
   * Automatically starts the rendering
   *
   */
  export let autoStart: $$Props['autoStart'] = undefined

  /**
   * Resizes renderer view in CSS pixels to allow for resolutions other than 1.
   */
  export let autoDensity: $$Props['autoDensity'] = undefined

  /**
   * Sets antialias
   */
  export let antialias: $$Props['antialias'] = undefined

  /**
   * Enables drawing buffer preservation, enable this if you
   * need to call toDataUrl on the WebGL context.
   */
  export let preserveDrawingBuffer: $$Props['preserveDrawingBuffer'] = undefined

  /**
   * The resolution / device pixel ratio of the renderer.
   *
   * @type {number}
   */
  export let resolution: $$Props['resolution'] = undefined

  /**
   * Alias for backgroundColor
   *
   * @type {PIXI.ColorSource}
   */
  export let background: $$Props['background'] = undefined

  /**
   * Value from 0 (fully transparent) to 1 (fully opaque).
   *
   * @type {number}
   */
  export let backgroundAlpha: $$Props['backgroundAlpha'] = undefined

  /**
   * The background color of the rendered area (shown if not transparent).
   *
   * @type {PIXI.ColorSource}
   */
  export let backgroundColor: $$Props['backgroundColor'] = undefined

  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @type {number}
   */
  export let bezierSmoothness: $$Props['bezierSmoothness'] = undefined

  /**
   * This sets if the renderer will clear the canvas or not before the new render pass.
   *
   * @type {boolean}
   */
  export let clearBeforeRender: $$Props['clearBeforeRender'] = undefined

  /**
   * User-provided WebGL rendering context object.
   *
   * @type {WebGL2RenderingContext}
   */
  export let context: $$Props['context'] = undefined

  /**
   * Whether to ensure the main view has can make use of the depth buffer. Always true for WebGL renderer.
   *
   * @type {boolean}
   */
  export let depth: $$Props['depth'] = undefined

  /**
   * The event features that are enabled by the EventSystem.
   *
   * @type {PIXI.EventSystemOptions['eventFeatures']}
   */
  export let eventFeatures: $$Props['eventFeatures'] = undefined

  /**
   * The default event mode mode for all display objects.
   *
   * @type {PIXI.EventMode}
   */
  export let eventMode: $$Props['eventMode'] = undefined

  /**
   * @type {boolean}
   */
  export let failIfMajorPerformanceCaveat: $$Props['failIfMajorPerformanceCaveat'] =
    undefined

  /**
   * Force the use of the fallback adapter
   *
   * @type {boolean}
   */
  export let forceFallbackAdapter: $$Props['forceFallbackAdapter'] = undefined

  /**
   * The height of the renderers view.
   **/
  export let height: $$Props['height'] = undefined

  /**
   * Whether to log the version and type information of renderer to console.
   * @type {boolean}
   */
  export let hello: $$Props['hello'] = undefined

  /**
   * Whether to enable multi-view rendering. Set to true when rendering to multiple canvases on the dom.
   * @type {boolean}
   */
  export let multiView: $$Props['multiView'] = undefined

  /**
   * Parameter passed to webgl context, set to "high-performance"
   * for devices with dual graphics card. (WebGL only).
   *
   * @type {WebGLPowerPreference}
   */
  export let powerPreference: $$Props['powerPreference'] = undefined

  /**
   * The preferred renderer type. WebGPU is recommended as its generally faster than WebGL.
   * @type {'webgl' | 'webgpu'}
   */
  export let preference: $$Props['preference'] = undefined

  /**
   * The preferred WebGL version to use.
   *
   * @type {1 | 2}
   */
  export let preferWebGLVersion: $$Props['preferWebGLVersion'] = undefined

  /**
   * **WebGL Only.** Whether the compositor will assume the drawing buffer contains colors with premultiplied alpha.
   * @type {boolean | undefined}
   */
  export let premultipliedAlpha: $$Props['premultipliedAlpha'] = undefined

  /**
   * If set to true, this will enable the garbage collector on the GPU.
   *
   * @type {boolean}
   */
  export let renderableGCActive: $$Props['renderableGCActive'] = undefined

  /**
   * Frames between two garbage collections.
   *
   * @type {number}
   */
  export let renderableGCFrequency: $$Props['renderableGCFrequency'] = undefined

  /**
   * The maximum idle frames before a texture is destroyed by garbage collection.
   *
   * @type {number}
   * @default 60
   */
  export let renderableGCMaxUnusedTime: $$Props['renderableGCMaxUnusedTime'] =
    undefined

  /**
   * Element to automatically resize stage to.
   *
   * @type {Window | HTMLElement}
   */
  export let resizeTo: $$Props['resizeTo'] = undefined

  /**
   * Changes the rendering method
   *
   * auto - render on each tick at the target FPS
   * demand - render only when components have been updated
   *
   * @type {'auto' | 'demand' | false}
   */
  export let render: 'auto' | 'demand' | false = 'auto'

  export let roundPixels: $$Props['roundPixels'] = undefined

  /**
   * Whether to stop PixiJS from dynamically importing default extensions for the renderer.
   * It is false by default, and means PixiJS will load all the default extensions,
   * based on the environment e.g browser/webworker. If you set this to true,
   * then you will need to manually import the systems and extensions you need.
   *
   * @type {boolean}
   */
  export let skipExtensionImports: $$Props['skipExtensionImports'] = undefined

  /**
   * If set to true, this will enable the garbage collector on the GPU.
   * @type {boolean}
   */
  export let textureGCActive: $$Props['textureGCActive'] = undefined

  /**
   * Frames between two garbage collections.
   * @type {number}
   */
  export let textureGCCheckCountMax: $$Props['textureGCCheckCountMax'] =
    undefined

  /**
   * The maximum idle frames before a texture is destroyed by garbage collection.
   * @type {number}
   */
  export let textureGCMaxIdle: $$Props['textureGCMaxIdle'] = undefined

  /**
   * if true will use the back buffer where required
   *
   * @type {boolean}
   */
  export let useBackBuffer: $$Props['useBackBuffer'] = undefined

  /**
   * Optional WebGLOptions to pass only to the WebGL renderer
   *
   * @type {PIXI.WebGLRendererOptions}
   */
  export let webgl: $$Props['webgl'] = undefined

  /**
   * Optional WebGPUOptions to pass only to WebGPU renderer.
   *
   * @type {PIXI.WebGPUOptions}
   */
  export let webgpu: $$Props['webgpu'] = undefined

  /**
   * The width of the renderers view.
   *
   **/
  export let width: $$Props['width'] = undefined

  /**
   * The PIXI.Application instance. This can be manually set or bound to.
   *
   * Note: if manually set, props will not be applied.
   *
   * @type {PIXI.Application}
   */
  export let instance: T = new PIXI.Application() as T

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
          dispatch('init', { instance })

          // remove rendering on tick
          if (render) {
            instance.ticker.remove(instance.render, instance)
          }
        })
    : Promise.resolve(instance)

  let invalidated = true

  setContext<ApplicationContext<T>>('pixi/app', { app: instance })
</script>

{#await initPromise}
  <slot name="loading" />
{:then}
  <Renderer
    instance={instance.renderer}
    on:invalidate={() => {
      invalidated = true
    }}
    on:renderStart
    on:render
    on:prerender
    on:postrender
  >
    <slot name="view" slot="view">
      <div />
    </slot>

    {#if render}
      <Ticker
        on:tick={() => {
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
        <slot />
      </Container>
    </Ticker>
  </Renderer>
{/await}
