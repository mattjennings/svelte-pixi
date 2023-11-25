<script context="module" lang="ts">
  export interface RendererContext<T extends PIXI.Renderer | PIXI.IRenderer> {
    renderer: T
    invalidate: () => void
  }

  export function getRenderer<
    T extends PIXI.Renderer | PIXI.IRenderer,
  >(): RendererContext<T> {
    return getContext('pixi/renderer')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import {
    createEventDispatcher,
    getContext,
    onMount,
    setContext,
  } from 'svelte'
  import { omitUndefined } from './util/helpers'

  type T = $$Generic<PIXI.Renderer | PIXI.IRenderer>
  type $$Props = Partial<PIXI.IRendererOptionsAuto> & {
    instance?: T
    stage?: PIXI.Container
  }

  type $$Slots = {
    default: {}
    view: {}
  }

  const dispatch = createEventDispatcher()

  /**
   * The width of the renderers view.
   *
   **/
  export let width: $$Props['width'] = 800

  /**
   * The height of the renderers view.
   **/
  export let height: $$Props['height'] = 600

  /**
   * Pass-through value for canvas' context alpha property.
   * If you want to set transparency, please use backgroundAlpha.
   * This option is for cases where the canvas
   * needs to be opaque, possibly for performance reasons on some older devices.
   *
   * <br />
   *
   * @deprecated since 7.0.0, use premultipliedAlpha and backgroundAlpha instead.
   * @type {boolean | "notMultiplied"}
   */
  export let useContextAlpha: $$Props['useContextAlpha'] = undefined

  /**
   * Resizes renderer view in CSS pixels to allow for resolutions other than 1.
   */
  export let autoDensity: $$Props['autoDensity'] = true

  /**
   * Sets antialias
   */
  export let antialias: $$Props['antialias'] = false

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
   * Enables drawing buffer preservation, enable this if you
   * need to call toDataUrl on the WebGL context.
   */
  export let preserveDrawingBuffer: $$Props['preserveDrawingBuffer'] = false

  /**
   * The resolution / device pixel ratio of the renderer.
   *
   * @type {number}
   */
  export let resolution: $$Props['resolution'] = PIXI.settings.RESOLUTION

  /**
   * Prevents selection of WebGL renderer, even if such is present, this option only is available
   * when using pixi.js-legacy or @pixi/canvas-renderer modules,
   * otherwise it is ignored.
   */
  export let forceCanvas: $$Props['forceCanvas'] = false

  /**
   * The background color of the rendered area (shown if not transparent).
   */
  export let backgroundColor: $$Props['backgroundColor'] = 0x000000

  /**
   * Value from 0 (fully transparent) to 1 (fully opaque).
   */
  export let backgroundAlpha: $$Props['backgroundAlpha'] = 1

  /**
   * This sets if the renderer will clear the canvas or not before the new render pass.
   *
   * @type {boolean}
   */
  export let clearBeforeRender: $$Props['clearBeforeRender'] = undefined

  /**
   * Parameter passed to webgl context, set to "high-performance"
   * for devices with dual graphics card. (WebGL only).
   *
   * @type {WebGLPowerPreference}
   */
  export let powerPreference: $$Props['powerPreference'] = undefined

  /**
   * **WebGL Only.** Whether the compositor will assume the drawing buffer contains colors with premultiplied alpha.
   * @type {boolean | undefined}
   */
  export let premultipliedAlpha: $$Props['premultipliedAlpha'] = undefined

  /**
   * The PIXI.Renderer instance. Can be set or bound to. By default
   * it uses PIXI.autoDetectRenderer()
   */
  export let instance: T = PIXI.autoDetectRenderer(
    omitUndefined({
      width,
      height,
      useContextAlpha,
      autoDensity,
      antialias,
      preserveDrawingBuffer,
      premultipliedAlpha,
      resolution,
      forceCanvas,
      backgroundColor,
      backgroundAlpha,
      clearBeforeRender,
      powerPreference,
      eventMode,
      eventFeatures,
    }),
  ) as T

  setContext('pixi/renderer', {
    renderer: instance,
    invalidate: () => {
      dispatch('invalidate')
    },
  })

  function view(node: HTMLElement): void {
    if (!(instance.view instanceof HTMLElement)) {
      throw new Error(
        'PIXI.Renderer.view is not an HTMLElement, cannot append to node',
      )
    }

    if (node.childNodes.length) {
      node.childNodes[0].appendChild(instance.view)
    } else {
      node.appendChild(instance.view)
    }
  }

  onMount(() => {
    instance.on('prerender', (ev) => dispatch('prerender', ev))
    instance.on('postrender', (ev) => dispatch('postrender', ev))
  })
</script>

{#if $$slots.view}
  <div use:view>
    <slot name="view" />
  </div>
{:else}
  <div use:view />
{/if}

<slot />
