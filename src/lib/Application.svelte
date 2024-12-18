<script module lang="ts">
  interface ApplicationContext<T extends PIXI.Application> {
    app: T
  }

  export function getApp<T extends PIXI.Application>() {
    return getContext<ApplicationContext<T>>('pixi/app') ?? {}
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { getContext, setContext } from 'svelte'
  import Container from './Container.svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import { omitUndefined } from './util/helpers'

  type T = $$Generic<PIXI.Application>
  interface Props extends Omit<PIXI.IApplicationOptions, 'view'> {
    instance?: T;
    view?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    render?: 'auto' | 'demand' | false
  } 

  let {
    autoStart = true,
    width = 800,
    height = 600,
    useContextAlpha = undefined,
    autoDensity = true,
    antialias = false,
    preserveDrawingBuffer = false,
    resolution = PIXI.settings.RESOLUTION,
    forceCanvas = false,
    backgroundColor = 0x000000,
    backgroundAlpha = 1,
    clearBeforeRender = false,
    eventMode = undefined,
    eventFeatures = undefined,
    powerPreference = 'default',
    premultipliedAlpha = false,
    resizeTo = undefined,
    render = 'auto',
    instance = $bindable() as T,
    view,
    children
  }: Props = $props();

  if(!instance) {
    instance = new PIXI.Application(
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
    })) as T
  }

  let invalidated = $state(true)

  setContext<ApplicationContext<T>>('pixi/app', { app: instance })

  // remove rendering on tick
  if (render) {
    instance.ticker.remove(instance.render, instance)
  }

  const view_render = $derived(view);
</script>

<Renderer
  instance={instance.renderer}
  on:invalidate={() => {
    invalidated = true
  }}
  on:prerender
  on:postrender
>
  {@render view_render?.()}

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
      {@render children?.()}
    </Container>
  </Ticker>
</Renderer>
