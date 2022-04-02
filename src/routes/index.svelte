<script>
  import { browser } from '$app/env'
</script>

<div class="bg-black relative w-screen h-screen">
  {#if browser}
    {#await import('$lib/site/SpaceDemo/SpaceDemo.svelte') then mod}
      <svelte:component this={mod.default} />
    {/await}
  {/if}
  <div
    class="absolute inset-0 flex flex-col gap-8 pb-[35vh] justify-center items-center text-white"
  >
    <h1 class="text-5xl font-bold">svelte-pixi</h1>
    <a
      class="px-4 py-2 bg-slate-500/50 rounded text-lg font-medium "
      href="/docs">Get Started</a
    >
  </div>
</div>
