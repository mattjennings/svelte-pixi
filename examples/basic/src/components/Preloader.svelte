<script>
  import { onMount, getContext } from 'svelte'
  import * as PIXI from 'pixi.js'

  const game = getContext('game')

  export let urls = []

  let preloading = urls.length > 0

  onMount(() => {
    urls.forEach(url => {
      game.loader.add(url)
    })
    game.loader.load()

    game.loader.onComplete.add(() => {
      preloading = false
    })
  })
</script>

{#if preloading}
  <slot name="loading" />
{:else}
  <slot />
{/if}
