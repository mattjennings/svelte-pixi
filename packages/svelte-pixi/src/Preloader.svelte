<script lang="ts">
  import { onMount, getContext } from 'svelte'

  const app = getContext<PIXI.Application>('pixi/app')

  export let urls: string[] = []

  let progress: number = 0
  let loading = urls.length > 0

  onMount(() => {
    urls.forEach((url) => {
      app.loader.add(url)
    })
    app.loader.load()

    app.loader.onComplete.add(() => {
      loading = false
    })

    app.loader.onProgress.add((ev) => {
      progress = ev.progress
    })
  })
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
