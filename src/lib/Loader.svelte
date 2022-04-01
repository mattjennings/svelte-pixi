<script context="module" lang="ts">
  if (typeof window !== 'undefined') {
    registerApplicationPlugin(AppLoaderPlugin)
  }
</script>

<script lang="ts">
  import { AppLoaderPlugin, type IAddOptions } from '@pixi/loaders'
  import type { Loader as PixiLoader } from '@pixi/loaders'
  import { createEventDispatcher, onMount } from 'svelte'
  import { getApp } from './Application.svelte'
  import { registerApplicationPlugin } from './util/plugins'

  interface $$Slots {
    default: {
      progress?: number
    }
    loading: {
      progress: number
    }
  }

  interface $$Events {
    complete: CustomEvent<PixiLoader>
    progress: CustomEvent<PixiLoader>
    error: CustomEvent<PixiLoader>
    start: CustomEvent<PixiLoader>
    load: CustomEvent<PixiLoader>
  }

  const dispatch = createEventDispatcher()
  const app = getApp()

  /**
   * An array of urls or arguments to be passed into Pixi.js's [loader.add function](https://pixijs.download/release/docs/PIXI.Loader.html#add)
   */
  export let resources:
    | string[]
    | Array<[string, string, IAddOptions, () => any]>

  /**
   * @type {string} The base url for all resources loaded by this loader.
   */
  export let baseUrl = ''

  /**
   * @type {number} The number of resources to load concurrently.
   */
  export let concurrency = 10

  let progress = 0
  let loading = resources.length > 0

  onMount(() => {
    if (baseUrl) {
      app.loader.baseUrl = baseUrl
    }
    app.loader.concurrency = concurrency

    resources.forEach((url) => {
      if (Array.isArray(url)) {
        // @ts-ignore
        app.loader.add(...url)
      } else {
        app.loader.add(url)
      }
    })
    app.loader.load()

    function onComplete(ev) {
      dispatch('complete', ev)
      loading = false
    }

    function onProgress(ev) {
      dispatch('progress', ev)
      progress = ev.progress
    }

    function onError(ev) {
      dispatch('error', ev)
    }

    function onStart(ev) {
      dispatch('start', ev)
    }

    function onLoad(ev) {
      dispatch('load', ev)
    }

    const onCompleteId = app.loader.onComplete.add(onComplete)
    const onProgressId = app.loader.onProgress.add(onProgress)
    const onErrorId = app.loader.onError.add(onError)
    const onStartId = app.loader.onStart.add(onStart)
    const onLoadId = app.loader.onLoad.add(onLoad)

    return () => {
      app.loader.onComplete.detach(onCompleteId)
      app.loader.onProgress.detach(onProgressId)
      app.loader.onError.detach(onErrorId)
      app.loader.onStart.detach(onStartId)
      app.loader.onLoad.detach(onLoadId)
    }
  })
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
