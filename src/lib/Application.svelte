<script context="module" lang="ts">
  export function getApp(): PIXI.Application {
    return getContext('pixi/app')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { getContext, setContext } from 'svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'

  type $$Props = PIXI.IApplicationOptions & {
    instance?: PIXI.Application
  }

  /**
   * Automatically starts the rendering
   *
   */
  export let autoStart: $$Props['autoStart'] = true

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
   * true to use PIXI.Ticker.shared, false to create new ticker.
   * If set to false, you cannot register a handler to occur before
   * anything that runs on the shared ticker. The system ticker will
   * always run before both the shared ticker and the app ticker.
   */
  export let sharedTicker: $$Props['sharedTicker'] = false

  /**
   * Element to automatically resize stage to.
   *
   * @type {Window | HTMLElement}
   */
  export let resizeTo: $$Props['resizeTo'] = undefined

  /**
   * The PIXI.Application instance. This can be manually set or bound to.
   *
   * Note: if manually set, props will not be applied.
   *
   * @type {PIXI.Application}
   */
  export let instance: $$Props['instance'] = new PIXI.Application({
    autoStart: autoStart,
    width: width,
    height: height,
    useContextAlpha: useContextAlpha,
    autoDensity: autoDensity,
    antialias: antialias,
    preserveDrawingBuffer: preserveDrawingBuffer,
    resolution: resolution,
    forceCanvas: forceCanvas,
    backgroundColor: backgroundColor,
    backgroundAlpha: backgroundAlpha,
    clearBeforeRender: clearBeforeRender,
    powerPreference: powerPreference,
    sharedTicker: sharedTicker,
    resizeTo: resizeTo,
  })

  setContext('pixi/app', instance)
</script>

<Renderer
  instance={instance.renderer}
  stage={instance.stage}
  on:componentupdate
>
  <slot name="view" slot="view">
    <div />
  </slot>
  <Ticker instance={sharedTicker ? PIXI.Ticker.shared : instance.ticker}>
    <slot />
  </Ticker>
</Renderer>
