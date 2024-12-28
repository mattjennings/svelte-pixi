<!-- 
  This ensures pixi and its dependencies are only loaded on the client, as
  pixi.js cannot be imported server-side without errors. This is only necessary
  to do for the root component of your Pixi app.

  Alternatively, you could disable SSR for the route(s) via https://kit.svelte.dev/docs/hooks#handle
  or turn into an SPA https://svelte.dev/docs/kit/single-page-apps
  which would allow you to import Pixi components as normal.
-->
{#await import('$lib/PixiApp.svelte') then App}
  <App.default />
{/await}
