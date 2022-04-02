<script context="module" lang="ts">
  export function getApp(): Application {
    return getContext('pixi/app')
  }
</script>

<script lang="ts">
  import type { IApplicationOptions } from '@pixi/app'
  import { Application } from '@pixi/app'
  import { BatchRenderer } from '@pixi/core'
  import { AppLoaderPlugin } from '@pixi/loaders'
  import { getContext, setContext } from 'svelte'
  import Renderer from './Renderer.svelte'
  import Ticker from './Ticker.svelte'
  import {
    registerApplicationPlugin,
    registerRendererPlugin,
  } from './util/plugins'

  registerApplicationPlugin(AppLoaderPlugin)
  registerRendererPlugin('batch', BatchRenderer)

  type $$Props = IApplicationOptions & {
    instance?: Application
    disableRenderOnTick?: boolean
  }

  export let instance: $$Props['instance'] = new Application({
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
