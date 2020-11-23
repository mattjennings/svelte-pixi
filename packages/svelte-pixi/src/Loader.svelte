<script lang="ts">
  import type PIXI from 'pixi.js'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const app = getContext<PIXI.Application>('pixi/app')

  /**
   * @type {string[] | [string, string, PIXI.ILoaderOptions, function][] } The resources you wish to load. This can be an array of URLs, or an array of arguments to pass into the
   * PixiJS loader add function.
   */
  export let resources:
    | string[]
    | Array<[string, string, PIXI.ILoaderOptions, () => any]>

  /**
   * @type {string} The base url for all resources loaded by this loader.
   */
  export let baseUrl: string = ''

  /**
   * @type {number} The number of resources to load concurrently.
   */
  export let concurrency: number = 10

  let progress: number = 0
  let loading = resources.length > 0

  onMount(() => {
    if (baseUrl) {
      app.loader.baseUrl = baseUrl
    }
    app.loader.concurrency = concurrency

    resources.forEach((url) => {
      if (Array.isArray(url)) {
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
