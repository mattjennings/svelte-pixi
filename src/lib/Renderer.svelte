<script context="module" lang="ts">
  export type { RendererContext } from './RendererContext.svelte'
  export { getRenderer } from './RendererContext.svelte'
</script>

<script lang="ts">
  import RendererContext from './RendererContext.svelte'

  import * as PIXI from 'pixi.js'
  import { createEventDispatcher, onMount, setContext } from 'svelte'
  import { omitUndefined } from './util/helpers'

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
  export let resolution: $$Props['resolution'] =
    PIXI.AbstractRenderer.defaultOptions.resolution

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
  export let instance: T | undefined = undefined

  const loadRendererInstance = instance
    ? Promise.resolve(instance)
    : PIXI.autoDetectRenderer(
        omitUndefined({
          width,
          height,
          autoDensity,
          antialias,
          preserveDrawingBuffer,
          premultipliedAlpha,
          resolution,
          backgroundColor,
          backgroundAlpha,
          clearBeforeRender,
          powerPreference,
          eventMode,
          eventFeatures,
        }),
      )
        .then((renderer) => {
          instance = renderer as T
          return instance
        })
        .catch((err) => {
          console.error(`Error Renderer instance: ${err}`)
        })

  setContext('pixi/renderer', {
    renderer: instance,
    invalidate: () => {
      dispatch('invalidate')
    },
  })

  function view(node: HTMLElement): void {
    if (!instance) {
      throw new Error('Renderer instance not found')
    }

    if (node.childNodes.length) {
      node.childNodes[0].appendChild(instance.canvas)
    } else {
      node.appendChild(instance.canvas)
    }
  }

  onMount(() => {
    loadRendererInstance.then((instance) => {
      if (instance) {
        instance.runners.prerender.add(() => dispatch('prerender'))
        instance.runners.postrender.add(() => dispatch('postrender'))
        instance.runners.render.add(() => dispatch('render'))
        instance.runners.renderStart.add(() => dispatch('renderStart'))
      }
    })
  })
</script>

{#await loadRendererInstance}
  <slot name="loading" />
{:then instance}
  {#if instance}
    <RendererContext renderer={instance}>
      <slot />
      {#if $$slots.view}
        <div use:view>
          <slot name="view" />
        </div>
      {:else}
        <div use:view />
      {/if}
    </RendererContext>
  {/if}
{/await}
