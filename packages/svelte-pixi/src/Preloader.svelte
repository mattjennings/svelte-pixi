<script lang="ts">
  import { onMount, getContext } from 'svelte'

  const app = getContext<PIXI.Application>('pixi/app')

  export let urls = []

  let preloading = urls.length > 0

  onMount(() => {
    urls.forEach(url => {
      app.loader.add(url)
    })
    app.loader.load()

    app.loader.onComplete.add(() => {
      preloading = false
    })
  })
</script>

{#if preloading}
  <slot name="loading" />
{:else}
  <slot />
{/if}
