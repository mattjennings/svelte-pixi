<script>
  import { browser } from '$app/env'
</script>

<!-- 
  Pixi.js cannot be rendered server-side. This ensures pixi and its 
  dependencies are only loaded on the client

  Alternatively, you could disable SSR for the route(s) via https://kit.svelte.dev/docs/hooks#handle
  which would allow you to import Pixi components as normal.
-->
{#if browser}
  {#await import('$lib/PixiApp.svelte') then app}
    <svelte:component this={app.default} />
  {/await}
{/if}
