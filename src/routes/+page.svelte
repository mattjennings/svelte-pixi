<script>
  import { browser } from '$app/environment'
</script>

<div class="bg-black relative w-screen h-screen">
  {#if browser}
    {#await import('$lib-site/SpaceDemo.svelte') then mod}
      <svelte:component this={mod.default} />
    {/await}
  {/if}
  <div
    class="absolute inset-0 flex flex-col gap-8 pb-[35vh] justify-center items-center text-white"
  >
    <h1 class="text-6xl font-bold">Svelte Pixi</h1>
    <a
      data-sveltekit-preload-data="hover"
      class="px-5 py-3 bg-slate-500/60 rounded text-2xl font-medium"
      href="/docs">Get Started</a
    >
  </div>
</div>
