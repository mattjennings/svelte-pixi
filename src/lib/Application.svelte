<script context="module" lang="ts">
  interface ApplicationContext<T extends PIXI.Application> {
    app: T
  }

  export function getApp<T extends PIXI.Application>() {
    return getContext<ApplicationContext<T>>('pixi/app') ?? {}
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { getContext, setContext, type Snippet } from 'svelte'
  import Container from './Container.svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import { omitUndefined } from './util/helpers'

  type T = $$Generic<PIXI.Application>
  type Props = Partial<Omit<PIXI.IApplicationOptions, 'view'>> & {
    instance?: T
    render?: 'auto' | 'demand'

    view?: Snippet<void>
    children: Snippet<void>

    onprerender?: (ev: PIXI.FederatedEvent) => void
    onpostrender?: (ev: PIXI.FederatedEvent) => void
  }

  const {
    autoStart,
    width,
    height,
    useContextAlpha,
    premultipliedAlpha,
    autoDensity,
    antialias,
    preserveDrawingBuffer,
    resolution,
    forceCanvas,
    backgroundColor,
    backgroundAlpha,
    clearBeforeRender,
    powerPreference,
    resizeTo,
    eventMode,
    eventFeatures,
    render,
    view,
    children,
    onprerender,
    onpostrender,
  } = $props<Props>()

  /**
   * The PIXI.Application instance. This can be manually set or bound to.
   *
   * Note: if manually set, props will not be applied.
   *
   * @type {PIXI.Application}
   */
  export const instance: T = new PIXI.Application(
    // some props being explicitly undefined different behaviour than implicit
    // undefined
    omitUndefined({
      autoStart,
      width,
      height,
      useContextAlpha,
      premultipliedAlpha,
      autoDensity,
      antialias,
      preserveDrawingBuffer,
      resolution,
      forceCanvas,
      backgroundColor,
      backgroundAlpha,
      clearBeforeRender,
      powerPreference,
      resizeTo,
      eventMode,
      eventFeatures,
    }),
  ) as T

  let invalidated = true

  setContext<ApplicationContext<T>>('pixi/app', { app: instance })

  // remove rendering on tick
  if (render) {
    instance.ticker.remove(instance.render, instance)
  }
</script>

{#snippet viewFallback()}
  <div />
{/snippet}

<Renderer
  instance={instance.renderer}
  oninvalidate={() => {
    invalidated = true
  }}
  view={view ?? viewFallback}
  {onprerender}
  {onpostrender}
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
