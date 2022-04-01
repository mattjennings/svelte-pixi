<script>
  export let title
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article class="py-6 pb-24 px-4 sm:px-6 prose prose-slate max-w-5xl">
  <h1>{title}</h1>
  <slot />
</article>
