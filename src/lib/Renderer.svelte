<script context="module" lang="ts">
  export interface RendererContext<
    T extends PIXI.Renderer | PIXI.AbstractRenderer
  > {
    renderer: T
    invalidate: () => void
  }

  export function getRenderer<
    T extends PIXI.Renderer | PIXI.AbstractRenderer
  >(): RendererContext<T> {
    return getContext('pixi/renderer')
  }

  export function getStage(): PIXI.Container {
    return getContext('pixi/stage')
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

  type T = $$Generic<PIXI.Renderer | PIXI.AbstractRenderer>
  type $$Props = PIXI.IRendererOptionsAuto & {
    instance?: T
    stage?: PIXI.Container
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
   * This option is for cases where the canvas needs to be opaque,
   * possibly for performance reasons on some older devices.
   *
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
   * prevents selection of WebGL renderer, even if such is present, this option only is available
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
      resolution,
      forceCanvas,
      backgroundColor,
      backgroundAlpha,
      clearBeforeRender,
      powerPreference,
    })
  ) as T

  setContext('pixi/renderer', {
    renderer: instance,
    invalidate: () => {
      dispatch('invalidate')
    },
  })

  function view(node: HTMLElement): void {
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
