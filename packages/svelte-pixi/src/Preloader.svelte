<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const app = getContext<PIXI.Application>('pixi/app')

  export let urls: string[] = []

  let progress: number = 0
  let loading = urls.length > 0

  onMount(() => {
    urls.forEach((url) => {
      app.loader.add(url)
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

    app.loader.onComplete.add(onComplete)
    app.loader.onProgress.add(onProgress)
    app.loader.onError.add(onError)
    app.loader.onStart.add(onStart)
    app.loader.onLoad.add(onLoad)

    return () => {
      app.loader.onComplete.detach(onComplete)
      app.loader.onProgress.detach(onProgress)
      app.loader.onError.detach(onError)
      app.loader.onStart.detach(onStart)
      app.loader.onLoad.detach(onLoad)
    }
  })
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
