<script context="module" lang="ts">
  export function getLoader(): PIXI.Loader {
    return getContext('pixi/loader')
  }

  export function getResource<T = any>(name: string): T {
    const loader = getLoader()

    if (!loader) {
      throw new Error('getResource requires a parent <Loader /> component')
    }

    return loader.resources[name] as any as T
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import {
    createEventDispatcher,
    setContext,
    getContext,
    onMount,
  } from 'svelte'

  interface $$Slots {
    default: {
      progress?: number
    }
    loading: {
      progress: number
    }
  }

  interface $$Events {
    complete: CustomEvent<PIXI.Loader>
    progress: CustomEvent<PIXI.Loader>
    error: CustomEvent<PIXI.Loader>
    start: CustomEvent<PIXI.Loader>
    load: CustomEvent<PIXI.Loader>
  }

  const dispatch = createEventDispatcher()

  /**
   * An array of urls or arguments to be passed into Pixi.js's [loader.add function](https://pixijs.download/release/docs/PIXI.Loader.html#add)
   */
  export let resources:
    | string[]
    | Array<[string, string, PIXI.IAddOptions, () => any]>

  /**
   * @type {string} The base url for all resources loaded by this loader.
   */
  export let baseUrl = ''

  /**
   * @type {number} The number of resources to load concurrently.
   */
  export let concurrency = 10

  export let instance = new PIXI.Loader()

  setContext('pixi/loader', instance)

  let progress = 0
  let loading = resources.length > 0

  onMount(() => {
    if (baseUrl) {
      instance.baseUrl = baseUrl
    }
    instance.concurrency = concurrency

    resources.forEach((url) => {
      if (Array.isArray(url)) {
        // @ts-ignore
        instance.add(...url)
      } else {
        instance.add(url)
      }
    })
    instance.load()

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

    const onCompleteId = instance.onComplete.add(onComplete)
    const onProgressId = instance.onProgress.add(onProgress)
    const onErrorId = instance.onError.add(onError)
    const onStartId = instance.onStart.add(onStart)
    const onLoadId = instance.onLoad.add(onLoad)

    return () => {
      instance.onComplete.detach(onCompleteId)
      instance.onProgress.detach(onProgressId)
      instance.onError.detach(onErrorId)
      instance.onStart.detach(onStartId)
      instance.onLoad.detach(onLoadId)
    }
  })
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
