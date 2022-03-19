<script>
  import { browser } from '$app/env'
</script>

{#if browser}
  <slot />
{/if}
