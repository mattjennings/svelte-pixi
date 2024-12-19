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
  export let resolution: $$Props['resolution'] =
    AbstractRenderer.defaultOptions.resolution

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
   * The default event mode mode for all display objects.
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

  export let preference: $$Props['preference'] = undefined
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

  /**
   * The PIXI.Application instance. This can be manually set or bound to.
   *
   * Note: if manually set, props will not be applied.
   *
   * @type {PIXI.Application}
   */
  export let instance: T = new PIXI.Application() as T

  /**
   * Calls init() on the Application immediately
   */
  export let autoInit = true

  const initPromise = autoInit
    ? instance
        .init(
          // some props being explicitly undefined different behaviour than implicit
          // undefined
          omitUndefined({
            autoStart,
            width,
            height,
            premultipliedAlpha,
            autoDensity,
            antialias,
            preserveDrawingBuffer,
            resolution,
            backgroundColor,
            backgroundAlpha,
            clearBeforeRender,
            powerPreference,
            resizeTo,
            eventMode,
            eventFeatures,
            preference,
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
