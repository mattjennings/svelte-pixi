<script>
  const { children } = $props()
</script>

<div class="with-app-container w-full h-full overflow-hidden block">
  {@render children()}
</div>

<style>
  :global(.with-app-container canvas) {
    min-width: 100%;
    max-width: none;
  }
</style>
