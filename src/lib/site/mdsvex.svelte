<script>
  export let title
  export let pixi = undefined
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

{#if pixi}
  <p>
    Creates a <a class="text-slate-800" href={pixi}>PIXI.{title}</a>
  </p>
{/if}
<slot />
