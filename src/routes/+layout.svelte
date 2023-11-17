<script>
  import '../app.css'
  import '../prism.css'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  onMount(() => {
    Fathom.load('ONEYTNPR', {
      includedDomains: ['svelte-pixi.com', 'svelte-pixi.mattjennin.gs'],
    })
  })

  $: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<svelte:head>
  <title>Svelte Pixi</title>
  <meta name="author" content="Matt Jennings" />
  <meta name="description" content="Create PixiJS apps with Svelte" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://svelte-pixi.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Svelte Pixi" />
  <meta property="og:description" content="Create PixiJS apps with Svelte" />
  <meta property="og:image" content="https://svelte-pixi.com/og-image.png" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="svelte-pixi.com" />
  <meta property="twitter:url" content="https://svelte-pixi.com" />
  <meta name="twitter:title" content="Svelte Pixi" />
  <meta name="twitter:description" content="Create PixiJS apps with Svelte" />
  <meta name="twitter:image" content="https://svelte-pixi.com/og-image.png" />
</svelte:head>
<slot />
