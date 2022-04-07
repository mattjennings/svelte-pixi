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
    disableRenderOnTick?: boolean
  }

  export let instance: $$Props['instance'] = new PIXI.Application({
    ...$$restProps,
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
  <Ticker instance={instance.ticker}>
    <slot />
  </Ticker>
</Renderer>
