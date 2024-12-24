<script lang="ts">
  import RendererContext from './RendererContext.svelte'

  import * as PIXI from 'pixi.js'
  import { createEventDispatcher } from 'svelte'
  import { omitUndefined } from '../core/util/helpers'
  import { setRenderer } from '../core/context/renderer'

  type T = $$Generic<PIXI.Renderer>
  type $$Props = Partial<PIXI.AutoDetectOptions> & {
    instance?: T | undefined
    stage?: PIXI.Container
  }

  type $$Slots = {
    default: {}
    view: {}
    loading: {}
  }

  const dispatch = createEventDispatcher()

  /**
   * Resizes renderer view in CSS pixels to allow for resolutions other than 1.
   */
  export let autoDensity: $$Props['autoDensity'] = true

  /**
   * Sets antialias
   */
  export let antialias: $$Props['antialias'] = false

  /**
   * Alias for backgroundColor
   *
   * @type {PIXI.ColorSource}
   */
  export let background: $$Props['background'] = undefined

  /**
   * Value from 0 (fully transparent) to 1 (fully opaque).
   */
  export let backgroundAlpha: $$Props['backgroundAlpha'] = 1

  /**
   * The background color of the rendered area (shown if not transparent).
   */
  export let backgroundColor: $$Props['backgroundColor'] = 0x000000

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
   * The default event mode mode for all display objects.
   *
   * This option only is available when using @pixi/events package (included in the pixi.js and pixi.js-legacy bundle),
   * otherwise it will be ignored.
   *
   * @type {PIXI.EventMode}
   */
  export let eventMode: $$Props['eventMode'] = undefined

  /**
   * The event features that are enabled by the EventSystem.
   *
   * @type {PIXI.EventSystemOptions['eventFeatures']}
   */
  export let eventFeatures: $$Props['eventFeatures'] = undefined

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
  export let height: $$Props['height'] = 600

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
   * Enables drawing buffer preservation, enable this if you
   * need to call toDataUrl on the WebGL context.
   */
  export let preserveDrawingBuffer: $$Props['preserveDrawingBuffer'] = false

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
   * The resolution / device pixel ratio of the renderer.
   *
   * @type {number}
   */
  export let resolution: $$Props['resolution'] =
    PIXI.AbstractRenderer.defaultOptions.resolution

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
   * The PIXI.Renderer instance. Can be set or bound to. By default
   * it uses PIXI.autoDetectRenderer()
   */
  export let instance: T | undefined = undefined

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
  export let width: $$Props['width'] = 800

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
      dispatch('init', { instance })

      const listeners = {
        prerender: () => {
          dispatch('prerender')
        },
        postrender: () => {
          dispatch('postrender')
        },
        render: () => {
          dispatch('render')
        },
        renderStart: () => {
          dispatch('renderStart')
        },
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

  function view(node: HTMLElement): void {
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
  <slot name="loading" />
{:then instance}
  {#if instance}
    <RendererContext renderer={instance} on:invalidate>
      <slot />
      {#if $$slots.view}
        <div use:view>
          <slot name="view" />
        </div>
      {:else}
        <div use:view></div>
      {/if}
    </RendererContext>
  {/if}
{/await}
