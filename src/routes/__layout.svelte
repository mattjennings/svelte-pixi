<script>
  import '../app.css'
  import '../prism.css'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'
  import { onMount } from 'svelte'
  import { browser } from '$app/env'

  onMount(() => {
    Fathom.load('ONEYTNPR', {
      includedDomains: ['svelte-pixi.mattjennin.gs'],
    })
  })

  $: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<title>SveltePixi</title>
<slot />
