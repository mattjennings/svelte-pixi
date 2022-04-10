<script context="module" lang="ts">
  interface LoaderContext<T extends PIXI.Loader> {
    loader?: T
  }
  export function getLoader<T extends PIXI.Loader>() {
    return getContext<LoaderContext<T>>('pixi/loader') ?? {}
  }

  export function getResource<T = any>(name: string): T {
    const { loader } = getLoader()

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

  type T = $$Generic<PIXI.Loader>
  type $$Props = {
    instance?: T
    resources?: string[] | Array<[string, string, PIXI.IAddOptions, () => any]>
    baseUrl?: string
    concurrency?: number
  }
  const dispatch = createEventDispatcher()

  /**
   * An array of urls or arguments to be passed into PIXI.Loader's add() function
   * @type {string[] | Array<[string, string, PIXI.IAddOptions, () => any]>}
   */
  export let resources: $$Props['resources'] = []

  /**
   * The base url for all resources loaded by this loader.
   *
   * @type {string}
   */
  export let baseUrl: $$Props['baseUrl'] = ''

  /**
   * The number of resources to load concurrently.
   * @type {number}
   */
  export let concurrency: $$Props['concurrency'] = 10

  /**
   * The PIXI.Loader instance. Can be set or bound to.
   *
   * @type {PIXI.Loader}
   */
  export let instance: T = new PIXI.Loader() as T

  setContext<LoaderContext<T>>('pixi/loader', { loader: instance })

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
