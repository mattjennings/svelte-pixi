<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  export let title
  export let pixi = undefined
  export const data = undefined
  export const form = undefined

  onMount(() => {
    const {
      url: { hash },
    } = $page

    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    }
  })
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1><a href="#">{title}</a></h1>

{#if pixi}
  <p>
    Creates a <a class="text-slate-800" href={pixi}>PIXI.{title}</a>
  </p>
{/if}
<slot />
